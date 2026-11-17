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

const documentCounts = await songVault.countDocuments();
if (documentCounts === 0) {
  await songVault.insertMany([
    {
    "title": "The Explanation",
    "runtime": "0:50",
    "bpm": "80",
    "album": "17",
    "number": 1
  },
  {
    "title": "Jocelyn Flores",
    "runtime": "1:59",
    "bpm": "134",
    "album": "17",
    "number": 2
  },
  {
    "title": "Depression & Obsession",
    "runtime": "2:24",
    "bpm": "80",
    "album": "17",
    "number": 3
  },
  {
    "title": "Everybody Dies In Their Nightmares",
    "runtime": "1:35",
    "bpm": "130",
    "album": "17",
    "number": 4
  },
  {
    "title": "Revenge",
    "runtime": "2:00",
    "bpm": "140",
    "album": "17",
    "number": 5
  },
  {
    "title": "Save Me",
    "runtime": "2:43",
    "bpm": "75",
    "album": "17",
    "number": 6
  },
  {
    "title": "Dead Inside (Interlude)",
    "runtime": "1:26",
    "bpm": "70",
    "album": "17",
    "number": 7
  },
  {
    "title": "Fuck Love",
    "runtime": "2:26",
    "bpm": "80",
    "album": "17",
    "number": 8
  },
  {
    "title": "Carry On",
    "runtime": "2:09",
    "bpm": "130",
    "album": "17",
    "number": 9
  },
  {
    "title": "Orlando",
    "runtime": "2:43",
    "bpm": "78",
    "album": "17",
    "number": 10
  },
  {
    "title": "Ayala (Outro)",
    "runtime": "1:39",
    "bpm": "72",
    "album": "17",
    "number": 11
  },
  {
    "title": "Intro",
    "runtime": "1:16",
    "bpm": "100",
    "album": "Different World",
    "number": 1
  },
  {
    "title": "Lost Control",
    "runtime": "3:42",
    "bpm": "140",
    "album": "Different World",
    "number": 2
  },
  {
    "title": "I Don't Wanna Go",
    "runtime": "2:41",
    "bpm": "128",
    "album": "Different World",
    "number": 3
  },
  {
    "title": "Lily",
    "runtime": "3:15",
    "bpm": "140",
    "album": "Different World",
    "number": 4
  },
  {
    "title": "Lonely",
    "runtime": "3:36",
    "bpm": "128",
    "album": "Different World",
    "number": 5
  },
  {
    "title": "Do It All for You",
    "runtime": "2:54",
    "bpm": "128",
    "album": "Different World",
    "number": 6
  },
  {
    "title": "Different World",
    "runtime": "3:22",
    "bpm": "140",
    "album": "Different World",
    "number": 7
  },
  {
    "title": "Interlude",
    "runtime": "1:19",
    "bpm": "95",
    "album": "Different World",
    "number": 8
  },
  {
    "title": "Sing Me to Sleep",
    "runtime": "3:07",
    "bpm": "150",
    "album": "Different World",
    "number": 9
  },
  {
    "title": "All Falls Down",
    "runtime": "3:18",
    "bpm": "98",
    "album": "Different World",
    "number": 10
  },
  {
    "title": "Darkside",
    "runtime": "3:31",
    "bpm": "135",
    "album": "Different World",
    "number": 11
  },
  {
    "title": "Alone",
    "runtime": "2:40",
    "bpm": "140",
    "album": "Different World",
    "number": 12
  },
  {
    "title": "Diamond Heart",
    "runtime": "4:00",
    "bpm": "124",
    "album": "Different World",
    "number": 13
  },
  {
    "title": "Faded (Interlude)",
    "runtime": "0:41",
    "bpm": "90",
    "album": "Different World",
    "number": 14
  },
  {
    "title": "Faded",
    "runtime": "3:32",
    "bpm": "90",
    "album": "Different World",
    "number": 15
  },
      {
  "title": "El Final De La Estación",
  "runtime": "3:40",
  "bpm": "130",
  "album": "El Mañana No Es Nada...",
  "number": 1
},
{
  "title": "¿Cómo Es Posible?",
  "runtime": "2:56",
  "bpm": "167",
  "album": "El Mañana No Es Nada...",
  "number": 2
},
{
  "title": "Espacio Sideral",
  "runtime": "4:53",
  "bpm": "174",
  "album": "El Mañana No Es Nada...",
  "number": 3
},
{
  "title": "El Mañana No Es Nada",
  "runtime": "4:15",
  "bpm": "106",
  "album": "El Mañana No Es Nada...",
  "number": 4
},
{
  "title": "Cuarto Piso",
  "runtime": "3:28",
  "bpm": "97",
  "album": "El Mañana No Es Nada...",
  "number": 5
},
{
  "title": "Boca Abajo",
  "runtime": "4:17",
  "bpm": "170",
  "album": "El Mañana No Es Nada...",
  "number": 6
},
{
  "title": "Caroline",
  "runtime": "3:22",
  "bpm": "141",
  "album": "El Mañana No Es Nada...",
  "number": 7
},
{
  "title": "¿Qué Pasará?",
  "runtime": "3:10",
  "bpm": "91",
  "album": "El Mañana No Es Nada...",
  "number": 8
},
{
    "title": "EVERYTHING I'VE EVER WANTED",
    "runtime": "2:15",
    "bpm": "150",
    "album": "HALO",
    "number": 1
  },
  {
    "title": "DOIT4ME",
    "runtime": "3:01",
    "bpm": "142",
    "album": "HALO",
    "number": 2
  },
  {
    "title": "SAME LA",
    "runtime": "3:44",
    "bpm": "136",
    "album": "HALO",
    "number": 3
  },
  {
    "title": "PRETTY4U",
    "runtime": "2:25",
    "bpm": "148",
    "album": "HALO",
    "number": 4
  },
  {
    "title": "COPYCAT",
    "runtime": "2:15",
    "bpm": "152",
    "album": "HALO",
    "number": 5
  },
  {
    "title": "NO LUCK",
    "runtime": "3:08",
    "bpm": "140",
    "album": "HALO",
    "number": 6
  },
  {
    "title": "BREAKUP",
    "runtime": "2:40",
    "bpm": "146",
    "album": "HALO",
    "number": 7
  },
  {
    "title": "TELL ME WHAT I DID",
    "runtime": "2:33",
    "bpm": "144",
    "album": "HALO",
    "number": 8
  },
  {
    "title": "START OVER",
    "runtime": "2:50",
    "bpm": "138",
    "album": "HALO",
    "number": 9
  },
  {
    "title": "LOOK UP",
    "runtime": "2:17",
    "bpm": "154",
    "album": "HALO",
    "number": 10
  },
  {
    "title": "AMERICAN GIRL",
    "runtime": "2:56",
    "bpm": "145",
    "album": "HALO",
    "number": 11
  },
  {
    "title": "FAREWELL TOLEDO",
    "runtime": "2:30",
    "bpm": "132",
    "album": "HALO",
    "number": 12
  },
  {
    "title": "IT'S NOT LIKE THAT ANYMORE",
    "runtime": "3:47",
    "bpm": "128",
    "album": "HALO",
    "number": 13
  },
  {
  "title": "Manchild",
  "runtime": "3:33",
  "bpm": "123",
  "album": "Man's Best Friend",
  "number": 1
},
{
  "title": "Tears",
  "runtime": "2:40",
  "bpm": "113",
  "album": "Man's Best Friend",
  "number": 2
},
{
  "title": "My Man On Willpower",
  "runtime": "3:17",
  "bpm": "120",
  "album": "Man's Best Friend",
  "number": 3
},
{
  "title": "Sugar Talking",
  "runtime": "3:03",
  "bpm": "152",
  "album": "Man's Best Friend",
  "number": 4
},
{
  "title": "We Almost Broke Up Again Last Night",
  "runtime": "3:23",
  "bpm": "176",
  "album": "Man's Best Friend",
  "number": 5
},
{
  "title": "Nobody's son",
  "runtime": "3:02",
  "bpm": "174",
  "album": "Man's Best Friend",
  "number": 6
},
{
  "title": "Never Getting Laid",
  "runtime": "3:28",
  "bpm": "92",
  "album": "Man's Best Friend",
  "number": 7
},
{
  "title": "When Did You Get Hot",
  "runtime": "2:25",
  "bpm": "89",
  "album": "Man's Best Friend",
  "number": 8
},
{
  "title": "Go Go Juice",
  "runtime": "3:13",
  "bpm": "132",
  "album": "Man's Best Friend",
  "number": 9
},
{
  "title": "Don't Worry I'll Make You Worry",
  "runtime": "3:42",
  "bpm": "90",
  "album": "Man's Best Friend",
  "number": 10
},
{
  "title": "House Tour",
  "runtime": "2:49",
  "bpm": "118",
  "album": "Man's Best Friend",
  "number": 11
},
{
  "title": "Goodbye",
  "runtime": "3:45",
  "bpm": "120",
  "album": "Man's Best Friend",
  "number": 12
},
{
  "title": "Such A Funny Way",
  "runtime": "3:52",
  "bpm": "116",
  "album": "Man's Best Friend",
  "number": 13
},
{
    "title": "Ex Machina",
    "runtime": "3:02",
    "bpm": "128",
    "album": "Soft Error : X",
    "number": 1
  },
  {
    "title": "White cat",
    "runtime": "3:22",
    "bpm": "130",
    "album": "Soft Error : X",
    "number": 2
  },
  {
    "title": "Soap (feat. PinkPantheress)",
    "runtime": "2:27",
    "bpm": "136",
    "album": "Soft Error : X",
    "number": 3
  },
  {
    "title": "Aibo (feat. Bratty)",
    "runtime": "2:21",
    "bpm": "124",
    "album": "Soft Error : X",
    "number": 4
  },
  {
    "title": "Do you feel it like i touch",
    "runtime": "3:05",
    "bpm": "122",
    "album": "Soft Error : X",
    "number": 5
  },
  {
    "title": "Study",
    "runtime": "2:01",
    "bpm": "118",
    "album": "Soft Error : X",
    "number": 6
  },
  {
    "title": "mom",
    "runtime": "2:44",
    "bpm": "110",
    "album": "Soft Error : X",
    "number": 7
  },
  {
    "title": "Intro (The Last)",
    "runtime": "1:24",
    "album": "The Last",
    "number": 1
  },
  {
    "title": "Por un segundo",
    "runtime": "4:15",
    "album": "The Last",
    "number": 2
  },
  {
    "title": "Yo quisiera amarla",
    "runtime": "5:06",
    "album": "The Last",
    "number": 3
  },
  {
    "title": "El malo",
    "runtime": "3:58",
    "album": "The Last",
    "number": 4
  },
  {
    "title": "Dile al amor",
    "runtime": "3:49",
    "album": "The Last",
    "number": 5
  },
  {
    "title": "Su veneno",
    "runtime": "4:00",
    "album": "The Last",
    "number": 6
  },
  {
    "title": "Tu jueguito",
    "runtime": "3:42",
    "album": "The Last",
    "number": 7
  },
  {
    "title": "Spanish Fly",
    "runtime": "3:57",
    "album": "The Last",
    "number": 8
  },
  {
    "title": "Peligro",
    "runtime": "4:38",
    "album": "The Last",
    "number": 9
  },
  {
    "title": "La tormenta",
    "runtime": "4:35",
    "album": "The Last",
    "number": 10
  },
  {
    "title": "El desprecio",
    "runtime": "4:35",
    "album": "The Last",
    "number": 11
  },
  {
    "title": "All Up 2 You",
    "runtime": "3:38",
    "album": "The Last",
    "number": 12
  },
  {
    "title": "Skit",
    "runtime": "4:05",
    "album": "The Last",
    "number": 13
  },
  {
    "title": "La curita",
    "runtime": "3:21",
    "album": "The Last",
    "number": 14
  },
  {
    "title": "Princesita",
    "runtime": "4:17",
    "album": "The Last",
    "number": 15
  },
  {
    "title": "Su vida",
    "runtime": "4:34",
    "album": "The Last",
    "number": 16
  },
  {
    "title": "Soy hombre",
    "runtime": "3:59",
    "album": "The Last",
    "number": 17
  },
  {
    "title": "Gracias",
    "runtime": "7:33",
    "album": "The Last",
    "number": 18
  },
  {"title":"Moscow Mule",
  "runtime":"4:05",
  "bpm":"100",
  "album":"Un Verano Sin Ti",
  "number":1},
  {"title":"Después de la Playa",
  "runtime":"3:50",
  "bpm":"126",
  "album":"Un Verano Sin Ti",
  "number":2},
  {"title":"Me Porto Bonito",
  "runtime":"2:58",
  "bpm":"92",
  "album":"Un Verano Sin Ti",
  "number":3},
  {"title":"Tití Me Preguntó",
  "runtime":"4:03",
  "bpm":"107",
  "album":"Un Verano Sin Ti",
  "number":4},
  {"title":"Un Ratito",
  "runtime":"2:56",
  "bpm":"94",
  "album":"Un Verano Sin Ti",
  "number":5},
  {"title":"Yo No Soy Celoso",
  "runtime":"3:50",
  "bpm":"95",
  "album":"Un Verano Sin Ti",
  "number":6},
  {"title":"Tarot",
  "runtime":"3:57",
  "bpm":"122",
  "album":"Un Verano Sin Ti",
  "number":7},
  {"title":"Neverita",
  "runtime":"2:53",
  "bpm":"122",
  "album":"Un Verano Sin Ti",
  "number":8},
  {"title":"La Corriente",
  "runtime":"3:18",
  "bpm":"94",
  "album":"Un Verano Sin Ti",
  "number":9},
  {"title":"Efecto",
  "runtime":"3:33",
  "bpm":"98",
  "album":"Un Verano Sin Ti",
  "number":10},
  {"title":"Party",
  "runtime":"3:47",
  "bpm":"128",
  "album":"Un Verano Sin Ti",
  "number":11},
  {"title":"Aguacero",
  "runtime":"3:30",
  "bpm":"110",
  "album":"Un Verano Sin Ti",
  "number":12},
  {"title":"Enséñame a Bailar",
  "runtime":"2:56",
  "bpm":"124",
  "album":"Un Verano Sin Ti",
  "number":13},
  {"title":"Ojitos Lindos",
  "runtime":"4:18",
  "bpm":"80",
  "album":"Un Verano Sin Ti",
  "number":14},
  {"title":"Dos Mil 16",
  "runtime":"3:28",
  "bpm":"95",
  "album":"Un Verano Sin Ti",
  "number":15},
  {"title":"El Apagón",
  "runtime":"3:21",
  "bpm":"118",
  "album":"Un Verano Sin Ti",
  "number":16},
  {"title":"Otro Atardecer",
  "runtime":"4:04",
  "bpm":"88",
  "album":"Un Verano Sin Ti",
  "number":17},
  {"title":"Un Coco",
  "runtime":"3:16",
  "bpm":"105",
  "album":"Un Verano Sin Ti",
  "number":18},
  {"title":"Andrea",
  "runtime":"5:39",
  "bpm":"90",
  "album":"Un Verano Sin Ti",
  "number":19},
  {"title":"Me Fui de Vacaciones",
  "runtime":"3:00",
  "bpm":"92",
  "album":"Un Verano Sin Ti",
  "number":20},
  {"title":"Un Verano Sin Ti",
  "runtime":"2:28",
  "bpm":"84",
  "album":"Un Verano Sin Ti",
  "number":21},
  {"title":"Agosto",
  "runtime":"2:31",
  "bpm":"96",
  "album":"Un Verano Sin Ti",
  "number":22},
  {"title":"Callaíta",
  "runtime":"4:11",
  "bpm":"176",
  "album":"Un Verano Sin Ti",
  "number":23},
  {
  "title": "The View From The Afternoon",
  "runtime": "3:38",
  "bpm": "144",
  "album": "Whatever People Say I Am, That's What I'm Not",
  "number": 1
},
{
  "title": "I Bet You Look Good On The Dancefloor",
  "runtime": "2:53",
  "bpm": "102",
  "album": "Whatever People Say I Am, That's What I'm Not",
  "number": 2
},
{
  "title": "Fake Tales Of San Francisco",
  "runtime": "2:57",
  "bpm": "127",
  "album": "Whatever People Say I Am, That's What I'm Not",
  "number": 3
},
{
  "title": "Dancing Shoes",
  "runtime": "2:21",
  "bpm": "144",
  "album": "Whatever People Say I Am, That's What I'm Not",
  "number": 4
},
{
  "title": "You Probably Couldn't See For The Lights But You Were Staring Straight At Me",
  "runtime": "2:10",
  "bpm": "105",
  "album": "Whatever People Say I Am, That's What I'm Not",
  "number": 5
},
{
  "title": "Still Take You Home",
  "runtime": "2:53",
  "bpm": "109",
  "album": "Whatever People Say I Am, That's What I'm Not",
  "number": 6
},
{
  "title": "Riot Van",
  "runtime": "2:14",
  "bpm": "104",
  "album": "Whatever People Say I Am, That's What I'm Not",
  "number": 7
},
{
  "title": "Red Light Indicates Doors Are Secured",
  "runtime": "2:23",
  "bpm": "110",
  "album": "Whatever People Say I Am, That's What I'm Not",
  "number": 8
},
{
  "title": "Mardy Bum",
  "runtime": "2:55",
  "bpm": "112",
  "album": "Whatever People Say I Am, That's What I'm Not",
  "number": 9
},
{
  "title": "Perhaps Vampires Is A Bit Strong But...",
  "runtime": "4:28",
  "bpm": "134",
  "album": "Whatever People Say I Am, That's What I'm Not",
  "number": 10
},
{
  "title": "When The Sun Goes Down",
  "runtime": "3:20",
  "bpm": "169",
  "album": "Whatever People Say I Am, That's What I'm Not",
  "number": 11
},
{
  "title": "From The Ritz To The Rubble",
  "runtime": "3:13",
  "bpm": "192",
  "album": "Whatever People Say I Am, That's What I'm Not",
  "number": 12
},
{
  "title": "A Certain Romance",
  "runtime": "5:31",
  "bpm": "137",
  "album": "Whatever People Say I Am, That's What I'm Not",
  "number": 13
}
  ]);
  console.log("Initial songs inserted");
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