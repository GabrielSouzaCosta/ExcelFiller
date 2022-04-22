const initialState = { name: "Tabela", id: "" };

const tableReducer = (state = initialState, action) => {
    switch (action.type) {
        case "CREATE_TABLE":
            {
                return {...state, name: action.payload};
            }
        
        case "DELETE_TABLE":
            {
                return {...state, name: ""};
            }
        default:    
            return state;
    }
};

export default tableReducer;