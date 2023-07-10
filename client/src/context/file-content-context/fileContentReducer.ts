import { ActionMap } from '../../types/types';

export enum FileContentTypes {
    StoreFileContent = "STORE_FILE_CONTENT",
}

type FileContent = {
    fileContent : string;
}

type FileContentAction = {
    [FileContentTypes.StoreFileContent]: string;
}

export type FileContentActions = ActionMap<FileContentAction>[keyof ActionMap<FileContentAction>]

export const FileContentReducer = (state: FileContent, {type, payload}: FileContentActions) => {
    switch (type) {
        case FileContentTypes.StoreFileContent:
            return {
                fileContent: payload
            }
        default:
            return state
    }
}

