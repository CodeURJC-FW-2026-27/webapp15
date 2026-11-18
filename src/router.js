import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import multer from 'multer';
import fs from 'node:fs';
import * as utils from './albumHandler.js';
import * as utilsongs from './songHandler.js';

const router = express.Router();

const upload = multer({ dest: 'uploads/' });
const generosPermitidos = ['hyperpop', 'EDM', 'k-pop', 'rock', 'pop', 'rap', 'bachata', 'reggaeton']; 



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
    return { error: 'El título es obligatorio y no puede superar los 50 caracteres' };
  }
  if (!/^[0-9]{1,2}:[0-5][0-9]$/.test(runtime ?? '')) {
    return { error: 'La duración debe tener el formato m:ss, por ejemplo 5:34' };
  }
  if (Number.isNaN(bpm) || bpm < 40 || bpm > 240) {
    return { error: 'El BPM debe ser un número entre 40 y 240' };
  }
  if (Number.isNaN(number) || number < 1) {
    return { error: 'El número de canción debe ser 1 o mayor' };
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



router.get('/new_element', (req,res) => {
  res.render('new_element', {errores: {}, valores: {}});
});

/*START OF VALIDATIONS OF NEW ELEMENT-------------------- */
 router.post('/new_element', upload.single('cover'), async (req, res) => {

  const errores = {}; //create a new object errores, if errores is empty there are no errors, if it has properties there are errors 

  //name 
  const name = (req.body.name || '').trim(); //req.body.name is what user enter like name, all is saved in name 
  if (name === '') {
    errores.name = 'The name is a required field';
  } else if (name[0] !== name[0].toUpperCase() || name[0] === name[0].toLowerCase()) { 
    errores.name = 'The name must start with a capital letter';
  } else if (await albumVault.findOne({ name: name })) { //awai is the function that waits until mongodb returns the result, findone is the function that 
    errores.name = 'An album with that name already exists';// returns null or the value that is duplicated
  }

  // author
const author = (req.body.author || '').trim();
if (author === '') {
  errores.author = 'The author is a required field';
} else if (author.length > 100) {
  errores.author = 'The author cannot exceed 100 characters';
}

// genre
const genre = (req.body.genre || '').trim();
if (genre === '') {
  errores.genre = 'The genre is a required field';
} else if (!generosPermitidos.includes(genre)) { //looks at the top list and look for it 
  errores.genre = 'Select a valid genre';
}

//youTube
const leadSingle = (req.body.leadSingle || '').trim();
if (leadSingle === '') {
  errores.leadSingle = 'The  YouTube link is a required field';
} else if (!/^https:\/\/youtu\.be\/[A-Za-z0-9_-]{11}$/.test(leadSingle)) {
  errores.leadSingle = 'Enter a link of the type https://youtu.be/XXXXXXXXXXX';
}

//date
const releaseDate = req.body.releaseDate || '';
const fecha = new Date(releaseDate); //new date turns text to a real date 
if (releaseDate === '') {
  errores.releaseDate = 'The date is a required field';
} else if (!/^\d{4}-\d{2}-\d{2}$/.test(releaseDate) //comprove 4 digits, 2 digits and 2 digits 
           || Number.isNaN(fecha.getTime()) //if date is something not real, isNaN tells is not a date, and turns in getTime NaN
           || fecha.toISOString().slice(0, 10) !== releaseDate) {//turns date to a text again and compare with the original text, if is not the same is not a valid date
  errores.releaseDate = 'Enter a valid date'; // silce is for reconversion
} else if (releaseDate < '1900-01-01' || fecha > new Date()) {
  errores.releaseDate = 'The date must be between 1900 and today';
}

// songs number
const songNumber = Number(req.body.songNumber);
if (req.body.songNumber === '' || !Number.isInteger(songNumber) || songNumber < 1 || songNumber > 100) {
  errores.songNumber = 'Enter an integer between 1 and 100';
}

// description
const description = (req.body.description || '').trim();
if (description.length < 50 || description.length > 500) {
  errores.description = 'The description must be between 50 and 500 characters';
}

// cover 
if (!req.file) {
  errores.cover = 'You must upload a cover';
} else if (!req.file.mimetype.startsWith('image/')) {
  errores.cover = 'The file must be an image';
}
   if (Object.keys(errores).length > 0) {
  if (req.file) fs.unlink(req.file.path, () => {});
  return res.render('new_element', { errores, valores: req.body });
} // object keys is a function that returns an array with the properties of the object, if the length is greater than 0 there are errors 
   
  //mongodb operations
  const [year, month, day] = releaseDate.split('-');

   const result = await albumVault.insertOne({
    name: name,
    author: author,
    genre: genre,
    cover: req.file.filename,
    songNumber: songNumber,
    leadSingle: leadSingle,
    releaseDate: `${day}-${month}-${year}`,
    description: description
  });

  // The home page reads the album names from the "albumList" document
  await albumVault.updateOne(
    { name: 'albumList' },
    { $push: { list: name } }
  );

  res.render('message', {
    title: 'Album created',
    message: `The album "${name}" has been created successfully.`,
    links: [
      { url: `/detail/${result.insertedId}`, text: 'View album' },
      { url: '/home/1', text: 'Back to home' }
    ]
  });
}); 
 



/*START DEATIL PAGE OPERATIONS -------------------- */
router.get('/detail/:id', async (req,res) => {

if (!ObjectId.isValid(req.params.id)) {
    return res.status(404).send('Álbum no encontrado');
  }

  const album = await albumVault.findOne({ _id: new ObjectId(req.params.id) });

if (!album) {
    return res.status(404).send('Álbum no encontrado');
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
    return renderError(res, 404, 'Álbum no encontrado');
  }

    const album = await albumVault.findOne({ _id: new ObjectId(req.params.id) });

    if (!album) {
    return renderError(res, 404, 'Álbum no encontrado');
  }

    const { title, bpm, runtime, number } = req.body;

    const { error, data } = validateSong(req.body);
       if (error) {
      return renderError(res, 400, error, `/detail/${req.params.id}`);
    }

    const duplicated = await songVault.findOne({ album: album.name, number: data.number });
      if (duplicated) {
      return renderError(res, 400, 'Ya hay una canción con ese número en este álbum', `/detail/${req.params.id}`);
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
router.post('/detail/:id/songs/:songId/delete', async (req, res) => {

 if (!ObjectId.isValid(req.params.songId)) {
        return res.status(404).send('Canción no encontrada');
    }

    await songVault.deleteOne({ _id: new ObjectId(req.params.songId) });

    res.redirect(`/detail/${req.params.id}`);
});

/*edit song*/
router.get('/detail/:id/songs/:songId/edit', async (req, res) => {

if (!ObjectId.isValid(req.params.songId)) {
        return res.status(404).send('Canción no encontrada');
    }

    const song = await songVault.findOne({ _id: new ObjectId(req.params.songId) });

    if (!song) {
        return res.status(404).send('Canción no encontrada');
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
        return renderError(res, 404, 'Canción no encontrada');
    }

    const album = await albumVault.findOne({ _id: new ObjectId(req.params.id) });
    if (!album) {
        return renderError(res, 404, 'Álbum no encontrado');
    }

    const song = await songVault.findOne({ _id: new ObjectId(req.params.songId) });
    if (!song) {
        return renderError(res, 404, 'Canción no encontrada');
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
        return renderError(res, 400, 'Ya hay una canción con ese número en este álbum', editUrl);
    }

    res.render('confirmedit', {
        old: song,
        new: data,
        albumId: req.params.id,
        songId: req.params.songId
    });
});

router.post('/detail/:id/songs/:songId/edit', async (req, res) => {
    const editUrl = `/detail/${req.params.id}/songs/${req.params.songId}/edit`;

    if (!ObjectId.isValid(req.params.id) || !ObjectId.isValid(req.params.songId)) {
        return renderError(res, 404, 'Canción no encontrada');
    }

    const album = await albumVault.findOne({ _id: new ObjectId(req.params.id) });
    if (!album) {
        return renderError(res, 404, 'Álbum no encontrado');
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
        return renderError(res, 400, 'Ya hay una canción con ese número en este álbum', editUrl);
    }

    await songVault.updateOne(
        { _id: songId, album: album.name },
        { $set: data }
    );

    res.redirect(`/detail/${req.params.id}`);
});


router.get('/error', (req,res) => {

  res.render('error');
});

export default router;