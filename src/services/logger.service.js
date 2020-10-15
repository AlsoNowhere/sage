
export const logger = {
    error: (
        app,
        location,
        property,
        message
    ) => {
        throw new Error(`${app} - ${location} - ${property} -- ${message}`);
    },
    warn: (
        app,
        location,
        property,
        message
    ) => {
        console.warn(`${app} - ${location} - ${property} -- ${message}`);
    }
}
