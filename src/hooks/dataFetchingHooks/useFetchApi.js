import { apiCall } from "../../utils/services/api/api"
import useSWR from 'swr'

export const useFetchApi = (apiEndpointName, optionsTwo = {}, options = {}) => {
    const fetcher = async (apiEndpointNameReq, optionsReq) => {
        const dataRes = await apiCall(apiEndpointNameReq, optionsReq)
        return dataRes
    }

    const fetchingOptions = {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: true,
        ...optionsTwo
    }

    const { data, error, isLoading, mutate } = useSWR(
        [apiEndpointName, options],
        ([apiEndpointName, options]) => fetcher(apiEndpointName, options),
        { ...fetchingOptions }
    )

    return { data, error, isLoading, mutate }
}


