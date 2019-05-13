"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var normalizr_1 = require("normalizr");
var immer_1 = require("immer");
var actions_1 = require("../actions");
var entityInitialState = {
    original: {},
    modified: {}
};
function initialState(entites) {
    var result = {};
    entites.forEach(function (entity) { return (result[entity] = entityInitialState); });
    return result;
}
exports.initialState = initialState;
function set(type, draft, data, entitySchema) {
    var normalizedData = normalizr_1.normalize(data, [entitySchema]);
    Object.entries(normalizedData.entities).forEach(function (_a) {
        var key = _a[0], dict = _a[1];
        if (!draft.hasOwnProperty(key)) {
            draft[key] = entityInitialState;
        }
        draft[key][type] = dict;
    });
}
function add(type, draft, data, entitySchema) {
    var normalizedData = normalizr_1.normalize(data, [entitySchema]);
    Object.entries(normalizedData.entities).forEach(function (_a) {
        var key = _a[0], dict = _a[1];
        return Object.entries(dict).forEach(function (_a) {
            var id = _a[0], obj = _a[1];
            if (!draft.hasOwnProperty(key)) {
                draft[key] = entityInitialState;
            }
            draft[key][type][id] = obj;
        });
    });
}
function remove(type, draft, data, entitySchema, children) {
    data.forEach(function (id) {
        var schemaKey = entitySchema.key;
        var ref = draft[schemaKey][type][id];
        if (children) {
            Object.entries(entitySchema.schema).forEach(function (_a) {
                var key = _a[0], schema = _a[1];
                if (ref.hasOwnProperty(key) && typeof ref[key] === 'object') {
                    remove(type, draft, Object.values(ref), schema, children);
                }
            });
        }
        delete draft[entitySchema.key][type][id];
    });
}
function reducer(entites) {
    return immer_1.default(function (draft, action) {
        return actions_1.nmActions().match(action, {
            SET: function (value) {
                var data = value.data, schema = value.schema;
                set('original', draft, data, schema);
            },
            SET_MODFIFIED: function (value) {
                var data = value.data, schema = value.schema;
                set('modified', draft, data, schema);
            },
            ADD: function (value) {
                var data = value.data, schema = value.schema;
                add('original', draft, data, schema);
            },
            ADD_MODFIFIED: function (value) {
                var data = value.data, schema = value.schema;
                add('modified', draft, data, schema);
            },
            DELETE: function (value) {
                var data = value.data, schema = value.schema, children = value.children;
                remove('original', draft, data, schema, children);
            },
            DELETE_MODFIFIED: function (value) {
                var data = value.data, schema = value.schema, children = value.children;
                remove('modified', draft, data, schema, children);
            },
            default: function () { }
        });
    }, initialState(entites));
}
exports.reducer = reducer;
