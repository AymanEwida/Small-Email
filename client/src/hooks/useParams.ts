function getParamsFromURL (url: string): { [key: string]: string | undefined } {
    if (url.indexOf('?') === -1) {
        return {};
    }
    
    const paramsArray = url.slice(url.indexOf('?')+1).split('&');
    const params: { [key: string]: string | undefined } = {};

    paramsArray.forEach((param) => {
        const [key, value] = param.split('=');
        params[key] = decodeURIComponent(value);
    });

    return params;
}

export { getParamsFromURL };
