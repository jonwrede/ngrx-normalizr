import {
  NormalizeUpdateActionConfig,
  SchemaMap,
  NormalizeActionConfig,
  NormalizeChildActionPayload,
  NormalizeChildActionConfig,
  NormalizeUpdateActionPayload,
  getRelationProperty,
  NormalizeActionPayload,
  NormalizeRemoveActionPayload,
  NormalizeRemoveActionConfig,
  NormalizeRemoveChildActionPayload,
  NormalizeRemoveChildActionConfig
} from './normalize';
/**
 * Exports actions and an actionCreators creator of the ngrx-normalizr package.
 */

import { Action } from '@ngrx/store';
import { normalize } from 'normalizr';

/**
 * Internal action namespace
 */
const ACTION_NAMESPACE = '[@@ModifiedNormalize]';

/**
 * All types of the provided actions.
 */
export class ModifiedNormalizeActionTypes {
  /**
   * Action type of the `SetData` action.
   */
  static readonly SET_DATA = `${ACTION_NAMESPACE} Set Data`;

  /**
   * Action type of the `AddData` action.
   */
  static readonly ADD_DATA = `${ACTION_NAMESPACE} Add Data`;

  /**
   * Action type of the `AddChildData` action.
   */
  static readonly ADD_CHILD_DATA = `${ACTION_NAMESPACE} Add Child Data`;

  /**
   * Action type of the `UpdateData` action
   */
  static readonly UPDATE_DATA = `${ACTION_NAMESPACE} Update Data`;

  /**
   * Action type of the `RemoveData` action.
   */
  static readonly REMOVE_DATA = `${ACTION_NAMESPACE} Remove Data`;

  /**
   * Action type of the `RemoveChildData` action.
   */
  static readonly REMOVE_CHILD_DATA = `${ACTION_NAMESPACE} Remove Child Data`;
}

/**
 * Action for settings denormalized entities in the store.
 * Also see `NormalizeDataPayload`.
 */
export class ModifiedSetData<T> implements Action {
  /**
   * The action type: `NormalizeActionTypes.SET_DATA`
   */
  readonly type = ModifiedNormalizeActionTypes.SET_DATA;

  /**
   * The payload will be an object of the normalized entity map as `entities`
   * and the original sorted id's as an array in the `result` property.
   */
  public payload: NormalizeActionPayload;

  /**
   * SetData Constructor
   * @param config The action config object
   */
  constructor(config: NormalizeActionConfig<T>) {
    this.payload = normalize(config.data, [config.schema]);
  }
}

/**
 * Action for adding/updating data to the store.
 * Also see `NormalizeDataPayload`.
 */
export class ModifiedAddData<T> implements Action {
  /**
   * The action type: `NormalizeActionTypes.ADD_DATA`
   */
  readonly type = ModifiedNormalizeActionTypes.ADD_DATA;

  /**
   * The payload will be an object of the normalized entity map as `entities`
   * and the original sorted id's as an array in the `result` property.
   */
  public payload: NormalizeActionPayload;

  /**
   * AddData Constructor
   * @param config The action config object
   */
  constructor(config: NormalizeActionConfig<T>) {
    this.payload = normalize(config.data, [config.schema]);
  }
}

/**
 * Action for adding/updating data to the store.
 * Also see `NormalizeDataPayload`.
 */
export class ModifiedAddChildData<T> implements Action {
  /**
   * The action type: `NormalizeActionTypes.ADD_CHILD_DATA`
   */
  readonly type = ModifiedNormalizeActionTypes.ADD_CHILD_DATA;

  /**
   * The payload will be an object of the normalized entity map as `entities`
   * and the original sorted id's as an array in the `result` property.
   */
  public payload: NormalizeChildActionPayload;

  /**
   * AddData Constructor
   * @param config The action config object
   */
  constructor(config: NormalizeChildActionConfig<T>) {
    const { data, parentSchema, parentId, childSchema } = config;
    this.payload = {
      ...(normalize(data, [childSchema]) as NormalizeActionPayload),
      parentSchemaKey: parentSchema.key,
      parentProperty: getRelationProperty(parentSchema, childSchema),
      parentId
    };
  }
}

/**
 * Action for adding/updating data to the store.
 * Also see `NormalizeDataPayload`.
 */
export class ModifiedUpdateData<T> implements Action {
  /**
   * The action type: `NormalizeActionTypes.UPDATE_DATA`
   */
  readonly type = ModifiedNormalizeActionTypes.UPDATE_DATA;

  /**
   * The payload will be an object of the normalized entity map as `entities`
   * and the original sorted id's as an array in the `result` property.
   */
  public payload: NormalizeUpdateActionPayload<T>;

  /**
   * AddData Constructor
   * @param config The action config object
   */
  constructor(config: NormalizeUpdateActionConfig<T>) {
    const { id, schema, changes } = config;
    (changes as any)[(schema as any)._idAttribute] = id;
    const normalized = normalize([config.changes], [config.schema]);

    this.payload = {
      id,
      key: schema.key,
      changes: normalized.entities,
      result: normalized.result
    };
  }
}

/**
 * Action for removing data from the store.
 * Also see `NormalizeRemovePayload`.
 */
export class ModifiedRemoveData implements Action {
  /**
   * The action type: `NormalizeActionTypes.REMOVE_DATA`
   */
  readonly type = ModifiedNormalizeActionTypes.REMOVE_DATA;

  /**
   * The payload will be an object of the normalized entity map as `entities`
   * and the original sorted id's as an array in the `result` property.
   */
  public payload: NormalizeRemoveActionPayload;

  /**
   * RemoveData Constructor
   * @param payload The action payload used in the reducer
   */
  constructor(config: NormalizeRemoveActionConfig) {
    let { id, removeChildren, schema } = config;
    let removeMap: SchemaMap = null;

    // cleanup removeChildren object by setting only existing
    // properties to removeMap
    if (removeChildren && (schema as any).schema) {
      removeMap = Object.entries(removeChildren).reduce(
        (p: any, [key, entityProperty]: [string, string]) => {
          if (entityProperty in (schema as any).schema) {
            p[key] = entityProperty;
          }
          return p;
        },
        {}
      );
    }

    this.payload = {
      id,
      key: schema.key,
      removeChildren:
        removeMap && Object.keys(removeMap).length ? removeMap : null
    };
  }
}

/**
 * Action for removing data from the store.
 * Also see `NormalizeRemovePayload`.
 */
export class ModifiedRemoveChildData implements Action {
  /**
   * The action type: `NormalizeActionTypes.REMOVE_CHILD_DATA`
   */
  readonly type = ModifiedNormalizeActionTypes.REMOVE_CHILD_DATA;

  /**
   * The payload will be an object of the normalized entity map as `entities`
   * and the original sorted id's as an array in the `result` property.
   */
  public payload: NormalizeRemoveChildActionPayload;

  /**
   * RemoveData Constructor
   * @param payload The action payload used in the reducer
   */
  constructor(config: NormalizeRemoveChildActionConfig) {
    let { id, parentSchema, childSchema, parentId } = config;
    this.payload = {
      id,
      childSchemaKey: childSchema.key,
      parentProperty: getRelationProperty(parentSchema, childSchema),
      parentSchemaKey: parentSchema.key,
      parentId
    };
  }
}
