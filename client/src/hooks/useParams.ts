import { Optional } from "../types/types";

function getParamsFromURL (url: string): { [key: string]: Optional<string> } {
    if (url.indexOf('?') === -1) {
        return {};
    }
    
    const paramsArray = url.slice(url.indexOf('?')+1).split('&');
    const params: { [key: string]: Optional<string> } = {};

    paramsArray.forEach((param) => {
        const [key, value] = param.split('=');
        params[key] = decodeURIComponent(value);
    });

    return params;
}

export { getParamsFromURL };
