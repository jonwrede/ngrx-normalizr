import { NMState, Schema } from './index';
import { schema, normalize } from 'normalizr';
import produce from 'immer';
import { nmActions } from '../actions';

export interface Schema {
  key: string;
  schema?: { [id: string]: Schema };
}
export interface NMEntityState<T> {
  original: { [id: string]: T };
  modified: { [id: string]: T };
}

export interface EntityState<T extends object> {
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
    ([key, dict]: [string, { [id: string]: object }]) => {
      if (!draft.hasOwnProperty(key)) {
        draft[key] = entityInitialState;
      }
      draft[key][type] = dict;
    }
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
      Object.entries(dict).forEach(([id, obj]: [string, object]) => {
        if (!draft.hasOwnProperty(key)) {
          draft[key] = entityInitialState;
        }
        draft[key][type][id] = obj;
      })
  );
}

function remove(
  type: 'original' | 'modified',
  draft: NMState,
  data: string[],
  entitySchema: Schema,
  children: boolean
): void {
  data.forEach((id: string) => {
    const schemaKey = entitySchema.key;
    const ref: { [key: string]: any } = draft[schemaKey][type][id];
    if (children) {
      Object.entries(entitySchema.schema).forEach(
        ([key, schema]: [string, Schema]) => {
          if (ref.hasOwnProperty(key) && typeof ref[key] === 'object') {
            remove(type, draft, Object.values(ref[key]), schema, children);
          }
        }
      );
    }
    delete draft[entitySchema.key][type][id];
  });
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
        DELETE: (value: {
          data: string[];
          schema: schema.Entity;
          children?: boolean;
        }) => {
          const { data, schema, children } = value;
          remove('original', draft, data, schema, children);
        },
        DELETE_MODFIFIED: (value: {
          data: string[];
          schema: schema.Entity;
          children?: boolean;
        }) => {
          const { data, schema, children } = value;
          remove('modified', draft, data, schema, children);
        },
        default: () => {}
      }),
    initialState(entites)
  );
}
