import { schema } from 'normalizr';
import { unionize, ofType } from 'unionize';

export function entityActionCreator<T>(schema: schema.Entity) {
  return unionize(
    {
      ['SET_' + schema.key]: ofType<T[]>(),
      ['ADD_' + schema.key]: ofType<T[]>(),
      ['DELETE_' + schema.key]: ofType<{ id: string }>(),
      ['CLEAR_' + schema.key]: {},
      ['SET_MODFIFIED_' + schema.key]: ofType<T[]>(),
      ['ADD_MODFIFIED_' + schema.key]: ofType<T[]>(),
      ['DELETE_MODFIFIED_' + schema.key]: ofType<{ id: string }>(),
      ['CLEAR_MODFIFIED_' + schema.key]: {}
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
