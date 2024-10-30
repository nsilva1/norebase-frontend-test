import axios from "axios";

const apiCaller = axios.create()

export const getData = async (url: string) => {
    try {
        const response = await apiCaller.get(url)
        return response.data
    } catch (error: any) {
        throw Error(error)
    }
}