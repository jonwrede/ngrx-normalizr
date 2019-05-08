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
var modified_normalize_1 = require("./modified-normalize");
var normalizr_1 = require("normalizr");
var ACTION_NAMESPACE = '[@@Normalize]';
var NormalizeActionTypes = (function () {
    function NormalizeActionTypes() {
    }
    NormalizeActionTypes.SET_DATA = ACTION_NAMESPACE + " Set Data";
    NormalizeActionTypes.ADD_DATA = ACTION_NAMESPACE + " Add Data";
    NormalizeActionTypes.ADD_CHILD_DATA = ACTION_NAMESPACE + " Add Child Data";
    NormalizeActionTypes.UPDATE_DATA = ACTION_NAMESPACE + " Update Data";
    NormalizeActionTypes.REMOVE_DATA = ACTION_NAMESPACE + " Remove Data";
    NormalizeActionTypes.REMOVE_CHILD_DATA = ACTION_NAMESPACE + " Remove Child Data";
    return NormalizeActionTypes;
}());
exports.NormalizeActionTypes = NormalizeActionTypes;
var SetData = (function () {
    function SetData(config) {
        this.type = NormalizeActionTypes.SET_DATA;
        this.payload = normalizr_1.normalize(config.data, [config.schema]);
    }
    return SetData;
}());
exports.SetData = SetData;
var AddData = (function () {
    function AddData(config) {
        this.type = NormalizeActionTypes.ADD_DATA;
        this.payload = normalizr_1.normalize(config.data, [config.schema]);
    }
    return AddData;
}());
exports.AddData = AddData;
var AddChildData = (function () {
    function AddChildData(config) {
        this.type = NormalizeActionTypes.ADD_CHILD_DATA;
        var data = config.data, parentSchema = config.parentSchema, parentId = config.parentId, childSchema = config.childSchema;
        this.payload = __assign({}, normalizr_1.normalize(data, [childSchema]), { parentSchemaKey: parentSchema.key, parentProperty: getRelationProperty(parentSchema, childSchema), parentId: parentId });
    }
    return AddChildData;
}());
exports.AddChildData = AddChildData;
var UpdateData = (function () {
    function UpdateData(config) {
        this.type = NormalizeActionTypes.UPDATE_DATA;
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
    return UpdateData;
}());
exports.UpdateData = UpdateData;
var RemoveData = (function () {
    function RemoveData(config) {
        this.type = NormalizeActionTypes.REMOVE_DATA;
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
    return RemoveData;
}());
exports.RemoveData = RemoveData;
var RemoveChildData = (function () {
    function RemoveChildData(config) {
        this.type = NormalizeActionTypes.REMOVE_CHILD_DATA;
        var id = config.id, parentSchema = config.parentSchema, childSchema = config.childSchema, parentId = config.parentId;
        this.payload = {
            id: id,
            childSchemaKey: childSchema.key,
            parentProperty: getRelationProperty(parentSchema, childSchema),
            parentSchemaKey: parentSchema.key,
            parentId: parentId
        };
    }
    return RemoveChildData;
}());
exports.RemoveChildData = RemoveChildData;
function actionCreators(schema) {
    return {
        setData: function (data) {
            return new SetData({ data: data, schema: schema });
        },
        addData: function (data) {
            return new AddData({ data: data, schema: schema });
        },
        addChildData: function (data, childSchema, parentId) {
            return new AddChildData({
                data: data,
                parentSchema: schema,
                childSchema: childSchema,
                parentId: parentId
            });
        },
        updateData: function (id, changes) { return new UpdateData({ id: id, schema: schema, changes: changes }); },
        removeData: function (id, removeChildren) { return new RemoveData({ id: id, schema: schema, removeChildren: removeChildren }); },
        removeChildData: function (id, childSchema, parentId) {
            return new RemoveChildData({ id: id, parentSchema: schema, childSchema: childSchema, parentId: parentId });
        },
        modifiedSetData: function (data) {
            return new modified_normalize_1.ModifiedSetData({ data: data, schema: schema });
        },
        modifiedAddData: function (data) {
            return new modified_normalize_1.ModifiedAddData({ data: data, schema: schema });
        },
        modifiedAddChildData: function (data, childSchema, parentId) {
            return new modified_normalize_1.ModifiedAddChildData({
                data: data,
                parentSchema: schema,
                childSchema: childSchema,
                parentId: parentId
            });
        },
        modifiedUpdateData: function (id, changes) { return new modified_normalize_1.ModifiedUpdateData({ id: id, schema: schema, changes: changes }); },
        modifiedRemoveData: function (id, removeChildren) { return new modified_normalize_1.ModifiedRemoveData({ id: id, schema: schema, removeChildren: removeChildren }); },
        modifiedRemoveChildData: function (id, childSchema, parentId) {
            return new modified_normalize_1.ModifiedRemoveChildData({
                id: id,
                parentSchema: schema,
                childSchema: childSchema,
                parentId: parentId
            });
        }
    };
}
exports.actionCreators = actionCreators;
function getRelationProperty(schema, childSchema) {
    var parentProperty = null;
    var relations = schema.schema;
    if (relations) {
        Object.keys(relations).some(function (k) {
            var key = Array.isArray(relations[k])
                ? relations[k][0].key
                : relations[k].key;
            if (key === childSchema.key) {
                parentProperty = k;
                return true;
            }
        });
    }
    return parentProperty;
}
exports.getRelationProperty = getRelationProperty;
