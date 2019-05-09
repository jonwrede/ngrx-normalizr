import { MemoizedSelector } from '@ngrx/store';
import { schema } from 'normalizr';
import { NormalizeChildActionPayload } from '../index';
export interface EntityMap {
    [key: string]: {
        [id: string]: any;
    };
}
export interface NormalizedState {
    normalized: NormalizedEntityState;
}
export interface NormalizedEntityState {
    result: string[];
    entities: EntityMap;
}
export declare const initialState: NormalizedEntityState;
export declare function normalized(state: NormalizedEntityState, action: any): {
    result: any;
    entities: any;
};
export declare const getNormalizedEntities: MemoizedSelector<any, EntityMap>;
export declare const getResult: MemoizedSelector<any, string[]>;
export interface SchemaSelectors<T> {
    getNormalizedEntities: MemoizedSelector<any, EntityMap>;
    getEntities: MemoizedSelector<{}, T[]>;
    entityProjector: (entities: {}, id: string) => T;
    entitiesProjector: (entities: {}) => T[];
}
export declare function createSchemaSelectors<T>(schema: schema.Entity): SchemaSelectors<T>;
export declare function createEntitiesSelector<T>(schema: schema.Entity, normalizedEntities: MemoizedSelector<any, EntityMap>): MemoizedSelector<{}, T[]>;
export declare function createEntityProjector<T>(schema: schema.Entity): (entities: {}, id: string) => T;
export declare function createEntitiesProjector<T>(schema: schema.Entity): (entities: {}, ids?: string[]) => T[];
export declare function createSingleDenormalizer(schema: schema.Entity): (entities: {
    [key: string]: {};
}, id: string) => any;
export declare function createMultipleDenormalizer(schema: schema.Entity): (entities: {
    [key: string]: {};
}, ids?: string[]) => any;
export declare function getParentReferences(entities: any, payload: NormalizeChildActionPayload): string | undefined;
