import { ActionMap } from '../../types/types';

export enum NavbarTypes {
    OpenProfile = 'OPEN_PROFILE',
    CloseProfile = 'CLOSE_PROFILE',
    OpenMenu = 'OPEN_MENU',
    CloseMenu = 'CLOSE_MENU',
}

type Navbar = {
    isMenu : boolean;
    isProfile : boolean;
}

type NavbarAction = {
    [NavbarTypes.OpenProfile]: undefined;
    [NavbarTypes.CloseProfile]: undefined;
    [NavbarTypes.OpenMenu]: undefined;
    [NavbarTypes.CloseMenu]: undefined;
}

export type NavbarActions = ActionMap<NavbarAction>[keyof ActionMap<NavbarAction>]

export const NavbarReducer = (state: Navbar, action: NavbarActions) => {
    switch (action.type) {
        case NavbarTypes.OpenProfile:
            return {
                ...state,
                isProfile: true
            };
        case NavbarTypes.CloseProfile:
            return {
                ...state,
                isProfile: false
            };
        case NavbarTypes.OpenMenu:
            return {
                isMenu: true,
                isProfile: false
            };
        case NavbarTypes.CloseMenu:
            return {
                isMenu: false,
                isProfile: false
            };
        default:
            return state
    }
}
