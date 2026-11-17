import express from 'express';
import { MongoClient } from 'mongodb';
import * as utils from './albumHandler.js';
import * as utilsongs from './songHandler.js';

const router = express.Router();
const client = new MongoClient('mongodb://localhost:27017');

const db = client.db('recordScratch');
const albumVault = db.collection('albumVault');
const songVault = db.collection('songVault');

export default router;


/* START OF DATABASE OPERATIONS -------------------- */

  let albumList = await utils.getAlbumList(albumVault);
  let albumArray = [];
  for (let name of albumList) {
    let album = await utils.getAlbum(albumVault, name);
    albumArray.push(album);
  }

  /*let songList = await utilsongs.getSongList(songVault);
  let songArray = [];
  for (let name of songList) {
    if (album==)
    let song = await utilsongs.getSong(songVault, name);
    songArray.push(song);
  }*/
/* END OF DATABASE OPERATIONS -------------------- */


/* START OF PAGINATION OPERATIONS -------------------- */

  let maxPages = 0;
  let aux = Math.trunc(albumArray.length / 6); //To get the integer division
  if ( (albumArray.length % 6) !== 0) {
    aux++;
  }
  maxPages = aux;
/* END OF PAGINATION OPERATIONS -------------------- */



router.get('/home/:page', async (req,res) => {

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

router.get('/detail', (req,res) => {
  res.render('detail');
});