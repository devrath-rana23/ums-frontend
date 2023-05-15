import useSWR from 'swr'
import { apiCall } from '../../utils/services/api/api'
import { apiConstants } from '../../utils/services/api/apiEndpoints'
import { createQueryParams } from '../../utils/Utils'

export const useGetEmployeeData = (employeeFilter) => {

    const getEmployeeData = async (url) => {
        const employeeFilterCopy = { ...employeeFilter };
        const queryParams = createQueryParams({
            page: employeeFilterCopy.page,
            limit: employeeFilterCopy.limit,
        });
        const employeeDataResponse = await apiCall(url, {
            loader: true,
            queryParams,
        });
        return employeeDataResponse;
    }

    const { data, error, isLoading, mutate } = useSWR(apiConstants.employeeList, getEmployeeData)
    if (data?.data?.data && Array.isArray(data?.data?.data)) {
        return {
            employeesData: data.data.data,
            totalEmployeeCount: data.data.total,
            isEmployeeDataLoading: isLoading,
            isErrorInEmployeesDataList: error,
            mutateGetEmployeeData: mutate
        }
    }

    return {
        employeesData: [],
        totalEmployeeCount: 0,
        isEmployeeDataLoading: isLoading,
        isErrorInEmployeesDataList: error,
        mutateGetEmployeeData: mutate
    }
}
