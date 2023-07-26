import { ActionMap } from '../../types/types';

export enum AccountsTypes {
    AddAccount = 'ADD_ACCOUNT',
    RemoveAccount = 'REMOVE_ACCOUNT',
    DisconnectAccount = 'DISCONNECT_ACCOUNT',
    ReconnectAccount = 'RECONNECT_ACCOUNT',
}

type Account = {
    username : string;
    email : string;
    userImg : string;
    token : string;
    isUserConnected : boolean;
    expired : Date;
}

type AccountsAction = {
    [AccountsTypes.AddAccount]: Account,
    [AccountsTypes.RemoveAccount]: {index: number},
    [AccountsTypes.DisconnectAccount]: {index: number},
    [AccountsTypes.ReconnectAccount]: {email: string, token: string, expired: Date},
}

export type AccountsActions = ActionMap<AccountsAction>[keyof ActionMap<AccountsAction>]

export const AccountsReducer = (state: Account[], action: AccountsActions) => {
    switch (action.type) {
        case AccountsTypes.AddAccount:
            for (let i = 0; i < state.length; i++) {
                const account = state[i];

                if (account.username === action.payload.username) {
                    return state;
                }
            }
            return [
                ...state,
                action.payload
            ]
        case AccountsTypes.RemoveAccount:
            return state.filter((account, index) => index !== action.payload.index);
        case AccountsTypes.DisconnectAccount:
            let newState: Account[] = [];

            for (let i = 0; i < state.length; i++) {
                const account = state[i];

                if (i === action.payload.index && account.isUserConnected) {
                    newState.push({...account, token: "", isUserConnected: false});
                } else {
                    newState.push(account);
                }
            }

            return newState;
        case AccountsTypes.ReconnectAccount:
            let newStateArr: Account[] = [];

            for (let i = 0; i < state.length; i++) {
                const account = state[i];

                if (account.email === action.payload.email && !account.isUserConnected) {
                    newStateArr.push({...account, token: action.payload.token, isUserConnected: true, expired: action.payload.expired});
                } else {
                    newStateArr.push(account);
                }
            }

            return newStateArr;
        default:
            return state;
    }
}
