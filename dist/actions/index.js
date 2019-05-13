"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var unionize_1 = require("unionize");
function nmActions() {
    return unionize_1.unionize({
        SET: unionize_1.ofType(),
        ADD: unionize_1.ofType(),
        DELETE: unionize_1.ofType(),
        CLEAR: unionize_1.ofType(),
        SET_MODFIFIED: unionize_1.ofType(),
        ADD_MODFIFIED: unionize_1.ofType(),
        DELETE_MODFIFIED: unionize_1.ofType(),
        CLEAR_MODFIFIED: unionize_1.ofType()
    }, {
        tag: 'type',
        value: 'payload'
    });
}
exports.nmActions = nmActions;
function nmEntityActionsCreator(entitySchema) {
    var actions = nmActions();
    return {
        SET: function (data) { return actions.SET({ data: data, schema: entitySchema }); },
        ADD: function (data) { return actions.ADD({ data: data, schema: entitySchema }); },
        DELETE: function (data, children) {
            if (children === void 0) { children = true; }
            return actions.DELETE({ data: data, schema: entitySchema, children: children });
        },
        CLEAR: function () { return actions.CLEAR({ schema: entitySchema }); },
        SET_MODFIFIED: function (data) {
            return actions.SET_MODFIFIED({ data: data, schema: entitySchema });
        },
        ADD_MODFIFIED: function (data) {
            return actions.ADD_MODFIFIED({ data: data, schema: entitySchema });
        },
        DELETE_MODFIFIED: function (data, children) {
            if (children === void 0) { children = true; }
            return actions.DELETE_MODFIFIED({
                data: data,
                schema: entitySchema,
                children: children
            });
        },
        CLEAR_MODFIFIED: function () { return actions.CLEAR_MODFIFIED({ schema: entitySchema }); }
    };
}
exports.nmEntityActionsCreator = nmEntityActionsCreator;
