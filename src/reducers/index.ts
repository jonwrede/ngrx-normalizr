import { schema, normalize } from 'normalizr';
import produce from 'immer';
import { entityActionCreator, actionCreator } from '../actions';
import { ActionReducer } from '@ngrx/store';

export interface NMEntityState<T> {
  original: { [id: string]: T };
  modified: { [id: string]: T };
}

export const initialState = {
  original: {},
  modified: {}
};

export function reducer<T>(key: string) {
  return produce(
    (draft, action) =>
      entityActionCreator<T>(key).match(action, {
        ['SET_' + key]: (data: T[]) => {},
        ['ADD_' + key]: (data: T[]) => {},
        ['DELETE_' + key]: (id: string) => {},
        ['CLEAR_' + key]: () => {},
        ['SET_MODFIFIED_' + key]: (data: T[]) => {},
        ['ADD_MODFIFIED_' + key]: (data: T[]) => {},
        ['DELETE_MODFIFIED_' + key]: (id: string) => {},
        ['CLEAR_MODFIFIED_' + key]: () => {},
        default: () => {}
      }),
    initialState
  );
}

export function metaReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return produce((draft, action) =>
    actionCreator<any>().match(action, {
      SET: (value: { data: any[]; schema: schema.Entity }) => {
        const { data, schema } = value;
        const normalizedData = normalize(data, [schema]);
        Object.entries(normalizedData.entities).forEach(
          ([key, dict]: [string, { [id: string]: object }]) =>
            (draft[key].original = dict)
        );
      },
      SET_MODFIFIED: (value: { data: any[]; schema: schema.Entity }) => {
        const { data, schema } = value;
        const normalizedData = normalize(data, schema);
        Object.entries(normalizedData.entities).forEach(
          ([key, dict]: [string, { [id: string]: object }]) =>
            (draft[key].modified = dict)
        );
      },
      ADD: (value: { data: any[]; schema: schema.Entity }) => {
        const { data, schema } = value;
        const normalizedData = normalize(data, schema);
        Object.entries(normalizedData.entities).forEach(
          ([key, dict]: [string, { [id: string]: object }]) => {
            Object.entries(dict).forEach(([id, obj]: [string, object]) => {
              draft[key].original[id] = obj;
            });
          }
        );
      },
      ADD_MODFIFIED: (value: { data: any[]; schema: schema.Entity }) => {
        const { data, schema } = value;
        const normalizedData = normalize(data, schema);
        Object.entries(normalizedData.entities).forEach(
          ([key, dict]: [string, { [id: string]: object }]) => {
            Object.entries(dict).forEach(([id, obj]: [string, object]) => {
              draft[key].modified[id] = obj;
            });
          }
        );
      },
      default: () => {
        return reducer(draft, action);
      }
    })
  );
}
