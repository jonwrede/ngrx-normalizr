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
var store_1 = require("@ngrx/store");
var normalizr_1 = require("normalizr");
var normalize_1 = require("../actions/normalize");
var STATE_KEY = 'normalized';
exports.initialState = {
    result: [],
    entities: {}
};
function normalized(state, action) {
    if (state === void 0) { state = exports.initialState; }
    var _a;
    switch (action.type) {
        case normalize_1.NormalizeActionTypes.SET_DATA: {
            var _b = action.payload, result = _b.result, entities = _b.entities;
            return {
                result: result,
                entities: __assign({}, state.entities, entities)
            };
        }
        case normalize_1.NormalizeActionTypes.ADD_DATA: {
            var _c = action.payload, result = _c.result, entities_1 = _c.entities;
            return {
                result: result,
                entities: Object.keys(entities_1).reduce(function (p, c) {
                    p[c] = __assign({}, p[c], entities_1[c]);
                    return p;
                }, __assign({}, state.entities))
            };
        }
        case normalize_1.NormalizeActionTypes.ADD_CHILD_DATA: {
            var _d = action.payload, result = _d.result, entities_2 = _d.entities, parentSchemaKey = _d.parentSchemaKey, parentProperty = _d.parentProperty, parentId = _d.parentId;
            var newEntities = __assign({}, state.entities);
            if (getParentReferences(newEntities, action.payload)) {
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
        case normalize_1.NormalizeActionTypes.UPDATE_DATA: {
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
        case normalize_1.NormalizeActionTypes.REMOVE_DATA: {
            var _f = action.payload, id = _f.id, key = _f.key, removeChildren = _f.removeChildren;
            var entities_3 = __assign({}, state.entities);
            var entity_1 = entities_3[key][id];
            if (!entity_1) {
                return state;
            }
            if (removeChildren) {
                Object.entries(removeChildren).map(function (_a) {
                    var key = _a[0], entityProperty = _a[1];
                    var child = entity_1[entityProperty];
                    if (child && entities_3[key]) {
                        var ids = Array.isArray(child) ? child : [child];
                        ids.forEach(function (oldId) { return delete entities_3[key][oldId]; });
                    }
                });
            }
            delete entities_3[key][id];
            return {
                result: state.result,
                entities: entities_3
            };
        }
        case normalize_1.NormalizeActionTypes.REMOVE_CHILD_DATA: {
            var _g = action.payload, id = _g.id, childSchemaKey = _g.childSchemaKey, parentProperty = _g.parentProperty, parentSchemaKey = _g.parentSchemaKey, parentId = _g.parentId;
            var newEntities = __assign({}, state.entities);
            var entity = newEntities[childSchemaKey][id];
            if (!entity) {
                return state;
            }
            var parentRefs = getParentReferences(newEntities, action.payload);
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
exports.normalized = normalized;
var getNormalizedState = function (state) {
    return state[STATE_KEY];
};
exports.getNormalizedEntities = store_1.createSelector(getNormalizedState, function (state) { return state.entities; });
exports.getResult = store_1.createSelector(getNormalizedState, function (state) { return state.result; });
function createSchemaSelectors(schema) {
    return {
        getNormalizedEntities: exports.getNormalizedEntities,
        getEntities: createEntitiesSelector(schema, exports.getNormalizedEntities),
        entityProjector: createEntityProjector(schema),
        entitiesProjector: createEntitiesProjector(schema)
    };
}
exports.createSchemaSelectors = createSchemaSelectors;
function createEntitiesSelector(schema, normalizedEntities) {
    return store_1.createSelector(normalizedEntities, createEntitiesProjector(schema));
}
exports.createEntitiesSelector = createEntitiesSelector;
function createEntityProjector(schema) {
    return function (entities, id) {
        return createSingleDenormalizer(schema)(entities, id);
    };
}
exports.createEntityProjector = createEntityProjector;
function createEntitiesProjector(schema) {
    return function (entities, ids) {
        return createMultipleDenormalizer(schema)(entities, ids);
    };
}
exports.createEntitiesProjector = createEntitiesProjector;
function createSingleDenormalizer(schema) {
    var key = schema.key;
    return function (entities, id) {
        var _a, _b;
        if (!entities || !entities[key]) {
            return;
        }
        var denormalized = normalizr_1.denormalize((_a = {}, _a[key] = [id], _a), (_b = {}, _b[key] = [schema], _b), entities);
        return denormalized[key][0];
    };
}
exports.createSingleDenormalizer = createSingleDenormalizer;
function createMultipleDenormalizer(schema) {
    var key = schema.key;
    return function (entities, ids) {
        var _a, _b, _c;
        if (!entities || !entities[key]) {
            return;
        }
        var data = ids ? (_a = {}, _a[key] = ids, _a) : (_b = {}, _b[key] = Object.keys(entities[key]), _b);
        var denormalized = normalizr_1.denormalize(data, (_c = {}, _c[key] = [schema], _c), entities);
        return denormalized[key];
    };
}
exports.createMultipleDenormalizer = createMultipleDenormalizer;
function getParentReferences(entities, payload) {
    var parentSchemaKey = payload.parentSchemaKey, parentProperty = payload.parentProperty, parentId = payload.parentId;
    if (entities[parentSchemaKey] &&
        entities[parentSchemaKey][parentId] &&
        entities[parentSchemaKey][parentId][parentProperty] &&
        Array.isArray(entities[parentSchemaKey][parentId][parentProperty])) {
        return entities[parentSchemaKey][parentId][parentProperty];
    }
}
exports.getParentReferences = getParentReferences;
