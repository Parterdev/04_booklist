import Realm from 'realm';

export class BookRealm extends Realm.Object<BookRealm> {
  id!: string;
  title!: string;
  author!: string;
  year!: number;
  genre!: string;
  createdAt!: Date;

  static schema: Realm.ObjectSchema = {
    name: 'Book',
    primaryKey: 'id',
    properties: {
      id: 'string',
      title: 'string',
      author: 'string',
      year: 'int',
      genre: 'string',
      createdAt: 'date',
    },
  };
}