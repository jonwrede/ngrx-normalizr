import { NormalizeUpdateActionConfig, NormalizeActionConfig, NormalizeChildActionPayload, NormalizeChildActionConfig, NormalizeUpdateActionPayload, NormalizeActionPayload, NormalizeRemoveActionPayload, NormalizeRemoveActionConfig, NormalizeRemoveChildActionPayload, NormalizeRemoveChildActionConfig } from './normalize';
import { Action } from '@ngrx/store';
export declare class ModifiedNormalizeActionTypes {
    static readonly SET_DATA: string;
    static readonly ADD_DATA: string;
    static readonly ADD_CHILD_DATA: string;
    static readonly UPDATE_DATA: string;
    static readonly REMOVE_DATA: string;
    static readonly REMOVE_CHILD_DATA: string;
}
export declare class ModifiedSetData<T> implements Action {
    readonly type: string;
    payload: NormalizeActionPayload;
    constructor(config: NormalizeActionConfig<T>);
}
export declare class ModifiedAddData<T> implements Action {
    readonly type: string;
    payload: NormalizeActionPayload;
    constructor(config: NormalizeActionConfig<T>);
}
export declare class ModifiedAddChildData<T> implements Action {
    readonly type: string;
    payload: NormalizeChildActionPayload;
    constructor(config: NormalizeChildActionConfig<T>);
}
export declare class ModifiedUpdateData<T> implements Action {
    readonly type: string;
    payload: NormalizeUpdateActionPayload<T>;
    constructor(config: NormalizeUpdateActionConfig<T>);
}
export declare class ModifiedRemoveData implements Action {
    readonly type: string;
    payload: NormalizeRemoveActionPayload;
    constructor(config: NormalizeRemoveActionConfig);
}
export declare class ModifiedRemoveChildData implements Action {
    readonly type: string;
    payload: NormalizeRemoveChildActionPayload;
    constructor(config: NormalizeRemoveChildActionConfig);
}
