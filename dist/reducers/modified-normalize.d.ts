import { EntityMap, SchemaSelectors } from './normalize';
import { MemoizedSelector } from '@ngrx/store';
import { schema } from 'normalizr';
import { NormalizedEntityState } from './normalize';
export declare function modifiedNormalized(state: NormalizedEntityState, action: any): {
    result: any;
    entities: any;
} | {
    result: string[];
    removeProperty(entities: any, [key]: [any], id: any): any;
    entities?: undefined;
};
export declare const getModifiedNormalizedEntities: MemoizedSelector<any, EntityMap>;
export declare const getModifiedResult: MemoizedSelector<any, string[]>;
export declare function createModifiedSchemaSelectors<T>(schema: schema.Entity): SchemaSelectors<T>;
export declare const getCombinedNormalizedEntities: MemoizedSelector<any, EntityMap>;
export declare function createCombinedSchemaSelectors<T>(schema: schema.Entity): SchemaSelectors<T>;
export declare function isObject(item: any): boolean;
export default function mergeDeep(target: any, source: any): any;
