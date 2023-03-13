import { Fragment, useEffect, useState } from "react";
import { apiCall } from "../../utils/services/api/api";
import { apiConstants } from "../../utils/services/api/apiEndpoints";
import "./User.css";
import { useNavigate } from "react-router-dom";


export const User = () => {

  const navigate = useNavigate();
  const [employeesData, setEmployeesData] = useState([]);
  const [showCreateSkill, setShowCreateSkill] = useState(false);
  const [showCreateRole, setShowCreateRole] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true)
  }

  const openSkillModal = () => {
    setShowCreateSkill(true)
  }

  const openRoleModal = () => {
    setShowCreateRole(true)
  }

  const editHandler = (userId) => { }

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
    <>
      <div className="flex justify-center">
        <h1 className="text-[55px] font-bold text-[#00000090] p-[15px]">User Management</h1>
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-end gap-[1rem] my-[15px]">
          <button className="p-5 bg-indigo-700 text-white rounded-[30px]" onClick={openModal}>Create user</button>
          <button className="p-5 bg-indigo-700 text-white rounded-[30px]" onClick={openSkillModal}>Create skill</button>
          <button className="p-5 bg-indigo-700 text-white rounded-[30px]" onClick={openRoleModal}>Create role</button>
        </div>
        <table className="w-4/5 table-fixed mx-auto my-0 p-0 border-collapse">
          <thead>
            <tr className="bg-indigo-700 text-white bg-[#ffffff90] border p-2.5 border-solid border-[#ddd]">
              <th className="text-xl tracking-widest capitalize text-center p-5" >Name</th>
              <th className="text-xl tracking-widest capitalize text-center p-5" >Role</th>
              <th className="text-xl tracking-widest capitalize text-center p-5" >Status</th>
              <th className="text-xl tracking-widest capitalize text-center p-5" colSpan={2}>Action</th>
            </tr>
          </thead>
          <tbody>
            {employeesData.length > 0 &&
              employeesData.map((item, index) => (
                <tr key={index} className="bg-[#ffffff90] border p-2.5 border-solid border-[#ddd]">
                  <td className="text-center p-5" data-label="Name">{item.name}</td>
                  <td className="text-center p-5" data-label="Role">{item.role_id}</td>
                  <td className="text-center p-5" data-label="Status">{item.status === 1 ? "Active" : "In active"}</td>
                  <td className="text-center p-5" data-label="Action">
                    <button className="p-5 bg-indigo-700 text-white rounded-[30px]" onClick={editHandler(1)}>Edit user</button>
                  </td>
                  <td className="text-center p-5" data-label="Action">
                    <button className="p-5 bg-indigo-700 text-white rounded-[30px]">Delete user</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </>
  );
};
