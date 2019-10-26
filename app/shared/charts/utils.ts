export function specialColor(name: any) {
    if (typeof name === 'string') {
        if (name.toLowerCase() === 'no data') {
            return '#DCDCDC';
        } else if (name.toLowerCase() === 'server off') {
            return 'rgba(237,119,0,0.60)';
        }
    }
    return null
}