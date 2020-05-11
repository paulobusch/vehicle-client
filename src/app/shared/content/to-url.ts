export function toUrl(obj: any): string {
    if (!obj) return null;

    const props = [];
    for (const prop in obj) {
        const value = obj[prop];
        if (!value) continue;
        const type = typeof value;
        if (['number', 'string'].indexOf(type) !== -1){
            props.push(`${prop}=${value.toString()}`);
        }
        if (value instanceof Date) {
            props.push(`${prop}=${value.toISOString()}`);
        }
    }

    return props.join('&');
}