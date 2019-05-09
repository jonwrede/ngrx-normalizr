"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var normalize_1 = require("./normalize");
var immutable_1 = require("immutable");
var store_1 = require("@ngrx/store");
var modified_normalize_1 = require("../actions/modified-normalize");
var normalize_2 = require("./normalize");
var STATE_KEY = 'modifiedNormalized';
function modifiedNormalized(state, action) {
    if (state === void 0) { state = normalize_2.initialState; }
    var _a;
    switch (action.type) {
        case modified_normalize_1.ModifiedNormalizeActionTypes.SET_DATA: {
            var _b = action.payload, result = _b.result, entities = _b.entities;
            return {
                result: result,
                entities: __assign({}, state.entities, entities)
            };
        }
        case modified_normalize_1.ModifiedNormalizeActionTypes.ADD_DATA: {
            var _c = action.payload, result = _c.result, entities_1 = _c.entities;
            return {
                result: result,
                entities: Object.keys(entities_1).reduce(function (p, c) {
                    p[c] = __assign({}, p[c], entities_1[c]);
                    return p;
                }, __assign({}, state.entities))
            };
        }
        case modified_normalize_1.ModifiedNormalizeActionTypes.ADD_CHILD_DATA: {
            var _d = action.payload, result = _d.result, entities_2 = _d.entities, parentSchemaKey = _d.parentSchemaKey, parentProperty = _d.parentProperty, parentId = _d.parentId;
            var newEntities = __assign({}, state.entities);
            if (normalize_2.getParentReferences(newEntities, action.payload)) {
                (_a = newEntities[parentSchemaKey][parentId][parentProperty]).push.apply(_a, result);
            }
            return {
                result: result,
                entities: Object.keys(entities_2).reduce(function (p, c) {
                    p[c] = __assign({}, p[c], entities_2[c]);
                    return p;
                }, newEntities)
            };
        }
        case modified_normalize_1.ModifiedNormalizeActionTypes.UPDATE_DATA: {
            var _e = action.payload, id = _e.id, key = _e.key, changes_1 = _e.changes, result = _e.result;
            if (!state.entities[key] || !state.entities[key][id]) {
                return state;
            }
            var newEntities_1 = __assign({}, state.entities);
            Object.entries(changes_1).forEach(function (_a) {
                var key = _a[0], value = _a[1];
                Object.entries(changes_1[key]).forEach(function (_a) {
                    var id = _a[0], obj = _a[1];
                    newEntities_1[key][id] = newEntities_1[key][id] || {};
                    Object.entries(changes_1[key][id]).forEach(function (_a) {
                        var property = _a[0], value = _a[1];
                        var _b;
                        if (Array.isArray(value)) {
                            (_b = newEntities_1[key][id][property]).push.apply(_b, value);
                        }
                        else {
                            newEntities_1[key][id][property] = value;
                        }
                    });
                });
            });
            return {
                result: result,
                entities: newEntities_1
            };
        }
        case modified_normalize_1.ModifiedNormalizeActionTypes.REMOVE_DATA: {
            var _f = action.payload, id_1 = _f.id, key_1 = _f.key, removeChildren_1 = _f.removeChildren;
            var newState_1 = immutable_1.fromJS(state);
            var entity_1 = newState_1.getIn(['entities', key_1, id_1]);
            if (!entity_1) {
                return state;
            }
            return newState_1.withMutations(function (map) {
                if (removeChildren_1) {
                    Object.entries(removeChildren_1).map(function (_a) {
                        var keyInner = _a[0], entityProperty = _a[1];
                        var child = entity_1[entityProperty];
                        if (child && newState_1.getIn(['entities', keyInner])) {
                            var ids = Array.isArray(child) ? child : [child];
                            ids.forEach(function (oldId) {
                                return map.deleteIn(['entities', keyInner, oldId]);
                            });
                        }
                    });
                }
                map.deleteIn(['entities', key_1, id_1]);
            });
        }
        case modified_normalize_1.ModifiedNormalizeActionTypes.REMOVE_CHILD_DATA: {
            var _g = action.payload, id = _g.id, childSchemaKey = _g.childSchemaKey, parentProperty = _g.parentProperty, parentSchemaKey = _g.parentSchemaKey, parentId = _g.parentId;
            var newEntities = __assign({}, state.entities);
            var entity = newEntities[childSchemaKey][id];
            if (!entity) {
                return state;
            }
            var parentRefs = normalize_2.getParentReferences(newEntities, action.payload);
            if (parentRefs && parentRefs.indexOf(id) > -1) {
                newEntities[parentSchemaKey][parentId][parentProperty].splice(parentRefs.indexOf(id), 1);
            }
            delete newEntities[childSchemaKey][id];
            return __assign({}, state, { entities: newEntities });
        }
        default:
            return state;
    }
}
exports.modifiedNormalized = modifiedNormalized;
var getModifiedNormalizedState = function (state) {
    return state[STATE_KEY];
};
exports.getModifiedNormalizedEntities = store_1.createSelector(getModifiedNormalizedState, function (state) { return state.entities; });
exports.getModifiedResult = store_1.createSelector(getModifiedNormalizedState, function (state) { return state.result; });
function createModifiedSchemaSelectors(schema) {
    return {
        getNormalizedEntities: exports.getModifiedNormalizedEntities,
        getEntities: normalize_2.createEntitiesSelector(schema, exports.getModifiedNormalizedEntities),
        entityProjector: normalize_2.createEntityProjector(schema),
        entitiesProjector: normalize_2.createEntitiesProjector(schema)
    };
}
exports.createModifiedSchemaSelectors = createModifiedSchemaSelectors;
exports.getCombinedNormalizedEntities = store_1.createSelector(normalize_1.getNormalizedEntities, exports.getModifiedNormalizedEntities, function (base, modified) { return mergeDeep(base, modified); });
function createCombinedSchemaSelectors(schema) {
    return {
        getNormalizedEntities: exports.getCombinedNormalizedEntities,
        getEntities: normalize_2.createEntitiesSelector(schema, exports.getCombinedNormalizedEntities),
        entityProjector: normalize_2.createEntityProjector(schema),
        entitiesProjector: normalize_2.createEntitiesProjector(schema)
    };
}
exports.createCombinedSchemaSelectors = createCombinedSchemaSelectors;
function isObject(item) {
    return item && typeof item === 'object' && !Array.isArray(item);
}
exports.isObject = isObject;
function mergeDeep(target, source) {
    var output = Object.assign({}, target);
    if (isObject(target) && isObject(source)) {
        Object.keys(source).forEach(function (key) {
            var _a, _b;
            if (isObject(source[key])) {
                if (!(key in target))
                    Object.assign(output, (_a = {}, _a[key] = source[key], _a));
                else
                    output[key] = mergeDeep(target[key], source[key]);
            }
            else {
                Object.assign(output, (_b = {}, _b[key] = source[key], _b));
            }
        });
    }
    return output;
}
exports.default = mergeDeep;
