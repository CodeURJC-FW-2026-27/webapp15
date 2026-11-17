export async function getSongList(collection) {
   let songList = await collection.findOne({name: 'songList'});
   return songList.list;
}

export async function getSong(collection, name){
  return await collection.findOne({name: name});
}

export function getName(song) {
  return song.name;
}

export function getRuntime(song) {
  return song.runtime;
}

export function getBPM(song) {
  return song.bpm;
}

export function getAlbum(song) {
  return song.album;
}

export function getNumber(song) {
  return song.number;
}
