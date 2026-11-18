import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import multer from 'multer';
import fs from 'node:fs';
import path from 'node:path';
import * as utils from './albumHandler.js';
import * as utilsongs from './songHandler.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + Math.round(Math.random() * 1e9) + path.extname(file.originalname).toLowerCase());
  }
});
const upload = multer({ storage });



/* CREATION OF DATABASE ON MONGO DB IF NOT FOUND*/

const client = new MongoClient('mongodb://127.0.0.1:27017');

await client.connect();

const db = client.db('recordScratch');
const albumVault = db.collection('albumVault');
const songVault = db.collection('songVault');

const documentCount = await albumVault.countDocuments();  
if (documentCount === 0) {

  let jsonData = fs.readFileSync('./public/resources/database_initials/albumVault.json','utf-8');
  let data = JSON.parse(jsonData);

  await albumVault.insertMany(data);

  console.log("Initial albums inserted");
}
/* ------------------------------------------------- */

const documentCounts = await songVault.countDocuments();
if (documentCounts === 0) {
  let jsonData = fs.readFileSync('./public/resources/database_initials/songVault.json','utf-8');
  let data = JSON.parse(jsonData);

  await songVault.insertMany(data);
  console.log("Initial songs inserted");
}

function validateSong(body) {
  const title = body.title?.trim();
  const runtime = body.runtime?.trim();
  const bpm = parseInt(body.bpm);
  const number = parseInt(body.number);

  if (!title || title.length > 50) {
    return { error: "Title is required and can't exceed 50 characters" };
  }
  if (!/^[0-9]{1,2}:[0-5][0-9]$/.test(runtime ?? '')) {
    return { error: 'Duration must be in format X:YY with YY being equal or less than 60' };
  }
  if (Number.isNaN(bpm) || bpm < 40 || bpm > 240) {
    return { error: 'BPM must be a number betwen 40 and 240' };
  }
  if (Number.isNaN(number) || number < 1) {
    return { error: 'Song number must be at least 1' };
  }

  return { data: { title, runtime, bpm, number } };
}

function renderError(res, status, message, backUrl = '/home/1') {
  return res.status(status).render('error', { status, message, backUrl });
}




router.get('/home/:page', async (req,res) => {

  /* START OF DATABASE OPERATIONS -------------------- */

  let albumList = await utils.getAlbumList(albumVault);
  let albumArray = [];
  for (let name of albumList) {
    let album = await utils.getAlbum(albumVault, name);
    albumArray.push(album);
  }

/* END OF DATABASE OPERATIONS -------------------- */

/* START OF PAGINATION OPERATIONS -------------------- */

  let maxPages = 0;
  let aux = Math.trunc(albumArray.length / 6); //To get the integer division
  if ( (albumArray.length % 6) !== 0) {
    aux++;
  }
  maxPages = aux;
/* END OF PAGINATION OPERATIONS -------------------- */

  let currentPage = Number.parseInt(req.params.page,10);
  let maxAlbumIndex = (currentPage * 6) -1;
  let firstAlbumIndex = maxAlbumIndex - 5;

  const shownAlbumsArray = albumArray.slice(firstAlbumIndex, maxAlbumIndex + 1);

  let pagesArray = [];
  for (let i = 1; i <= maxPages; i++) {
    pagesArray.push({number: i, current: currentPage == i});
  }

  res.render('home', {
    home: true,
    found: true,
    searchPage: false,
    shownAlbumsArray,
    pagesArray,
    lastPage: currentPage - 1,
    nextPage: currentPage + 1,
    first: currentPage == 1,
    last: currentPage == maxPages
  });

});



router.get('/home', async (req,res) => {

  let name = req.query.search;
  let album = await utils.getAlbum(albumVault, name);

  let genre = req.query.genre;
  
  let albumsArray = await utils.getAlbumByGenre(albumVault, genre);

  let shownAlbumsArray = [];

  if (album)
    shownAlbumsArray.push(album);
  
  else if (albumsArray) 
    for (let album of albumsArray) 
      shownAlbumsArray.push(album);
  


  res.render('home', {
    home: true,
    shownAlbumsArray,
    found:(album) || (albumsArray),
    searchPage: true
  });
});



// Helper functions 
function renderMessage(res, status, title, message, links) {
  res.status(status).render('message', { title, message, links });
}
function renderNotFound(res) {
  return renderError(res, 404, 'Album not found', '/home/1');
}

