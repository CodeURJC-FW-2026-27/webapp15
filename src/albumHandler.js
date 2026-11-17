export async function getAlbumList(collection) {
   let albumList = await collection.findOne({name: 'albumList'});
   return albumList.list;
}

export async function getAlbum(collection, name){
  return await collection.findOne({name: name});
}

export function getName(album) {
  return album.name;
}

export function getAuthor(album) {
  return album.author;
}

export function getGenre(album) {
  return album.genre;
}

export function getCover(album) {
  return album.cover;
}

export function getSingle(album) {
  return album.leadSingle;
}

export function getDate(album) {
  return album.releaseDate;
}

export function getDescription(album) {
  return album.description;
}

export function getSongNumber(album) {
  return album.songNumber;
}