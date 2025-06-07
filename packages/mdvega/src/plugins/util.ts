export function urlParam(urlParamName: string, value: any) {
    if (value === undefined || value === null) return '';
    if (Array.isArray(value)) {
        return value.map(vn => `${urlParamName}[]=${encodeURIComponent(vn)}`).join('&');
    } else {
        return `${urlParamName}=${encodeURIComponent(value)}`;
    }
}
