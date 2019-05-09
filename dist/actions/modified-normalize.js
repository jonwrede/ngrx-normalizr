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
var normalizr_1 = require("normalizr");
var ACTION_NAMESPACE = '[@@ModifiedNormalize]';
var ModifiedNormalizeActionTypes = (function () {
    function ModifiedNormalizeActionTypes() {
    }
    ModifiedNormalizeActionTypes.SET_DATA = ACTION_NAMESPACE + " Set Data";
    ModifiedNormalizeActionTypes.ADD_DATA = ACTION_NAMESPACE + " Add Data";
    ModifiedNormalizeActionTypes.ADD_CHILD_DATA = ACTION_NAMESPACE + " Add Child Data";
    ModifiedNormalizeActionTypes.UPDATE_DATA = ACTION_NAMESPACE + " Update Data";
    ModifiedNormalizeActionTypes.REMOVE_DATA = ACTION_NAMESPACE + " Remove Data";
    ModifiedNormalizeActionTypes.REMOVE_CHILD_DATA = ACTION_NAMESPACE + " Remove Child Data";
    return ModifiedNormalizeActionTypes;
}());
exports.ModifiedNormalizeActionTypes = ModifiedNormalizeActionTypes;
var ModifiedSetData = (function () {
    function ModifiedSetData(config) {
        this.type = ModifiedNormalizeActionTypes.SET_DATA;
        this.payload = normalizr_1.normalize(config.data, [config.schema]);
    }
    return ModifiedSetData;
}());
exports.ModifiedSetData = ModifiedSetData;
var ModifiedAddData = (function () {
    function ModifiedAddData(config) {
        this.type = ModifiedNormalizeActionTypes.ADD_DATA;
        this.payload = normalizr_1.normalize(config.data, [config.schema]);
    }
    return ModifiedAddData;
}());
exports.ModifiedAddData = ModifiedAddData;
var ModifiedAddChildData = (function () {
    function ModifiedAddChildData(config) {
        this.type = ModifiedNormalizeActionTypes.ADD_CHILD_DATA;
        var data = config.data, parentSchema = config.parentSchema, parentId = config.parentId, childSchema = config.childSchema;
        this.payload = __assign({}, normalizr_1.normalize(data, [childSchema]), { parentSchemaKey: parentSchema.key, parentProperty: normalize_1.getRelationProperty(parentSchema, childSchema), parentId: parentId });
    }
    return ModifiedAddChildData;
}());
exports.ModifiedAddChildData = ModifiedAddChildData;
var ModifiedUpdateData = (function () {
    function ModifiedUpdateData(config) {
        this.type = ModifiedNormalizeActionTypes.UPDATE_DATA;
        var id = config.id, schema = config.schema, changes = config.changes;
        changes[schema._idAttribute] = id;
        var normalized = normalizr_1.normalize([config.changes], [config.schema]);
        this.payload = {
            id: id,
            key: schema.key,
            changes: normalized.entities,
            result: normalized.result
        };
    }
    return ModifiedUpdateData;
}());
exports.ModifiedUpdateData = ModifiedUpdateData;
var ModifiedRemoveData = (function () {
    function ModifiedRemoveData(config) {
        this.type = ModifiedNormalizeActionTypes.REMOVE_DATA;
        var id = config.id, removeChildren = config.removeChildren, schema = config.schema;
        var removeMap = null;
        if (removeChildren && schema.schema) {
            removeMap = Object.entries(removeChildren).reduce(function (p, _a) {
                var key = _a[0], entityProperty = _a[1];
                if (entityProperty in schema.schema) {
                    p[key] = entityProperty;
                }
                return p;
            }, {});
        }
        this.payload = {
            id: id,
            key: schema.key,
            removeChildren: removeMap && Object.keys(removeMap).length ? removeMap : null
        };
    }
    return ModifiedRemoveData;
}());
exports.ModifiedRemoveData = ModifiedRemoveData;
var ModifiedRemoveChildData = (function () {
    function ModifiedRemoveChildData(config) {
        this.type = ModifiedNormalizeActionTypes.REMOVE_CHILD_DATA;
        var id = config.id, parentSchema = config.parentSchema, childSchema = config.childSchema, parentId = config.parentId;
        this.payload = {
            id: id,
            childSchemaKey: childSchema.key,
            parentProperty: normalize_1.getRelationProperty(parentSchema, childSchema),
            parentSchemaKey: parentSchema.key,
            parentId: parentId
        };
    }
    return ModifiedRemoveChildData;
}());
exports.ModifiedRemoveChildData = ModifiedRemoveChildData;
