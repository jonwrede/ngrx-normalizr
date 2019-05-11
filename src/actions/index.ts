import { schema } from 'normalizr';
import { unionize, ofType } from 'unionize';

export function nmActions<T>() {
  return unionize(
    {
      SET: ofType<{ data: T[]; schema: schema.Entity }>(),
      ADD: ofType<{ data: T[]; schema: schema.Entity }>(),
      DELETE: ofType<{ data: string[]; schema: schema.Entity }>(),
      CLEAR: ofType<{ schema: schema.Entity }>(),
      SET_MODFIFIED: ofType<{ data: T[]; schema: schema.Entity }>(),
      ADD_MODFIFIED: ofType<{ data: T[]; schema: schema.Entity }>(),
      DELETE_MODFIFIED: ofType<{ data: string[]; schema: schema.Entity }>(),
      CLEAR_MODFIFIED: ofType<{ schema: schema.Entity }>()
    },
    {
      tag: 'type',
      value: 'payload'
    }
  );
}

export function nmEntityActionsCreator<T>(entitySchema: schema.Entity) {
  const actions = nmActions<T>();
  return {
    SET: (data: T[]) => actions.SET({ data: data, schema: entitySchema }),
    ADD: (data: T[]) => actions.ADD({ data: data, schema: entitySchema }),
    DELETE: (data: string[]) =>
      actions.DELETE({ data: data, schema: entitySchema }),
    CLEAR: () => actions.CLEAR({ schema: entitySchema }),
    SET_MODFIFIED: (data: T[]) =>
      actions.SET_MODFIFIED({ data: data, schema: entitySchema }),
    ADD_MODFIFIED: (data: T[]) =>
      actions.ADD_MODFIFIED({ data: data, schema: entitySchema }),
    DELETE_MODFIFIED: (data: string[]) =>
      actions.DELETE_MODFIFIED({ data: data, schema: entitySchema }),
    CLEAR_MODFIFIED: () => actions.CLEAR_MODFIFIED({ schema: entitySchema })
  };
}
