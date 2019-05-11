import { NMState } from './index';
import { schema, normalize } from 'normalizr';
import produce from 'immer';
import { nmActions } from '../actions';

export interface NMEntityState<T> {
  original: { [id: string]: T };
  modified: { [id: string]: T };
}

export interface EntityState<T> {
  original: { [id: string]: T };
  modified: { [id: string]: T };
}
export interface NMState {
  [key: string]: EntityState<object>;
}

const entityInitialState: EntityState<object> = {
  original: {},
  modified: {}
};

export function initialState(entites: string[]): NMState {
  const result: NMState = {};
  entites.forEach((entity: string) => (result[entity] = entityInitialState));
  return result;
}

function set(
  type: 'original' | 'modified',
  draft: NMState,
  data: any[],
  entitySchema: schema.Entity
): void {
  const normalizedData = normalize(data, [entitySchema]);
  Object.entries(normalizedData.entities).forEach(
    ([key, dict]: [string, { [id: string]: object }]) =>
      (draft[key][type] = dict)
  );
}

function add(
  type: 'original' | 'modified',
  draft: NMState,
  data: any[],
  entitySchema: schema.Entity
): void {
  const normalizedData = normalize(data, [entitySchema]);
  Object.entries(normalizedData.entities).forEach(
    ([key, dict]: [string, { [id: string]: object }]) =>
      Object.entries(dict).forEach(
        ([id, obj]: [string, object]) => (draft[key][type][id] = obj)
      )
  );
}

export function reducer(entites: string[]) {
  return produce(
    (draft, action) =>
      nmActions<any>().match(action, {
        SET: (value: { data: any[]; schema: schema.Entity }) => {
          const { data, schema } = value;
          set('original', draft, data, schema);
        },
        SET_MODFIFIED: (value: { data: any[]; schema: schema.Entity }) => {
          const { data, schema } = value;
          set('modified', draft, data, schema);
        },
        ADD: (value: { data: any[]; schema: schema.Entity }) => {
          const { data, schema } = value;
          add('original', draft, data, schema);
        },
        ADD_MODFIFIED: (value: { data: any[]; schema: schema.Entity }) => {
          const { data, schema } = value;
          add('modified', draft, data, schema);
        },
        default: () => {}
      }),
    initialState(entites)
  );
}
