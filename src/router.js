import express from 'express';
import { MongoClient } from 'mongodb';
import * as utils from './albumHandler.js';
import * as utilsongs from './songHandler.js';

const router = express.Router();

const client = new MongoClient('mongodb://localhost:27017');

await client.connect();

const db = client.db('recordScratch');
const albumVault = db.collection('albumVault');
const songVault = db.collection('songVault');

const documentCount = await albumVault.countDocuments();
if (documentCount === 0) {
  await albumVault.insertMany([
    {
      "name": "Halo",
      "author": "Tiffany Day",
      "genre": "hyperpop",
      "cover": "halo.jpg",
      "songNumber": 12,
      "leadSingle": "https://youtu.be/4yYAptebRvI",
      "releaseDate": "03-04-2026",
      "description": "Halo is the second studio album by Chinese-American sinegr-songwriter and producer Tiffany Day. Different from her previous bedroom pop sound, Tiffany dives ths time into electronic, hyperpop and EDM. In her latest record, she delves into themes of introspection, self doubt, identity and navigating the uncertainties of youth."
    },
    {
      "name": "Soft Error",
      "author": "Yves",
      "genre": "k-pop",
      "cover": "soft_error.jpg",
      "songNumber": 7,
      "leadSingle": "https://youtu.be/XuBE8ns_Ato",
      "releaseDate": "07-08-2025",
      "description": "Soft error is the third extended play by South Korean singer Yves, among tracks, it feautures singer suchs as PinkPantheress and Bratty. Coming from a k-pop background with her beginings as a member of korean girlband Loona, with Soft Error, Yves dives into a more electronic inclined sound, tought preserving it's unique k-pop charm."
    },
    {
      "name": "albumList",
      "list": [
        "Halo",
        "Different World",
        "Soft Error",
        "Whatever People Say I Am, That's What I'm Not",
        "Man's Best Friend",
        "El Mañana No Es Nada...",
        "Un Verano Sin Ti",
        "The Last",
        "17"
      ]
    },
    {
      "name": "Whatever People Say I Am, That's What I'm Not",
      "author": "Arctic Monkeys",
      "genre": "rock",
      "cover": "wpsiatwin.jpg",
      "songNumber": 13,
      "leadSingle": "https://youtu.be/pK7egZaT3hs",
      "releaseDate": "23-01-2006",
      "description": "Whatever People Say I Am, That's What I'm Not is the debut studio album by English rock band Arctic Monkeys. It was released through Domino Recording Company, recorded in December 2005 at Chapel Studios in Lincolnshire and produced by Jim Abbiss. It received critical acclaim and became the fastest-selling debut album in British music history at the time of its release."
    },
    {
      "name": "Man's Best Friend",
      "author": "Sabrina Carpenter",
      "genre": "pop",
      "cover": "mans_best_friend_bonus.jpg",
      "songNumber": 13,
      "leadSingle": "https://youtu.be/aSugSGCC12I",
      "releaseDate": "29-08-2025",
      "description": "Mans Best Friend is the fifth studio album by American singer Sabrina Carpenter. It was released through Island Records, and features a mix of pop and R&B influences, showcasing Carpenter's growth as an artist."
    },
    {
      "name": "El Mañana No Es Nada...",
      "author": "The Gluttonys",
      "genre": "rock",
      "cover": "el_mañana_no_es_nada.jpg",
      "songNumber": 9,
      "leadSingle": "https://youtu.be/AqAmJztxJfM",
      "releaseDate": "01-06-2021",
      "description": "El Mañana No Es Nada... is the debut studio album by Spanish rock band The Gluttonys. It was released through Universal Music Spain, recorded in early 2021, and produced by Carlos Hernández. The album explores themes of existentialism and personal growth, blending alternative rock with electronic elements."
    },
    {
      "name": "Different World",
      "author": "Alan Walker",
      "genre": "EDM",
      "cover": "different_world.jpg",
      "songNumber": 15,
      "leadSingle": "https://youtu.be/6RLLOEzdxsM",
      "releaseDate": "27-10-2017",
      "description": "Differnet World is the debut studio album by Norwegian DJ and producer Alan Walker. Focusing on an electronic sound, with songs like Faded which currently exceeds 4.000 million views on youtube, he became a renown pillar of the electronic music background. Different World tells a story about loneliness, feeling different, and being afraid to love all throughout it's lyrics and futuristic music videos"
    },
    {
      "name": "The Last",
      "author": "Aventura",
      "genre": "bachata",
      "cover": "the_last.jpg",
      "songNumber": 18,
      "leadSingle": "https://youtu.be/GHLVjriwzFg",
      "releaseDate": "09-06-2009",
      "description": "This album presents a cohesive collection of songs that showcase the artist’s style and musical evolution. It blends engaging melodies with thoughtful lyrics, creating a well‑rounded listening experience."
    },
    {
      "name": "17",
      "author": "XXXTentacion",
      "genre": "rap",
      "cover": "17.jpg",
      "songNumber": 11,
      "leadSingle": "https://youtu.be/CD_tD26E7k0",
      "releaseDate": "09-06-2009",
      "description": "This album it is known for its  short lenght (about 22 minutes) and its stripped‑down production built around acoustic guitar, piano,  and  lo-fi textures. The album blends emo, indie, alternativeRandB,  and lo-fi hip hop, creating an intimate, diary‑like atmosphere."
    },
    {
      "name": "Un Verano Sin Ti",
      "author": "Bad Bunny",
      "genre": "reggaeton",
      "cover": "un_verano_sin_ti.jpg",
      "songNumber": 23,
      "leadSingle": "https://youtu.be/p38WgakuYDo",
      "releaseDate": "06-05-2022",
      "description": "This album is a 23‑track project that showcases Bad Bunny’s most expansive and genre‑bending sound to date, described as a “summer playlist” full of upbeat, beach‑ready energy."
    }
  ]);

  console.log("Initial albums inserted");
}



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