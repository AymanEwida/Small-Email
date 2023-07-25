import { createContext, ReactNode, Dispatch, useReducer, useEffect } from 'react';

import {
    AccountsActions,
    AccountsReducer
} from './AccountsReducer';

type Account = {
    username : string;
    email : string;
    userImg : string;
    token : string;
    isUserConnected : boolean;
}

const accountsValueFromLocalStorage = localStorage.getItem('accounts');

let accountsValue = [];

if (typeof accountsValueFromLocalStorage === 'string') {
    accountsValue = JSON.parse(accountsValueFromLocalStorage);
}

const INITIAL_STATE = accountsValue || [];

export const AccountsContext = createContext<{
    state: Account[],
    accountsDispatch: Dispatch<AccountsActions>;
}>({
    state: INITIAL_STATE,
    accountsDispatch: () => null
});

export const AccountsContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(AccountsReducer, INITIAL_STATE);

    useEffect(() => {
        localStorage.setItem("accounts", JSON.stringify(state));
    }, [state]);

    return (
        <AccountsContext.Provider
         value={{
            state,
            accountsDispatch: dispatch
         }}
        >
            {children}
        </AccountsContext.Provider>
    );
}
