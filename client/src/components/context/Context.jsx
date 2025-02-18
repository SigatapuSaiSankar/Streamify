import React, { createContext, useEffect, useReducer } from 'react'

const intitalValues = {
    role: localStorage.getItem('streamifyRole') || null,
    token: localStorage.getItem('streamifyToken') || null,
    user: localStorage.getItem('streamifyUser') !== null ? JSON.parse(localStorage.getItem('streamifyUser')) : null,
    valid: localStorage.getItem('streamifyValid') || null ? JSON.parse(localStorage.getItem('streamifyValid')) : null
}

export const userContext = createContext(intitalValues);

const reducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_SUCCESSFUL":
            // console.log(action.payload.data);
            return {
                role: action.payload.data.role,
                token: action.payload.token,
                user: action.payload.data,
                valid: action.payload.data.valid
            }
        case "LOGOUT":
            return {
                role: null,
                token: null,
                user: null,
                valid: null
            }
        case "VALID":
            return {
                ...state,
                valid: action.payload.validvalue
            }
        case "UPDATED_USER":
            return {
                role: action.payload.data.role,
                token: action.payload.token,
                user: action.payload.data,
                valid: action.payload.data.valid
            }
        default:
            return state;
    }
}


export default function Context({ children }) {
    const [state, dispatch] = useReducer(reducer, intitalValues);

    useEffect(() => {
        localStorage.setItem('streamifyRole', state.role);
        localStorage.setItem('streamifyToken', state.token);
        localStorage.setItem('streamifyUser', JSON.stringify(state.user));
        localStorage.setItem('streamifyValid', state.valid);
    }, [state])
    // console.log(state);
    return (
        <userContext.Provider value={{ user: state.user, dispatch, role: state.role, token: state.token, valid: state.valid }}>
            {children}
        </userContext.Provider>
    )
}
