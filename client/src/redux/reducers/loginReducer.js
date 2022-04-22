const initialState = {
    email: "",
    password: "", 
    token: sessionStorage.getItem("token")
}

export default function loginReducer(state = initialState, action) {
    switch (action.type) {
        case "LOGIN_SUCCESS":
            {
                return {...state, token: action.payload};
            }
        
        case "LOGOUT":
            {
                return {...state, token: null};
            }
        default:    
            return state;
    }
};
