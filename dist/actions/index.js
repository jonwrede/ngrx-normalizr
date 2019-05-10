"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var unionize_1 = require("unionize");
function entityActionCreator(schema) {
    var _a;
    return unionize_1.unionize((_a = {},
        _a['SET_' + schema.key] = unionize_1.ofType(),
        _a['ADD_' + schema.key] = unionize_1.ofType(),
        _a['DELETE_' + schema.key] = unionize_1.ofType(),
        _a['CLEAR_' + schema.key] = {},
        _a['SET_MODFIFIED_' + schema.key] = unionize_1.ofType(),
        _a['ADD_MODFIFIED_' + schema.key] = unionize_1.ofType(),
        _a['DELETE_MODFIFIED_' + schema.key] = unionize_1.ofType(),
        _a['CLEAR_MODFIFIED_' + schema.key] = {},
        _a), {
        tag: 'type',
        value: 'payload'
    });
}
exports.entityActionCreator = entityActionCreator;
function actionCreator() {
    return unionize_1.unionize({
        SET: unionize_1.ofType(),
        ADD: unionize_1.ofType(),
        DELETE: unionize_1.ofType(),
        CLEAR: {},
        SET_MODFIFIED: unionize_1.ofType(),
        ADD_MODFIFIED: unionize_1.ofType(),
        DELETE_MODFIFIED: unionize_1.ofType(),
        CLEAR_MODFIFIED: {}
    }, {
        tag: 'type',
        value: 'payload'
    });
}
exports.actionCreator = actionCreator;
