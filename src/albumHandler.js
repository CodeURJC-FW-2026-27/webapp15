import { ObjectId } from "mongodb";

export async function getAlbumList(collection) {
   let albumList = await collection.findOne({name: 'album list'});
   return albumList.list;
}

export async function getAlbum(collection, id){
  return await collection.findOne({_id: new ObjectId(id)});
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

  /*function binarySearch (arr, x) {   
    let start = 0;
    let end = arr.length - 1;
    let mid;
    while (start <= end) {
      mid = Math.floor((start + end) / 2);
      if (arr[mid] === x) return mid;

      if (arr[mid] < x) {
          start = mid + 1;
      } else {
          end = mid - 1;
      }
    }

    return -1;
  }*/