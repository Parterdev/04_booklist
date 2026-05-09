import Realm from 'realm';

import {BookRealm} from './bookSchema';

export const realmConfig: Realm.Configuration = {
  schema: [BookRealm],
  schemaVersion: 1,
};