export async function getAlbumList(collection) {
   let albumList = await collection.findOne({name: 'albumList'});
   return albumList.list;
}

export async function getAlbum(collection, name){
  return await collection.findOne({name: name});
}
import { ObjectId } from 'mongodb';

export const GENRES = [
  { value: 'hyperpop', label: 'Hyperpop' },
  { value: 'EDM', label: 'EDM' },
  { value: 'k-pop', label: 'K-pop' },
  { value: 'rock', label: 'Rock' },
  { value: 'pop', label: 'Pop' },
  { value: 'rap', label: 'Rap' },
  { value: 'bachata', label: 'Bachata' },
  { value: 'reggaeton', label: 'Reggaetón' }
];


export function swapDateFormat(date) {
  return date.split('-').reverse().join('-');
}


export async function validateAlbum(albumVault, body, file, { excludeId = null, coverRequired = true } = {}) {
  const errors = {};

  const name = (body.name || '').trim();
  if (name === '') {
    errors.name = 'The name is a required field';
  } else if (name[0] !== name[0].toUpperCase() || name[0] === name[0].toLowerCase()) {
    errors.name = 'The name must start with a capital letter';
  } else {
    const filter = { name };
    if (excludeId) filter._id = { $ne: new ObjectId(excludeId) };
    if (await albumVault.findOne(filter)) {
      errors.name = 'An album with that name already exists';
    }
  }

  const author = (body.author || '').trim();
  if (author === '') errors.author = 'The author is a required field';
  else if (author.length > 100) errors.author = 'The author cannot exceed 100 characters';

  const genre = (body.genre || '').trim();
  if (genre === '') errors.genre = 'The genre is a required field';
  else if (!GENRES.some(g => g.value === genre)) errors.genre = 'Select a valid genre';

  const leadSingle = (body.leadSingle || '').trim();
  if (leadSingle === '') {
    errors.leadSingle = 'The YouTube link is a required field';
  } else if (!/^https:\/\/youtu\.be\/[A-Za-z0-9_-]{11}$/.test(leadSingle)) {
    errors.leadSingle = 'Enter a link of the type https://youtu.be/XXXXXXXXXXX';
  }

  const releaseDate = body.releaseDate || '';
  const date = new Date(releaseDate);
  if (releaseDate === '') {
    errors.releaseDate = 'The date is a required field';
  } else if (!/^\d{4}-\d{2}-\d{2}$/.test(releaseDate)
             || Number.isNaN(date.getTime())
             || date.toISOString().slice(0, 10) !== releaseDate) {
    errors.releaseDate = 'Enter a valid date';
  } else if (releaseDate < '1900-01-01' || date > new Date()) {
    errors.releaseDate = 'The date must be between 1900 and today';
  }

  const songNumber = Number(body.songNumber);
  if (body.songNumber === '' || !Number.isInteger(songNumber) || songNumber < 1 || songNumber > 100) {
    errors.songNumber = 'Enter an integer between 1 and 100';
  }

  const description = (body.description || '').trim();
  if (description.length < 50 || description.length > 500) {
    errors.description = 'The description must be between 50 and 500 characters';
  }

  if (file) {
    if (!file.mimetype.startsWith('image/')) errors.cover = 'The file must be an image';
  } else if (coverRequired) {
    errors.cover = 'You must upload a cover';
  }

  return { errors, data: { name, author, genre, leadSingle, releaseDate, songNumber, description } };
}

export async function getAlbumByGenre(collection, genre) {
  return await collection.find({genre: genre}).toArray();
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

