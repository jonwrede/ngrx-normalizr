"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var unionize_1 = require("unionize");
function entityActionCreator(key) {
    var _a;
    return unionize_1.unionize((_a = {},
        _a['SET_' + key] = unionize_1.ofType(),
        _a['ADD_' + key] = unionize_1.ofType(),
        _a['DELETE_' + key] = unionize_1.ofType(),
        _a['CLEAR_' + key] = {},
        _a['SET_MODFIFIED_' + key] = unionize_1.ofType(),
        _a['ADD_MODFIFIED_' + key] = unionize_1.ofType(),
        _a['DELETE_MODFIFIED_' + key] = unionize_1.ofType(),
        _a['CLEAR_MODFIFIED_' + key] = {},
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
