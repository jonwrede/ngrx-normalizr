import { schema } from 'normalizr';
export declare function entityActionCreator<T>(key: string): import("unionize").Unionized<{
    [x: string]: {};
}, import("unionize").SingleValueVariants<{
    [x: string]: {};
}, "type", "payload">, "type">;
export declare function actionCreator<T>(): import("unionize").Unionized<{
    SET: {
        data: T[];
        schema: schema.Entity;
    };
    ADD: {
        data: T[];
        schema: schema.Entity;
    };
    DELETE: {
        data: string[];
        schema: schema.Entity;
    };
    CLEAR: {};
    SET_MODFIFIED: {
        data: T[];
        schema: schema.Entity;
    };
    ADD_MODFIFIED: {
        data: T[];
        schema: schema.Entity;
    };
    DELETE_MODFIFIED: {
        data: string[];
        schema: schema.Entity;
    };
    CLEAR_MODFIFIED: {};
}, import("unionize").SingleValueVariants<{
    SET: {
        data: T[];
        schema: schema.Entity;
    };
    ADD: {
        data: T[];
        schema: schema.Entity;
    };
    DELETE: {
        data: string[];
        schema: schema.Entity;
    };
    CLEAR: {};
    SET_MODFIFIED: {
        data: T[];
        schema: schema.Entity;
    };
    ADD_MODFIFIED: {
        data: T[];
        schema: schema.Entity;
    };
    DELETE_MODFIFIED: {
        data: string[];
        schema: schema.Entity;
    };
    CLEAR_MODFIFIED: {};
}, "type", "payload">, "type">;