function renderAlbumForm(res, { albumId = null, errors = {}, values = {} }) {
  const isEdit = albumId !== null;
  res.render('new_element', {
    isEdit,
    formTitle: isEdit ? 'Edit Album' : 'New Album',
    action: isEdit ? `/edit/${albumId}` : '/new_element',
    cancelUrl: isEdit ? `/detail/${albumId}` : '/home/1',
    errors,
    values,
    genreOptions: utils.GENRES.map(g => ({ ...g, selected: g.value === values.genre }))
  });
}

// ---------- Create ----------
router.get('/new_element', (req, res) => {
  renderAlbumForm(res, {});
});

router.post('/new_element', upload.single('cover'), async (req, res) => {
  const { errors, data } = await utils.validateAlbum(albumVault, req.body, req.file);

  if (Object.keys(errors).length > 0) {
    if (req.file) fs.unlink(req.file.path, () => {});
   return renderError(res, 400, Object.values(errors).join('. '), '/new_element');
  }

  const result = await albumVault.insertOne({
    ...data,
    cover: req.file.filename,
    releaseDate: utils.swapDateFormat(data.releaseDate)
  });

  await albumVault.updateOne({ name: 'albumList' }, { $push: { list: data.name } });

  renderMessage(res, 200, 'Album created', `The album "${data.name}" has been created successfully.`, [
    { url: `/detail/${result.insertedId}`, text: 'View album' },
    { url: '/home/1', text: 'Back to home' }
  ]);
});

// ---------- Edit ----------
router.get('/edit/:id', async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) return renderNotFound(res);

  const album = await albumVault.findOne({ _id: new ObjectId(req.params.id) });
  if (!album) return renderNotFound(res);

  renderAlbumForm(res, {
    albumId: req.params.id,
    values: { ...album, releaseDate: utils.swapDateFormat(album.releaseDate) }
  });
});

router.post('/edit/:id', upload.single('cover'), async (req, res) => {
  const discardFile = () => { if (req.file) fs.unlink(req.file.path, () => {}); };

  if (!ObjectId.isValid(req.params.id)) { discardFile(); return renderNotFound(res); }

  const album = await albumVault.findOne({ _id: new ObjectId(req.params.id) });
  if (!album) { discardFile(); return renderNotFound(res); }

  const { errors, data } = await utils.validateAlbum(albumVault, req.body, req.file, {
    excludeId: req.params.id,
    coverRequired: false
  });

  if (Object.keys(errors).length > 0) {
    discardFile();
   return renderError(res, 400, Object.values(errors).join('. '), `/edit/${req.params.id}`);
  }

  const changes = { ...data, releaseDate: utils.swapDateFormat(data.releaseDate) };
  if (req.file) changes.cover = req.file.filename;

  await albumVault.updateOne({ _id: album._id }, { $set: changes });

  if (req.file && album.cover) {
    fs.unlink(path.join('uploads', album.cover), () => {});
  }

  if (data.name !== album.name) {
    await songVault.updateMany({ album: album.name }, { $set: { album: data.name } });
    await albumVault.updateOne({ name: 'albumList', list: album.name }, { $set: { 'list.$': data.name } });
  }

  renderMessage(res, 200, 'Album updated', `The album "${data.name}" has been updated successfully.`, [
    { url: `/detail/${req.params.id}`, text: 'Back to album' },
    { url: '/home/1', text: 'Back to home' }
  ]);
});


/*START DEATIL PAGE OPERATIONS -------------------- */
router.get('/detail/:id', async (req,res) => {

if (!ObjectId.isValid(req.params.id)) {
    return renderError(res,404,'Album not found','/home/1');
  }

  const album = await albumVault.findOne({ _id: new ObjectId(req.params.id) });

if (!album) {
    return renderError(res,404,'Album not found','/home/1');
  }

  const songs = await songVault
    .find({album:album.name})
    .sort({number:1})
    .toArray();

  res.render('detail', { album, songs });
});
 
/*new song*/
router.post('/detail/:id/songs', async (req, res) => {
    console.log('POST recibido', req.params.id, req.body);

      if (!ObjectId.isValid(req.params.id)) {
    return renderError(res, 404, 'Album not found','/home/1');
  }

    const album = await albumVault.findOne({ _id: new ObjectId(req.params.id) });

    if (!album) {
    return renderError(res, 404, 'Album not found','/home/1');
  }

    const { title, bpm, runtime, number } = req.body;

    const { error, data } = validateSong(req.body);
       if (error) {
      return renderError(res, 400, error, `/detail/${req.params.id}`);
    }

    const duplicated = await songVault.findOne({ album: album.name, number: data.number });
      if (duplicated) {
      return renderError(res, 400, 'There is a song with the same number in this album already', `/detail/${req.params.id}`);
    }

    await songVault.insertOne({
        title: title.trim(),
        bpm: parseInt(bpm),
        runtime: runtime.trim(),
        number: parseInt(number),
        album: album.name
    });

    res.redirect(`/detail/${req.params.id}`);
});

