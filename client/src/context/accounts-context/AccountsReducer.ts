import { ActionMap } from '../../types/types';

export enum AccountsTypes {
    AddAccount = 'ADD_ACCOUNT',
    RemoveAccount = 'REMOVE_ACCOUNT',
    DisconnectAccount = 'DISCONNECT_ACCOUNT',
}

type Account = {
    username : string;
    email : string;
    userImg : string;
    token : string;
    isUserConnected : boolean;
}

type AccountsAction = {
    [AccountsTypes.AddAccount]: Account,
    [AccountsTypes.RemoveAccount]: {index: number},
    [AccountsTypes.DisconnectAccount]: {index: number},
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
            state.forEach((account, index) => {
                if (index === action.payload.index) {
                    state[action.payload.index].isUserConnected = false;
                    state[action.payload.index].token = "";
                }
            });
            return state;
        default:
            return state;
    }
}
