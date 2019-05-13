import { schema } from 'normalizr';
export declare function nmActions<T>(): import("unionize").Unionized<{
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
        children?: boolean;
    };
    CLEAR: {
        schema: schema.Entity;
    };
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
        children?: boolean;
    };
    CLEAR_MODFIFIED: {
        schema: schema.Entity;
    };
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
        children?: boolean;
    };
    CLEAR: {
        schema: schema.Entity;
    };
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
        children?: boolean;
    };
    CLEAR_MODFIFIED: {
        schema: schema.Entity;
    };
}, "type", "payload">, "type">;
export declare function nmEntityActionsCreator<T>(entitySchema: schema.Entity): {
    SET: (data: T[]) => ({
        type: "SET";
    } & {
        payload: {
            data: T[];
            schema: schema.Entity;
        };
    }) | ({
        type: "ADD";
    } & {
        payload: {
            data: T[];
            schema: schema.Entity;
        };
    }) | ({
        type: "DELETE";
    } & {
        payload: {
            data: string[];
            schema: schema.Entity;
            children?: boolean;
        };
    }) | ({
        type: "CLEAR";
    } & {
        payload: {
            schema: schema.Entity;
        };
    }) | ({
        type: "SET_MODFIFIED";
    } & {
        payload: {
            data: T[];
            schema: schema.Entity;
        };
    }) | ({
        type: "ADD_MODFIFIED";
    } & {
        payload: {
            data: T[];
            schema: schema.Entity;
        };
    }) | ({
        type: "DELETE_MODFIFIED";
    } & {
        payload: {
            data: string[];
            schema: schema.Entity;
            children?: boolean;
        };
    }) | ({
        type: "CLEAR_MODFIFIED";
    } & {
        payload: {
            schema: schema.Entity;
        };
    });
    ADD: (data: T[]) => ({
        type: "SET";
    } & {
        payload: {
            data: T[];
            schema: schema.Entity;
        };
    }) | ({
        type: "ADD";
    } & {
        payload: {
            data: T[];
            schema: schema.Entity;
        };
    }) | ({
        type: "DELETE";
    } & {
        payload: {
            data: string[];
            schema: schema.Entity;
            children?: boolean;
        };
    }) | ({
        type: "CLEAR";
    } & {
        payload: {
            schema: schema.Entity;
        };
    }) | ({
        type: "SET_MODFIFIED";
    } & {
        payload: {
            data: T[];
            schema: schema.Entity;
        };
    }) | ({
        type: "ADD_MODFIFIED";
    } & {
        payload: {
            data: T[];
            schema: schema.Entity;
        };
    }) | ({
        type: "DELETE_MODFIFIED";
    } & {
        payload: {
            data: string[];
            schema: schema.Entity;
            children?: boolean;
        };
    }) | ({
        type: "CLEAR_MODFIFIED";
    } & {
        payload: {
            schema: schema.Entity;
        };
    });
    DELETE: (data: string[], children?: boolean) => ({
        type: "SET";
    } & {
        payload: {
            data: T[];
            schema: schema.Entity;
        };
    }) | ({
        type: "ADD";
    } & {
        payload: {
            data: T[];
            schema: schema.Entity;
        };
    }) | ({
        type: "DELETE";
    } & {
        payload: {
            data: string[];
            schema: schema.Entity;
            children?: boolean;
        };
    }) | ({
        type: "CLEAR";
    } & {
        payload: {
            schema: schema.Entity;
        };
    }) | ({
        type: "SET_MODFIFIED";
    } & {
        payload: {
            data: T[];
            schema: schema.Entity;
        };
    }) | ({
        type: "ADD_MODFIFIED";
    } & {
        payload: {
            data: T[];
            schema: schema.Entity;
        };
    }) | ({
        type: "DELETE_MODFIFIED";
    } & {
        payload: {
            data: string[];
            schema: schema.Entity;
            children?: boolean;
        };
    }) | ({
        type: "CLEAR_MODFIFIED";
    } & {
        payload: {
            schema: schema.Entity;
        };
    });
    CLEAR: () => ({
        type: "SET";
    } & {
        payload: {
            data: T[];
            schema: schema.Entity;
        };
    }) | ({
        type: "ADD";
    } & {
        payload: {
            data: T[];
            schema: schema.Entity;
        };
    }) | ({
        type: "DELETE";
    } & {
        payload: {
            data: string[];
            schema: schema.Entity;
            children?: boolean;
        };
    }) | ({
        type: "CLEAR";
    } & {
        payload: {
            schema: schema.Entity;
        };
    }) | ({
        type: "SET_MODFIFIED";
    } & {
        payload: {
            data: T[];
            schema: schema.Entity;
        };
    }) | ({
        type: "ADD_MODFIFIED";
    } & {
        payload: {
            data: T[];
            schema: schema.Entity;
        };
    }) | ({
        type: "DELETE_MODFIFIED";
    } & {
        payload: {
            data: string[];
            schema: schema.Entity;
            children?: boolean;
        };
    }) | ({
        type: "CLEAR_MODFIFIED";
    } & {
        payload: {
            schema: schema.Entity;
        };
    });
    SET_MODFIFIED: (data: T[]) => ({
        type: "SET";
    } & {
        payload: {
            data: T[];
            schema: schema.Entity;
        };
    }) | ({
        type: "ADD";
    } & {
        payload: {
            data: T[];
            schema: schema.Entity;
        };
    }) | ({
        type: "DELETE";
    } & {
        payload: {
            data: string[];
            schema: schema.Entity;
            children?: boolean;
        };
    }) | ({
        type: "CLEAR";
    } & {
        payload: {
            schema: schema.Entity;
        };
    }) | ({
        type: "SET_MODFIFIED";
    } & {
        payload: {
            data: T[];
            schema: schema.Entity;
        };
    }) | ({
        type: "ADD_MODFIFIED";
    } & {
        payload: {
            data: T[];
            schema: schema.Entity;
        };
    }) | ({
        type: "DELETE_MODFIFIED";
    } & {
        payload: {
            data: string[];
            schema: schema.Entity;
            children?: boolean;
        };
    }) | ({
        type: "CLEAR_MODFIFIED";
    } & {
        payload: {
            schema: schema.Entity;
        };
    });
    ADD_MODFIFIED: (data: T[]) => ({
        type: "SET";
    } & {
        payload: {
            data: T[];
            schema: schema.Entity;
        };
    }) | ({
        type: "ADD";
    } & {
        payload: {
            data: T[];
            schema: schema.Entity;
        };
    }) | ({
        type: "DELETE";
    } & {
        payload: {
            data: string[];
            schema: schema.Entity;
            children?: boolean;
        };
    }) | ({
        type: "CLEAR";
    } & {
        payload: {
            schema: schema.Entity;
        };
    }) | ({
        type: "SET_MODFIFIED";
    } & {
        payload: {
            data: T[];
            schema: schema.Entity;
        };
    }) | ({
        type: "ADD_MODFIFIED";
    } & {
        payload: {
            data: T[];
            schema: schema.Entity;
        };
    }) | ({
        type: "DELETE_MODFIFIED";
    } & {
        payload: {
            data: string[];
            schema: schema.Entity;
            children?: boolean;
        };
    }) | ({
        type: "CLEAR_MODFIFIED";
    } & {
        payload: {
            schema: schema.Entity;
        };
    });
    DELETE_MODFIFIED: (data: string[], children?: boolean) => ({
        type: "SET";
    } & {
        payload: {
            data: T[];
            schema: schema.Entity;
        };
    }) | ({
        type: "ADD";
    } & {
        payload: {
            data: T[];
            schema: schema.Entity;
        };
    }) | ({
        type: "DELETE";
    } & {
        payload: {
            data: string[];
            schema: schema.Entity;
            children?: boolean;
        };
    }) | ({
        type: "CLEAR";
    } & {
        payload: {
            schema: schema.Entity;
        };
    }) | ({
        type: "SET_MODFIFIED";
    } & {
        payload: {
            data: T[];
            schema: schema.Entity;
        };
    }) | ({
        type: "ADD_MODFIFIED";
    } & {
        payload: {
            data: T[];
            schema: schema.Entity;
        };
    }) | ({
        type: "DELETE_MODFIFIED";
    } & {
        payload: {
            data: string[];
            schema: schema.Entity;
            children?: boolean;
        };
    }) | ({
        type: "CLEAR_MODFIFIED";
    } & {
        payload: {
            schema: schema.Entity;
        };
    });
    CLEAR_MODFIFIED: () => ({
        type: "SET";
    } & {
        payload: {
            data: T[];
            schema: schema.Entity;
        };
    }) | ({
        type: "ADD";
    } & {
        payload: {
            data: T[];
            schema: schema.Entity;
        };
    }) | ({
        type: "DELETE";
    } & {
        payload: {
            data: string[];
            schema: schema.Entity;
            children?: boolean;
        };
    }) | ({
        type: "CLEAR";
    } & {
        payload: {
            schema: schema.Entity;
        };
    }) | ({
        type: "SET_MODFIFIED";
    } & {
        payload: {
            data: T[];
            schema: schema.Entity;
        };
    }) | ({
        type: "ADD_MODFIFIED";
    } & {
        payload: {
            data: T[];
            schema: schema.Entity;
        };
    }) | ({
        type: "DELETE_MODFIFIED";
    } & {
        payload: {
            data: string[];
            schema: schema.Entity;
            children?: boolean;
        };
    }) | ({
        type: "CLEAR_MODFIFIED";
    } & {
        payload: {
            schema: schema.Entity;
        };
    });
};
