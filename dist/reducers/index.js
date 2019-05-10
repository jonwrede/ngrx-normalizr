"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var normalizr_1 = require("normalizr");
var immer_1 = require("immer");
var actions_1 = require("../actions");
function initialState() {
    return {
        original: {},
        modified: {}
    };
}
exports.initialState = initialState;
function reducer(schema) {
    return immer_1.default(function (draft, action) {
        var _a;
        return actions_1.entityActionCreator(schema).match(action, (_a = {},
            _a['SET_' + schema.key] = function (data) { },
            _a['ADD_' + schema.key] = function (data) { },
            _a['DELETE_' + schema.key] = function (id) { },
            _a['CLEAR_' + schema.key] = function () { },
            _a['SET_MODFIFIED_' + schema.key] = function (data) { },
            _a['ADD_MODFIFIED_' + schema.key] = function (data) { },
            _a['DELETE_MODFIFIED_' + schema.key] = function (id) { },
            _a['CLEAR_MODFIFIED_' + schema.key] = function () { },
            _a.default = function () { },
            _a));
    }, initialState);
}
exports.reducer = reducer;
function metaReducer(reducer) {
    return immer_1.default(function (draft, action) {
        return actions_1.actionCreator().match(action, {
            SET: function (value) {
                var data = value.data, schema = value.schema;
                var normalizedData = normalizr_1.normalize(data, schema);
                Object.entries(normalizedData.entities).forEach(function (_a) {
                    var key = _a[0], dict = _a[1];
                    return (draft[key].modified = dict);
                });
            },
            SET_MODFIFIED: function (value) {
                var data = value.data, schema = value.schema;
                var normalizedData = normalizr_1.normalize(data, schema);
                Object.entries(normalizedData.entities).forEach(function (_a) {
                    var key = _a[0], dict = _a[1];
                    return (draft[key].modified = dict);
                });
            },
            ADD: function (value) {
                var data = value.data, schema = value.schema;
                var normalizedData = normalizr_1.normalize(data, schema);
                Object.entries(normalizedData.entities).forEach(function (_a) {
                    var key = _a[0], dict = _a[1];
                    Object.entries(dict).forEach(function (_a) {
                        var id = _a[0], obj = _a[1];
                        draft[key].original[id] = obj;
                    });
                });
            },
            ADD_MODFIFIED: function (value) {
                var data = value.data, schema = value.schema;
                var normalizedData = normalizr_1.normalize(data, schema);
                Object.entries(normalizedData.entities).forEach(function (_a) {
                    var key = _a[0], dict = _a[1];
                    Object.entries(dict).forEach(function (_a) {
                        var id = _a[0], obj = _a[1];
                        draft[key].modified[id] = obj;
                    });
                });
            },
            default: function () {
                reducer(draft, action);
            }
        });
    });
}
exports.metaReducer = metaReducer;
