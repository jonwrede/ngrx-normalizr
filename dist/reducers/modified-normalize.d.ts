import { EntityMap, SchemaSelectors } from './normalize';
import { MemoizedSelector } from '@ngrx/store';
import { schema } from 'normalizr';
import { NormalizedEntityState } from './normalize';
export declare function modifiedNormalized(state: NormalizedEntityState, action: any): {
    result: any;
    entities: any;
};
export declare const getModifiedNormalizedEntities: MemoizedSelector<any, EntityMap>;
export declare const getModifiedResult: MemoizedSelector<any, string[]>;
export declare function createModifiedSchemaSelectors<T>(schema: schema.Entity): SchemaSelectors<T>;