/*delete song*/
router.get('/detail/:id/songs/:songId/delete/confirm', async (req, res) => {
    if (!ObjectId.isValid(req.params.id) || !ObjectId.isValid(req.params.songId)) {
        return renderError(res, 404, 'Canción no encontrada');
    }

    const album = await albumVault.findOne({ _id: new ObjectId(req.params.id) });
    if (!album) {
        return renderError(res, 404, 'Álbum no encontrado');
    }

    const song = await songVault.findOne({
        _id: new ObjectId(req.params.songId),
        album: album.name
    });
    if (!song) {
        return renderError(res, 404, 'Canción no encontrada', `/detail/${req.params.id}`);
    }

    res.render('confirmdeletesong', {
        song,
        albumName: album.name,
        albumId: req.params.id,
        songId: req.params.songId
    });
});
router.post('/detail/:id/songs/:songId/delete', async (req, res) => {

 if (!ObjectId.isValid(req.params.songId)) {
        return renderError(res,404,'Song not found',`/detail/${req.params.id}`);
    }

    await songVault.deleteOne({ _id: new ObjectId(req.params.songId) });

    res.redirect(`/detail/${req.params.id}`);
});

/*edit song*/
router.get('/detail/:id/songs/:songId/edit', async (req, res) => {

if (!ObjectId.isValid(req.params.songId)) {
        return renderError(res,404,'Song not found',`/detail/${req.params.id}`);
    }

    const song = await songVault.findOne({ _id: new ObjectId(req.params.songId) });

    if (!song) {
        return renderError(res,404,'Song not found',`/detail/${req.params.id}`);
    }

    res.render('editSong', {
        ...song,
        songId: song._id.toString(),
        album_Id: req.params.id
    });
});

router.post('/detail/:id/songs/:songId/edit/confirm', async (req, res) => {
    const editUrl = `/detail/${req.params.id}/songs/${req.params.songId}/edit`;

    if (!ObjectId.isValid(req.params.id) || !ObjectId.isValid(req.params.songId)) {
        return renderError(res, 404, 'Song not found', `/detail/${req.params.id}`);
    }

    const album = await albumVault.findOne({ _id: new ObjectId(req.params.id) });
    if (!album) {
        return renderError(res, 404, 'Album not found', '/home/1');
    }

    const song = await songVault.findOne({ _id: new ObjectId(req.params.songId) });
    if (!song) {
        return renderError(res, 404, 'Song not found', `/detail/${req.params.id}`);
    }

    const { error, data } = validateSong(req.body);
    if (error) {
        return renderError(res, 400, error, editUrl);
    }

    const duplicated = await songVault.findOne({
        album: album.name,
        number: data.number,
        _id: { $ne: song._id }
    });
    if (duplicated) {
        return renderError(res, 400, 'There is a song with the same number in this album already', editUrl);
    }

    res.render('confirmeditsong', {
        old: song,
        new: data,
        albumId: req.params.id,
        songId: req.params.songId
    });
});

router.post('/detail/:id/songs/:songId/edit', async (req, res) => {
    const editUrl = `/detail/${req.params.id}/songs/${req.params.songId}/edit`;

    if (!ObjectId.isValid(req.params.id) || !ObjectId.isValid(req.params.songId)) {
        return renderError(res, 404, 'Song not found', `/detail/${req.params.id}`);
    }

    const album = await albumVault.findOne({ _id: new ObjectId(req.params.id) });
    if (!album) {
        return renderError(res, 404, 'Song not found', '/home/1');
        }

    const { error, data } = validateSong(req.body);
    if (error) {
        return renderError(res, 400, error, editUrl);
    }

    const songId = new ObjectId(req.params.songId);

    const duplicated = await songVault.findOne({
        album: album.name,
        number: data.number,
        _id: { $ne: songId }
    });
    if (duplicated) {
        return renderError(res, 400, 'There is a song with the same number in this album already', editUrl);
    }

    await songVault.updateOne(
        { _id: songId, album: album.name },
        { $set: data }
    );

    res.redirect(`/detail/${req.params.id}`);
});

export default router;