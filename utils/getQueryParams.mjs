export function getQueryParams() {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    return params;
}