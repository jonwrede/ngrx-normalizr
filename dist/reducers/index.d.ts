import { NMState, Schema } from './index';
export interface Schema {
    key: string;
    schema?: {
        [id: string]: Schema;
    };
}
export interface NMEntityState<T> {
    original: {
        [id: string]: T;
    };
    modified: {
        [id: string]: T;
    };
}
export interface EntityState<T extends object> {
    original: {
        [id: string]: T;
    };
    modified: {
        [id: string]: T;
    };
}
export interface NMState {
    [key: string]: EntityState<object>;
}
export declare function initialState(entites: string[]): NMState;
export declare function reducer(entites: string[]): <Base extends {
    readonly [x: string]: any;
}>(base?: Base, ...rest: any[]) => any;
