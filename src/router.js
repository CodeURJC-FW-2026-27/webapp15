import express from 'express';
import { MongoClient } from 'mongodb';
import * as utils from './albumHandler.js';

const router = express.Router();
const client = new MongoClient('mongodb://localhost:27017');

const db = client.db('recordScratch');
const albumVault = db.collection('albumVault');

export default router;


router.get('/home', async (req,res) => {

  let albumList = await utils.getAlbumList(albumVault);
  let albumArray = [];
  
  for (let id of albumList) {
    let album = utils.getAlbum(albumVault,id);
    albumArray.push(album);
  }

  res.render('home', {
    albumGrid: albumArray
  });
});

router.get('/new_element', (req,res) => {
  res.render('new_element');
});

router.get('/detail', (req,res) => {
  res.render('detail');
});