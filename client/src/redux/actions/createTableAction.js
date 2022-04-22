export const createTable = (name) => {
    return {
        type: "CREATE_TABLE",
        payload: name
    };
};