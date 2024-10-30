const BASE_URL = import.meta.env.VITE_BASE_URL

const ENDPOINTS = {
    Tickers: {
        main: BASE_URL + '/tickers'
    }
}

export { BASE_URL, ENDPOINTS }