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
  "_id": {
    "$oid": "6afc8626952f8397cab0338e"
  },
  "title": "El Final De La Estación",
  "runtime": "3:40",
  "bpm": "130",
  "album": "El Mañana No Es Nada...",
  "number": 1
},
{
  "_id": {
    "$oid": "6afc86f4952f8397cab0338f"
  },
  "title": "¿Cómo Es Posible?",
  "runtime": "2:56",
  "bpm": "167",
  "album": "El Mañana No Es Nada...",
  "number": 2
},
{
  "_id": {
    "$oid": "6afc8768952f8397cab03390"
  },
  "title": "Espacio Sideral",
  "runtime": "4:53",
  "bpm": "174",
  "album": "El Mañana No Es Nada...",
  "number": 3
},
{
  "_id": {
    "$oid": "6afc87b0952f8397cab03391"
  },
  "title": "El Mañana No Es Nada",
  "runtime": "4:15",
  "bpm": "106",
  "album": "El Mañana No Es Nada...",
  "number": 4
},
{
  "_id": {
    "$oid": "6afc87ef952f8397cab03392"
  },
  "title": "Cuarto Piso",
  "runtime": "3:28",
  "bpm": "97",
  "album": "El Mañana No Es Nada...",
  "number": 5
},
{
  "_id": {
    "$oid": "6afc8835952f8397cab03393"
  },
  "title": "Boca Abajo",
  "runtime": "4:17",
  "bpm": "170",
  "album": "El Mañana No Es Nada...",
  "number": 6
},
{
  "_id": {
    "$oid": "6afc8869952f8397cab03394"
  },
  "title": "Caroline",
  "runtime": "3:22",
  "bpm": "141",
  "album": "El Mañana No Es Nada...",
  "number": 7
},
{
  "_id": {
    "$oid": "6afc8893952f8397cab03395"
  },
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
  "_id": {
    "$oid": "6afc705e952f8397cab03379"
  },
  "title": "Manchild",
  "runtime": "3:33",
  "bpm": "123",
  "album": "Man's Best Friend",
  "number": 1
},
{
  "_id": {
    "$oid": "6afc714d952f8397cab0337a"
  },
  "title": "Tears",
  "runtime": "2:40",
  "bpm": "113",
  "album": "Man's Best Friend",
  "number": 2
},
{
  "_id": {
    "$oid": "6afc7192952f8397cab0337b"
  },
  "title": "My Man On Willpower",
  "runtime": "3:17",
  "bpm": "120",
  "album": "Man's Best Friend",
  "number": 3
},
{
  "_id": {
    "$oid": "6afc7278952f8397cab0337e"
  },
  "title": "Sugar Talking",
  "runtime": "3:03",
  "bpm": "152",
  "album": "Man's Best Friend",
  "number": 4
},
{
  "_id": {
    "$oid": "6afc7326952f8397cab03380"
  },
  "title": "We Almost Broke Up Again Last Night",
  "runtime": "3:23",
  "bpm": "176",
  "album": "Man's Best Friend",
  "number": 5
},
{
  "_id": {
    "$oid": "6afc7376952f8397cab03381"
  },
  "title": "Nobody's son",
  "runtime": "3:02",
  "bpm": "174",
  "album": "Man's Best Friend",
  "number": 6
},
{
  "_id": {
    "$oid": "6afc73b5952f8397cab03382"
  },
  "title": "Never Getting Laid",
  "runtime": "3:28",
  "bpm": "92",
  "album": "Man's Best Friend",
  "number": 7
},
{
  "_id": {
    "$oid": "6afc73de952f8397cab03383"
  },
  "title": "When Did You Get Hot",
  "runtime": "2:25",
  "bpm": "89",
  "album": "Man's Best Friend",
  "number": 8
},
{
  "_id": {
    "$oid": "6afc7410952f8397cab03384"
  },
  "title": "Go Go Juice",
  "runtime": "3:13",
  "bpm": "132",
  "album": "Man's Best Friend",
  "number": 9
},
{
  "_id": {
    "$oid": "6afc7445952f8397cab03385"
  },
  "title": "Don't Worry I'll Make You Worry",
  "runtime": "3:42",
  "bpm": "90",
  "album": "Man's Best Friend",
  "number": 10
},
{
  "_id": {
    "$oid": "6afc7485952f8397cab03386"
  },
  "title": "House Tour",
  "runtime": "2:49",
  "bpm": "118",
  "album": "Man's Best Friend",
  "number": 11
},
{
  "_id": {
    "$oid": "6afc7525952f8397cab03387"
  },
  "title": "Goodbye",
  "runtime": "3:45",
  "bpm": "120",
  "album": "Man's Best Friend",
  "number": 12
},
{
  "_id": {
    "$oid": "6afc7556952f8397cab03388"
  },
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
  "number":23}
  {
  "_id": {
    "$oid": "6afc6dfe952f8397cab03367"
  },
  "title": "The View From The Afternoon",
  "runtime": "3:38",
  "bpm": "144",
  "album": "Whatever People Say I Am, That's What I'm Not",
  "number": 1
},
{
  "_id": {
    "$oid": "6afc6e2c952f8397cab03369"
  },
  "title": "I Bet You Look Good On The Dancefloor",
  "runtime": "2:53",
  "bpm": "102",
  "album": "Whatever People Say I Am, That's What I'm Not",
  "number": 2
},
{
  "_id": {
    "$oid": "6afc6ea6952f8397cab0336e"
  },
  "title": "Fake Tales Of San Francisco",
  "runtime": "2:57",
  "bpm": "127",
  "album": "Whatever People Say I Am, That's What I'm Not",
  "number": 3
},
{
  "_id": {
    "$oid": "6afc6ec5952f8397cab0336f"
  },
  "title": "Dancing Shoes",
  "runtime": "2:21",
  "bpm": "144",
  "album": "Whatever People Say I Am, That's What I'm Not",
  "number": 4
},
{
  "_id": {
    "$oid": "6afc6ee0952f8397cab03370"
  },
  "title": "You Probably Couldn't See For The Lights But You Were Staring Straight At Me",
  "runtime": "2:10",
  "bpm": "105",
  "album": "Whatever People Say I Am, That's What I'm Not",
  "number": 5
},
{
  "_id": {
    "$oid": "6afc6ef6952f8397cab03371"
  },
  "title": "Still Take You Home",
  "runtime": "2:53",
  "bpm": "109",
  "album": "Whatever People Say I Am, That's What I'm Not",
  "number": 6
},
{
  "_id": {
    "$oid": "6afc6f09952f8397cab03372"
  },
  "title": "Riot Van",
  "runtime": "2:14",
  "bpm": "104",
  "album": "Whatever People Say I Am, That's What I'm Not",
  "number": 7
},
{
  "_id": {
    "$oid": "6afc6f20952f8397cab03373"
  },
  "title": "Red Light Indicates Doors Are Secured",
  "runtime": "2:23",
  "bpm": "110",
  "album": "Whatever People Say I Am, That's What I'm Not",
  "number": 8
},
{
  "_id": {
    "$oid": "6afc6f34952f8397cab03374"
  },
  "title": "Mardy Bum",
  "runtime": "2:55",
  "bpm": "112",
  "album": "Whatever People Say I Am, That's What I'm Not",
  "number": 9
},
{
  "_id": {
    "$oid": "6afc6f46952f8397cab03375"
  },
  "title": "Perhaps Vampires Is A Bit Strong But...",
  "runtime": "4:28",
  "bpm": "134",
  "album": "Whatever People Say I Am, That's What I'm Not",
  "number": 10
},
{
  "_id": {
    "$oid": "6afc6f5c952f8397cab03376"
  },
  "title": "When The Sun Goes Down",
  "runtime": "3:20",
  "bpm": "169",
  "album": "Whatever People Say I Am, That's What I'm Not",
  "number": 11
},
{
  "_id": {
    "$oid": "6afc6f71952f8397cab03377"
  },
  "title": "From The Ritz To The Rubble",
  "runtime": "3:13",
  "bpm": "192",
  "album": "Whatever People Say I Am, That's What I'm Not",
  "number": 12
},
{
  "_id": {
    "$oid": "6afc6f83952f8397cab03378"
  },
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