import { Fragment, useEffect, useState } from "react";
import { apiCall } from "../../utils/services/api/api";
import { apiConstants } from "../../utils/services/api/apiEndpoints";
import "./User.css";
import { useNavigate } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import { CreateSkillModal } from "../../components/user/CreateSkillModal";
import { CreateRoleModal } from "../../components/user/CreateRoleModal";
import { ListRoleModal } from "../../components/user/ListRoleModal";
import { ListSkillModal } from "../../components/user/ListSkillModal";


export const User = () => {

  const navigate = useNavigate();
  const [employeesData, setEmployeesData] = useState([]);
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

  const closeRoleModal = () => {
    setShowCreateRole(false);
  }

  const openSkillModal = () => {
    setShowCreateSkill(true);
  }

  const openRoleModal = () => {
    setShowCreateRole(true);
  }

  const openRoleListModal = () => {
    setShowListRole(true);
  }

  const openSkillListModal = () => {
    setShowListSkill(true);
  }

  const closeRoleListModal = () => {
    setShowListRole(false);
  }

  const closeSkillListModal = () => {
    setShowListSkill(false);
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
          <button onClick={openModal} type="button" class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">Create user</button>
          <button onClick={openSkillModal} type="button" class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">Create skill</button>
          <button onClick={openRoleModal} type="button" class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">Create role</button>
          <button onClick={openRoleListModal} type="button" class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">Show roles</button>
          <button onClick={openSkillListModal} type="button" class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">Show skills</button>
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
                    <button onClick={editHandler(1)} type="button" class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">Edit user</button>
                  </td>
                  <td className="text-center p-5" data-label="Action">
                    <button onClick={editHandler(1)} type="button" class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">Delete user</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    User
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Your payment has been successfully submitted. We’ve sent
                      you an email with all of the details of your order.
                    </p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Save
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      {showCreateSkill && <CreateSkillModal showCreateSkill={showCreateSkill} closeSkillModal={closeSkillModal} />}
      {showCreateRole && <CreateRoleModal showCreateRole={showCreateRole} closeRoleModal={closeRoleModal} />}
      {showListRole && <ListRoleModal showListRole={showListRole} closeRoleListModal={closeRoleListModal} />}
      {showListSkill && <ListSkillModal showListSkill={showListSkill} closeSkillListModal={closeSkillListModal} />}
    </>
  );
};
