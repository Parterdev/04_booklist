import Realm from 'realm';

import {Book, NewBook} from '../types/book';
import {getRealm} from './realmInstance';
import {BookRealm} from './bookSchema';

export async function createBook(newBook: NewBook): Promise<void> {
  const realm = await getRealm();

  const bookId = new Realm.BSON.ObjectId().toHexString();

  realm.write(() => {
    realm.create<BookRealm>('Book', {
      id: bookId,
      title: newBook.title.trim(),
      author: newBook.author.trim(),
      year: Number(newBook.year),
      genre: newBook.genre.trim(),
      createdAt: new Date(),
    });
  });
}

export async function getBooks(): Promise<Book[]> {
  const realm = await getRealm();

  const books = realm.objects<BookRealm>('Book').sorted('createdAt', true);

  return books.map(book => ({
    id: book.id,
    title: book.title,
    author: book.author,
    year: book.year,
    genre: book.genre,
    createdAt: book.createdAt,
  }));
}