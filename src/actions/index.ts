import { schema } from 'normalizr';
import { unionize, ofType } from 'unionize';

export function entityActionCreator<T>(key: string) {
  return unionize(
    {
      ['SET_' + key]: ofType<T[]>(),
      ['ADD_' + key]: ofType<T[]>(),
      ['DELETE_' + key]: ofType<{ id: string }>(),
      ['CLEAR_' + key]: {},
      ['SET_MODFIFIED_' + key]: ofType<T[]>(),
      ['ADD_MODFIFIED_' + key]: ofType<T[]>(),
      ['DELETE_MODFIFIED_' + key]: ofType<{ id: string }>(),
      ['CLEAR_MODFIFIED_' + key]: {}
    },
    {
      tag: 'type',
      value: 'payload'
    }
  );
}

export function actionCreator<T>() {
  return unionize(
    {
      SET: ofType<{ data: T[]; schema: schema.Entity }>(),
      ADD: ofType<{ data: T[]; schema: schema.Entity }>(),
      DELETE: ofType<{ data: string[]; schema: schema.Entity }>(),
      CLEAR: {},
      SET_MODFIFIED: ofType<{ data: T[]; schema: schema.Entity }>(),
      ADD_MODFIFIED: ofType<{ data: T[]; schema: schema.Entity }>(),
      DELETE_MODFIFIED: ofType<{ data: string[]; schema: schema.Entity }>(),
      CLEAR_MODFIFIED: {}
    },
    {
      tag: 'type',
      value: 'payload'
    }
  );
}
