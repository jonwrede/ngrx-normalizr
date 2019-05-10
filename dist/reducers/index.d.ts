import { schema } from 'normalizr';
import { ActionReducer } from '@ngrx/store';
export interface NMEntityState<T> {
    original: {
        [id: string]: T;
    };
    modified: {
        [id: string]: T;
    };
}
export declare function initialState<T>(): NMEntityState<T>;
export declare function reducer<T>(schema: schema.Entity): <Base extends typeof initialState>(base?: Base, ...rest: any[]) => any;
export declare function metaReducer(reducer: ActionReducer<any>): ActionReducer<any>;
