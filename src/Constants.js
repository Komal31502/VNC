const prod = 'https://vncdesignerdemo.azurewebsites.net';

const dev = '';

export const rootUrl = process.env.NODE_ENV === "development" ? dev : prod;