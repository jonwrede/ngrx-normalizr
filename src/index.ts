/**
 * Exports actions, reducers and selectors of the ngrx-normalizr package.
 */

export * from './actions/normalize';
import * as modifiedActions from './actions/modified-normalize';
export * from './reducers/normalize';
import * as modifiedReducers from './reducers/modified-normalize';

export { modifiedActions, modifiedReducers };