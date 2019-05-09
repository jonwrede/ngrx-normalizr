import { EntityMap, SchemaSelectors, getNormalizedEntities } from './normalize';
import { fromJS } from 'immutable';
/**
 * Exports reducers and selectors of the ngrx-normalizr package.
 */

import { createSelector, MemoizedSelector } from '@ngrx/store';
import { schema } from 'normalizr';

import { ModifiedNormalizeActionTypes } from '../actions/modified-normalize';
import {
  NormalizeChildActionPayload,
  NormalizeRemoveChildActionPayload
} from '../index';
import {
  createEntitiesSelector,
  createEntityProjector,
  createEntitiesProjector,
  NormalizedEntityState,
  getParentReferences,
  initialState
} from './normalize';

/**
 * The state key under which the normalized state will be stored
 */
const STATE_KEY = 'modifiedNormalized';

export function modifiedNormalized(
  state: NormalizedEntityState = initialState,
  action: any
) {
  switch (action.type) {
    case ModifiedNormalizeActionTypes.SET_DATA: {
      const { result, entities } = action.payload;

      return {
        result,
        entities: {
          ...state.entities,
          ...entities
        }
      };
    }

    case ModifiedNormalizeActionTypes.ADD_DATA: {
      const { result, entities } = action.payload;

      return {
        result,
        entities: Object.keys(entities).reduce(
          (p: any, c: string) => {
            p[c] = { ...p[c], ...entities[c] };
            return p;
          },
          { ...state.entities }
        )
      };
    }

    case ModifiedNormalizeActionTypes.ADD_CHILD_DATA: {
      const {
        result,
        entities,
        parentSchemaKey,
        parentProperty,
        parentId
      } = action.payload as NormalizeChildActionPayload;
      const newEntities = { ...state.entities };

      /* istanbul ignore else */
      if (getParentReferences(newEntities, action.payload)) {
        newEntities[parentSchemaKey][parentId][parentProperty].push(...result);
      }

      return {
        result,
        entities: Object.keys(entities).reduce((p: any, c: string) => {
          p[c] = { ...p[c], ...entities[c] };
          return p;
        }, newEntities)
      };
    }

    case ModifiedNormalizeActionTypes.UPDATE_DATA: {
      const { id, key, changes, result } = action.payload;

      if (!state.entities[key] || !state.entities[key][id]) {
        return state;
      }

      const newEntities = { ...state.entities };
      Object.entries(changes).forEach(([key, value]: [string, any]) => {
        Object.entries(changes[key]).forEach(([id, obj]: [string, any]) => {
          newEntities[key][id] = newEntities[key][id] || {};
          Object.entries(changes[key][id]).forEach(
            ([property, value]: [string, any]) => {
              if (Array.isArray(value)) {
                newEntities[key][id][property].push(...value);
              } else {
                newEntities[key][id][property] = value;
              }
            }
          );
        });
      });

      return {
        result,
        entities: newEntities
      };
    }

    case ModifiedNormalizeActionTypes.REMOVE_DATA: {
      const { id, key, removeChildren } = action.payload;
      const newState = fromJS(state);
      const entity = newState.getIn([key, id]);

      if (!entity) {
        return state;
      }

      return newState.withMutations((map: any) => {
        if (removeChildren) {
          Object.entries(removeChildren).map(
            ([keyInner, entityProperty]: [string, string]) => {
              const child = entity[entityProperty];
              /* istanbul ignore else */
              if (child && newState.get(key)) {
                const ids = Array.isArray(child) ? child : [child];
                ids.forEach((oldId: string) => map.deleteIn([keyInner, oldId]));
              }
            }
          );
        }
        map.deleteIn([key, id]);
      });
    }

    case ModifiedNormalizeActionTypes.REMOVE_CHILD_DATA: {
      const {
        id,
        childSchemaKey,
        parentProperty,
        parentSchemaKey,
        parentId
      } = action.payload as NormalizeRemoveChildActionPayload;
      const newEntities = { ...state.entities };
      const entity = newEntities[childSchemaKey][id];

      /* istanbul ignore if */
      if (!entity) {
        return state;
      }

      const parentRefs = getParentReferences(newEntities, action.payload);
      /* istanbul ignore else */
      if (parentRefs && parentRefs.indexOf(id) > -1) {
        newEntities[parentSchemaKey][parentId][parentProperty].splice(
          parentRefs.indexOf(id),
          1
        );
      }

      delete newEntities[childSchemaKey][id];

      return {
        ...state,
        entities: newEntities
      };
    }

    default:
      return state;
  }
}

/**
 * Default getter for the normalized state
 * @param state any state
 */
const getModifiedNormalizedState = (state: any): NormalizedEntityState =>
  state[STATE_KEY];

/**
 * Selects all normalized entities of the state, regardless of their schema.
 * This selector should be used to enable denormalizing projector functions access
 * to all needed schema entities.
 */
export const getModifiedNormalizedEntities: MemoizedSelector<
  any,
  EntityMap
> = createSelector(
  getModifiedNormalizedState,
  (state: NormalizedEntityState) => state.entities
);

/**
 * Select the result order of the last set operation.
 */
export const getModifiedResult: MemoizedSelector<
  any,
  string[]
> = createSelector(
  getModifiedNormalizedState,
  (state: NormalizedEntityState) => state.result
);

/**
 * Creates an object of selectors and projector functions bound to the given schema.
 * @param schema The schema to bind the selectors and projectors to
 */
export function createModifiedSchemaSelectors<T>(
  schema: schema.Entity
): SchemaSelectors<T> {
  return {
    /**
     * Select all entities, regardless of their schema, exported for convenience.
     */
    getNormalizedEntities: getModifiedNormalizedEntities,

    /**
     * Select all entities and perform a denormalization based on the given schema.
     */
    getEntities: createEntitiesSelector<T>(
      schema,
      getModifiedNormalizedEntities
    ),

    /**
     * Uses the given schema to denormalize an entity by the given id
     */
    entityProjector: createEntityProjector<T>(schema),

    /**
     * Uses the given schema to denormalize all given entities
     */
    entitiesProjector: createEntitiesProjector<T>(schema)
  };
}

export const getCombinedNormalizedEntities: MemoizedSelector<
  any,
  EntityMap
> = createSelector(
  getNormalizedEntities,
  getModifiedNormalizedEntities,
  (base: EntityMap, modified: EntityMap) => mergeDeep(base, modified)
);

/**
 * Creates an object of selectors and projector functions bound to the given schema.
 * @param schema The schema to bind the selectors and projectors to
 */
export function createCombinedSchemaSelectors<T>(
  schema: schema.Entity
): SchemaSelectors<T> {
  return {
    /**
     * Select all entities, regardless of their schema, exported for convenience.
     */
    getNormalizedEntities: getCombinedNormalizedEntities,

    /**
     * Select all entities and perform a denormalization based on the given schema.
     */
    getEntities: createEntitiesSelector<T>(
      schema,
      getCombinedNormalizedEntities
    ),

    /**
     * Uses the given schema to denormalize an entity by the given id
     */
    entityProjector: createEntityProjector<T>(schema),

    /**
     * Uses the given schema to denormalize all given entities
     */
    entitiesProjector: createEntitiesProjector<T>(schema)
  };
}

export function isObject(item: any) {
  return item && typeof item === 'object' && !Array.isArray(item);
}

export default function mergeDeep(target: any, source: any) {
  let output = Object.assign({}, target);
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key])) {
        if (!(key in target)) Object.assign(output, { [key]: source[key] });
        else output[key] = mergeDeep(target[key], source[key]);
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }
  return output;
}
