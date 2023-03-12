import { useEffect, useState } from "react";
import { apiCall } from "../../utils/services/api/api";
import { apiConstants } from "../../utils/services/api/apiEndpoints";
import "./User.css";

export const User = () => {

  const [employeesData, setEmployeesData] = useState([]);

  useEffect(() => {
    getEmployeeData();
  }, []);

  const getEmployeeData = async () => {
    const employeeDataResponse = await apiCall(apiConstants.employeeList, { loader: true });
    if (employeeDataResponse?.data && Array.isArray(employeeDataResponse?.data)) {
      setEmployeesData(employeeDataResponse?.data);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <table className="w-4/5 table-fixed mx-auto my-0 p-0 border-collapse">
        <caption className="text-[55px] font-bold text-[#00000090] p-[15px]">User Management</caption>
        <thead>
          <tr className="bg-indigo-700 text-white bg-[#ffffff90] border p-2.5 border-solid border-[#ddd]">
            <th className="text-xl tracking-widest capitalize text-center p-5" >Name</th>
            <th className="text-xl tracking-widest capitalize text-center p-5" >Role</th>
            <th className="text-xl tracking-widest capitalize text-center p-5" >Status</th>
          </tr>
        </thead>
        <tbody>
          {employeesData.length > 0 &&
            employeesData.map((item, index) => (
              <tr key={index} className="bg-[#ffffff90] border p-2.5 border-solid border-[#ddd]">
                <td className="text-center p-5" data-label="Name">{item.name}</td>
                <td className="text-center p-5" data-label="Role">{item.role_id}</td>
                <td className="text-center p-5" data-label="Status">{item.status}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
};
