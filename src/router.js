import express from 'express';
import { MongoClient } from 'mongodb';
import fs from 'node:fs';
import * as utils from './albumHandler.js';
import * as utilsongs from './songHandler.js';

const router = express.Router();



/* CREATION OF DATABASE ON MONGO DB IF NOT FOUND*/

const client = new MongoClient('mongodb://localhost:27017');

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



export default router;


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
    shownAlbumsArray,
    pagesArray,
    lastPage: currentPage - 1,
    nextPage: currentPage + 1,
    first: currentPage == 1,
    last: currentPage == maxPages
  });

});

router.get('/new_element', (req,res) => {
  res.render('new_element');
});

router.get('/detail/:id', async (req,res) => {

  const album = await albumVault.findOne({ _id: new ObjectId(req.params.id) });

  const songs = await songVault
    .find({album:album.name})
    .sort({number:1})
    .toArray();

  res.render('detail', { album, songs });
});