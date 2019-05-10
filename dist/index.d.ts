import { NMEntityState } from './reducers/index';
export interface NMState {
    [id: string]: NMEntityState<object>;
}
export * from './reducers';
export * from './actions';
