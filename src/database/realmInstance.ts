import Realm from 'realm';

import {realmConfig} from './realmConfig';

let realmInstance: Realm | null = null;

export async function getRealm(): Promise<Realm> {
  if (realmInstance && !realmInstance.isClosed) {
    return realmInstance;
  }

  realmInstance = await Realm.open(realmConfig);
  return realmInstance;
}