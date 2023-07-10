import { createContext, ReactNode, Dispatch, useReducer } from 'react';

import {
    FileContentActions,
    FileContentReducer
} from './fileContentReducer';

type FileContent = {
    fileContent : string;
}

const INITIAL_STATE = {
    fileContent: '',
}

export const fileContentContext = createContext<{
    state: FileContent,
    fileContentDispatch: Dispatch<FileContentActions>
}>({
    state: INITIAL_STATE,
    fileContentDispatch: () => null
});

export const FileContentContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const [state, dispatch] = useReducer(FileContentReducer, INITIAL_STATE);

    return (
        <fileContentContext.Provider
         value={{
            state,
            fileContentDispatch: dispatch
         }}
        >
            {children}
        </fileContentContext.Provider>
    );
}

