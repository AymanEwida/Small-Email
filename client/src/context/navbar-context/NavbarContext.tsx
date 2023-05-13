import { createContext, ReactNode, Dispatch, useReducer } from 'react';

import {
    NavbarActions,
    NavbarReducer
} from './NavbarReducer';

type Navbar = {
    isMenu : boolean,
    isProfile : boolean,
}

const INITIAL_STATE = {
    isMenu: true,
    isProfile: false,
}

export const NavbarContext = createContext<{
    state: Navbar,
    navbarDispatch: Dispatch<NavbarActions>;
}>({
    state: INITIAL_STATE,
    navbarDispatch: () => null
});

export const NavbarContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(NavbarReducer, INITIAL_STATE);

    return (
        <NavbarContext.Provider
         value={{
            state,
            navbarDispatch: dispatch
         }}
        >
            {children}
        </NavbarContext.Provider>
    );
}
