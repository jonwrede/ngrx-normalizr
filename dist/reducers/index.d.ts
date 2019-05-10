import { ActionReducer } from '@ngrx/store';
export interface NMEntityState<T> {
    original: {
        [id: string]: T;
    };
    modified: {
        [id: string]: T;
    };
}
export declare const initialState: {
    original: {};
    modified: {};
};
export declare function reducer<T>(key: string): <Base extends {
    readonly original: any;
    readonly modified: any;
}>(base?: Base, ...rest: any[]) => any;
export declare function metaReducer(reducer: ActionReducer<any>): ActionReducer<any>;
