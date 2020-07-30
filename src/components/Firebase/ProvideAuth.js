import React, {useState, createContext} from 'react';

export const ProvideAuth = createContext();


export const SessionHandler = (props) => {

    const [ authUser, setAuthUser ] = useState(null);

    return(
        <ProvideAuth.Provider value={[authUser, setAuthUser]}>
            {props.children}
        </ProvideAuth.Provider>
    )
}