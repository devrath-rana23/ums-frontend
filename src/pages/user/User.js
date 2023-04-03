import { useEffect, useState } from "react";
import { apiCall } from "../../utils/services/api/api";
import { apiConstants } from "../../utils/services/api/apiEndpoints";
import "./User.css";
import { CreateSkillModal } from "../../components/user/CreateSkillModal";
import { ListSkillModal } from "../../components/user/ListSkillModal";
import { ListRoleModal } from "../../components/user/ListRoleModal";
import { CreateRoleModal } from "../../components/user/CreateRoleModal";
import { useAuth } from "../../hooks";
import { constantText } from "../../utils/constants/ConstantText";
import { UserFormModal } from "../../components/user/UserFormModal";
import { notify } from "../../utils/services/notify/notify";

export const User = () => {
  const { user } = useAuth();
  const [employeesData, setEmployeesData] = useState([]);
  const [editEmployeesData, setEditEmployeesData] = useState([]);
  const [showCreateSkill, setShowCreateSkill] = useState(false);
  const [showCreateRole, setShowCreateRole] = useState(false);
  const [showListRole, setShowListRole] = useState(false);
  const [showListSkill, setShowListSkill] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  }

  const closeModal = () => {
    setIsOpen(false);
  }

  const closeSkillModal = () => {
    setShowCreateSkill(false);
  }

  const openSkillModal = () => {
    setShowCreateSkill(true);
  }

  const closeRoleModal = () => {
    setShowCreateRole(false);
  }

  const openRoleModal = () => {
    setShowCreateRole(true);
  }

  const openRoleListModal = () => {
    setShowListRole(true);
  }

  const closeRoleListModal = () => {
    setShowListRole(false);
  }

  const openSkillListModal = () => {
    setShowListSkill(true);
  }

  const closeSkillListModal = () => {
    setShowListSkill(false);
  }

  const editHandler = async (userId) => {
    const editUserResponseData = await apiCall(apiConstants.employeeEdit, {
      loader: true,
      params: { id: userId },
    })
    if (editUserResponseData?.status === 200) {
      setEditEmployeesData(editUserResponseData?.data);
      return;
    } else if (editUserResponseData?.status === 400) {
      setEditEmployeesData([]);
      notify.error(editUserResponseData?.message || constantText.SOMETHING_WENT_WRONG)
      setEditEmployeesData([]);
      return;
    }
    notify.error(constantText.SOMETHING_WENT_WRONG);
  }

  const deleteHandler = async (userId) => {
    const deleteUserResponseData = await apiCall(apiConstants.employeeDelete, {
      loader: true,
      params: { id: userId },
    })
    if (deleteUserResponseData?.status === 200) {
      notify.success(deleteUserResponseData?.message)
      setTimeout(() => {
        window.location.reload();
      }, 500)
      return;
    } else if (deleteUserResponseData?.status === 400) {
      notify.error(deleteUserResponseData?.message || constantText.SOMETHING_WENT_WRONG)
      return;
    }
    notify.error(constantText.SOMETHING_WENT_WRONG);
  }

  useEffect(() => {
    getEmployeeData();
  }, []);

  const getEmployeeData = async () => {
    const employeeDataResponse = await apiCall(apiConstants.employeeList, { loader: true });
    if (employeeDataResponse?.data?.data && Array.isArray(employeeDataResponse?.data?.data)) {
      setEmployeesData(employeeDataResponse?.data?.data);
    }
  }

  return (
    <>
      <div className="flex justify-center">
        <h1 className="text-[55px] font-bold text-[#00000090] p-[15px]">User Management</h1>
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="btns-container flex flex-end gap-[1rem] my-[15px]">
          {(user?.user?.role_id === constantText.superadmin || user?.user?.role_id === constantText.admin) && (
            <button
              type="button"
              className="flex flex-row justify-center items-center shadow-[0px_1px_2px_rgba(0,0,0,0.05)] px-[17px] py-[9px] rounded-md border-solid not-italic font-medium text-sm leading-5 border-transparent  bg-orange-500 text-white"
              onClick={openModal}
            >
              Create user
            </button>
          )}
          {(user?.user?.role_id === constantText.superadmin || user?.user?.role_id === constantText.admin) && (
            <button
              type="button"
              className="flex flex-row justify-center items-center shadow-[0px_1px_2px_rgba(0,0,0,0.05)] px-[17px] py-[9px] rounded-md border-solid not-italic font-medium text-sm leading-5 border-transparent  bg-orange-500 text-white"
              onClick={openSkillModal}
            >
              Create skill
            </button>
          )}
          {(user?.user?.role_id === constantText.superadmin || user?.user?.role_id === constantText.admin) && (
            <button
              type="button"
              className="flex flex-row justify-center items-center shadow-[0px_1px_2px_rgba(0,0,0,0.05)] px-[17px] py-[9px] rounded-md border-solid not-italic font-medium text-sm leading-5 border-transparent  bg-orange-500 text-white"
              onClick={openSkillListModal}
            >
              Show skills
            </button>
          )}
          {user?.user?.role_id === constantText.superadmin && (
            <button
              type="button"
              className="flex flex-row justify-center items-center shadow-[0px_1px_2px_rgba(0,0,0,0.05)] px-[17px] py-[9px] rounded-md border-solid not-italic font-medium text-sm leading-5 border-transparent  bg-orange-500 text-white"
              onClick={openRoleModal}
            >
              Create Role
            </button>
          )}
          {(user?.user?.role_id === constantText.superadmin || user?.user?.role_id === constantText.admin) && (
            <button
              type="button"
              className="flex flex-row justify-center items-center shadow-[0px_1px_2px_rgba(0,0,0,0.05)] px-[17px] py-[9px] rounded-md border-solid not-italic font-medium text-sm leading-5 border-transparent  bg-orange-500 text-white"
              onClick={openRoleListModal}
            >
              Show Roles
            </button>
          )}
        </div>
      </div>
      <div className="overflow-auto mx-10">
        <table className="user-table table-fixed border-collapse">
          <thead className="user-thead">
            <tr className="bg-orange-500 text-white border p-2.5 border-solid border-[#ddd]">
              <th className="text-xl tracking-widest capitalize text-center p-5" >Name</th>
              <th className="text-xl tracking-widest capitalize text-center p-5" >Role</th>
              <th className="text-xl tracking-widest capitalize text-center p-5" >Status</th>
              <th className="text-xl tracking-widest capitalize text-center p-5" >Date of Birth</th>
              <th className="text-xl tracking-widest capitalize text-center p-5" >Salary</th>
              <th className="text-xl tracking-widest capitalize text-center p-5" >Marital Status</th>
              <th className="text-xl tracking-widest capitalize text-center p-5" >Skills</th>
              <th className="text-xl tracking-widest capitalize text-center p-5" >Bonus</th>
              <th className="text-xl tracking-widest capitalize text-center p-5" >Phone</th>
              <th className="text-xl tracking-widest capitalize text-center p-5" >Email</th>
              {(user?.user?.role_id === constantText.superadmin || user?.user?.role_id === constantText.admin) && (
                <th className="text-xl tracking-widest capitalize text-center p-5" colSpan={2}>Action</th>
              )}
            </tr>
          </thead>
          <tbody>
            {employeesData.length > 0 &&
              employeesData.map((item, index) => (
                <tr key={index} className="bg-[#ffffff90] border p-2.5 border-solid border-[#ddd]">
                  <td className="text-center p-5" data-label="Name">{item.name}</td>
                  <td className="text-center p-5" data-label="Role">{item.role.name}</td>
                  <td className="text-center p-5" data-label="Status">{item.status === 1 ? "Active" : "In active"}</td>
                  <td className="text-center p-5" data-label="Date of Birth">{item.employee.birth ?? ""}</td>
                  <td className="text-center p-5" data-label="Salary">{item.employee.salary}</td>
                  <td className="text-center p-5" data-label="Marital Status">{item.employee.martial_status}</td>
                  <td className="text-center p-5" data-label="Skills">{item.employee.skills.map((item) => { return item.name }).join()}</td>
                  <td className="text-center p-5" data-label="Bonus">{item.employee.bonus ?? ""}</td>
                  <td className="text-center p-5" data-label="Phone">{item.employee.contact_info.phone}</td>
                  <td className="text-center p-5" data-label="Email">{item.employee.contact_info.email}</td>
                  {(user?.user?.role_id === constantText.superadmin || user?.user?.role_id === constantText.admin) && (
                    <>
                      <td className="text-center p-5" data-label="Action">
                        <button
                          disabled={item.role.id === constantText.admin || item.role.id === constantText.superadmin}
                          type="button"
                          className={`flex flex-row justify-center items-center shadow-[0px_1px_2px_rgba(0,0,0,0.05)] px-[17px] py-[9px] rounded-md border-solid not-italic font-medium text-sm leading-5 border-transparent  ${item.role.id === constantText.admin || item.role.id === constantText.superadmin ? "bg-orange-100" : "bg-orange-500"} text-white`}
                          onClick={() => editHandler(item.id)}
                        >
                          Edit
                        </button>
                      </td>
                      <td className="text-center p-5" data-label="Action">
                        <button
                          type="button"
                          className={`flex flex-row justify-center items-center shadow-[0px_1px_2px_rgba(0,0,0,0.05)] px-[17px] py-[9px] rounded-md border-solid not-italic font-medium text-sm leading-5 border-transparent  ${item.role.id === constantText.admin || item.role.id === constantText.superadmin ? "bg-orange-100" : "bg-orange-500"} text-white`}
                          onClick={() => deleteHandler(item.id)}
                          disabled={item.role.id === constantText.admin || item.role.id === constantText.superadmin}
                        >
                          Delete
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      {isOpen && <UserFormModal editEmployeesData={editEmployeesData} isOpen={isOpen} closeModal={closeModal} />}
      {showCreateSkill && <CreateSkillModal showCreateSkill={showCreateSkill} closeSkillModal={closeSkillModal} />}
      {showListSkill && <ListSkillModal showListSkill={showListSkill} closeSkillListModal={closeSkillListModal} />}
      {showCreateRole && <CreateRoleModal showCreateRole={showCreateRole} closeRoleModal={closeRoleModal} />}
      {showListRole && <ListRoleModal showListRole={showListRole} closeRoleListModal={closeRoleListModal} />}
    </>
  );
};
