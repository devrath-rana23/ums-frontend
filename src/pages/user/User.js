import { Fragment, useEffect, useState } from "react";
import { apiCall } from "../../utils/services/api/api";
import { apiConstants } from "../../utils/services/api/apiEndpoints";
import "./User.css";
import { useNavigate } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import { CreateSkillModal } from "../../components/user/CreateSkillModal";
import { ListSkillModal } from "../../components/user/ListSkillModal";
import ImageUrls from "../../utils/constants/ImageUrls";


export const User = () => {

  const navigate = useNavigate();
  const [employeesData, setEmployeesData] = useState([]);
  const [showCreateSkill, setShowCreateSkill] = useState(false);
  const [showCreateRole, setShowCreateRole] = useState(false);
  const [showListRole, setShowListRole] = useState(false);
  const [showListSkill, setShowListSkill] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [userFormInput, setUserFormInput] = useState({
    name: ""
  })

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

  const openSkillListModal = () => {
    setShowListSkill(true);
  }

  const closeSkillListModal = () => {
    setShowListSkill(false);
  }

  const onchangeField = (ev, fieldName) => {
    switch (fieldName) {
      case "name":
        setUserFormInput({ ...userFormInput, name: ev.target.value })
    }
  }

  const editHandler = (userId) => { }
  const deleteHandler = (userId) => { }

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
        <div className="flex flex-end gap-[1rem] my-[15px]">
          <button
            type="button"
            className="flex flex-row justify-center items-center shadow-[0px_1px_2px_rgba(0,0,0,0.05)] px-[17px] py-[9px] rounded-md border-solid not-italic font-medium text-sm leading-5 border-transparent  bg-orange-500 text-white"
            onClick={openModal}
          >
            Create user
          </button>
          <button
            type="button"
            className="flex flex-row justify-center items-center shadow-[0px_1px_2px_rgba(0,0,0,0.05)] px-[17px] py-[9px] rounded-md border-solid not-italic font-medium text-sm leading-5 border-transparent  bg-orange-500 text-white"
            onClick={openSkillModal}
          >
            Create skill
          </button>
          <button
            type="button"
            className="flex flex-row justify-center items-center shadow-[0px_1px_2px_rgba(0,0,0,0.05)] px-[17px] py-[9px] rounded-md border-solid not-italic font-medium text-sm leading-5 border-transparent  bg-orange-500 text-white"
            onClick={openSkillListModal}
          >
            Show skills
          </button>
        </div>
        <table className="user-table table-fixed mx-auto my-0 p-0 border-collapse">
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
              <th className="text-xl tracking-widest capitalize text-center p-5" colSpan={2}>Action</th>
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
                  <td className="text-center p-5" data-label="Skills">{item.employee.skills}</td>
                  <td className="text-center p-5" data-label="Bonus">{item.employee.bonus ?? ""}</td>
                  <td className="text-center p-5" data-label="Phone">{item.employee.contact_info.phone}</td>
                  <td className="text-center p-5" data-label="Email">{item.employee.contact_info.email}</td>
                  <td className="text-center p-5" data-label="Action">
                    <button
                      type="button"
                      className="flex flex-row justify-center items-center shadow-[0px_1px_2px_rgba(0,0,0,0.05)] px-[17px] py-[9px] rounded-md border-solid not-italic font-medium text-sm leading-5 border-transparent  bg-orange-500 text-white"
                      onClick={() => editHandler(item.id)}
                    >
                      Edit
                    </button>
                  </td>
                  <td className="text-center p-5" data-label="Action">
                    <button
                      type="button"
                      className="flex flex-row justify-center items-center shadow-[0px_1px_2px_rgba(0,0,0,0.05)] px-[17px] py-[9px] rounded-md border-solid not-italic font-medium text-sm leading-5 border-transparent  bg-orange-500 text-white"
                      onClick={() => deleteHandler(item.id)}
                    >
                      Delete
                    </button>
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
                <Dialog.Panel className="w-full max-w-fit transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                  <header className="p-8">
                    <div className="flex items-center justify-between">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900"
                      >
                        Add New Employee
                      </Dialog.Title>
                      <figure className="cursor-pointer" onClick={closeModal}>
                        <img src={ImageUrls.close} alt="close" />
                      </figure>
                    </div>
                  </header>
                  <body className="py-8 border border-[1px_0px_solid_#E5E7EB]">
                    <section className="mx-8">
                      <h1 className="not-italic font-semibold text-base leading-6 mb-4">General Information</h1>
                      <div className="flex gap-10">
                        <div className="flex flex-col">
                          <label className="not-italic font-medium text-sm leading-5 text-gray-700">Profile Photo</label>
                          <img className="w-[143px] h-auto" src={ImageUrls.avatarPlaceholder} alt="avatarPlaceholder" />
                          <button
                            type="button"
                            className="mt-[15.99px] flex flex-row justify-center items-center shadow-[0px_1px_2px_rgba(0,0,0,0.05)] px-[17px] py-[9px] rounded-md border-solid not-italic font-medium text-sm leading-5 border-transparent  bg-orange-500 text-white"
                            onClick={closeModal}
                          >
                            Upload
                          </button>
                        </div>
                        <div className="flex flex-col gap-8">
                          <div className="flex gap-2">
                            <div className="flex flex-col" >
                              <label className="not-italic font-medium text-sm leading-5 text-gray-700" >Name</label>
                              <input type={"text"} name={"employee_name"} className="box-border border border-gray-300 shadow-[0px_1px_2px_rgba(0,0,0,0.05)] px-[13px] py-[9px] rounded-md border-solid outline-none w-full" value={userFormInput.name} onChange={(ev) => onchangeField(ev, "name")} />
                            </div>
                            <div className="flex flex-col" >
                              <label className="not-italic font-medium text-sm leading-5 text-gray-700" >Role</label>
                              <input type={"text"} name={"role_id"} className="box-border border border-gray-300 shadow-[0px_1px_2px_rgba(0,0,0,0.05)] px-[13px] py-[9px] rounded-md border-solid outline-none w-full" value={userFormInput.name} onChange={(ev) => onchangeField(ev, "name")} />
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <div className="flex flex-col" >
                              <label className="not-italic font-medium text-sm leading-5 text-gray-700" >Salary</label>
                              <input type={"text"} name={"salary"} className="box-border border border-gray-300 shadow-[0px_1px_2px_rgba(0,0,0,0.05)] px-[13px] py-[9px] rounded-md border-solid outline-none w-full" value={userFormInput.name} onChange={(ev) => onchangeField(ev, "name")} />
                            </div>
                            <div className="flex flex-col" >
                              <label className="not-italic font-medium text-sm leading-5 text-gray-700" >Bonus</label>
                              <input type={"text"} name={"phone"} className="box-border border border-gray-300 shadow-[0px_1px_2px_rgba(0,0,0,0.05)] px-[13px] py-[9px] rounded-md border-solid outline-none w-full" value={userFormInput.name} onChange={(ev) => onchangeField(ev, "name")} />
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <div className="flex flex-col" >
                              <label className="not-italic font-medium text-sm leading-5 text-gray-700" >Date of Birth</label>
                              <input type={"text"} name={"salary"} className="box-border border border-gray-300 shadow-[0px_1px_2px_rgba(0,0,0,0.05)] px-[13px] py-[9px] rounded-md border-solid outline-none w-full" value={userFormInput.name} onChange={(ev) => onchangeField(ev, "name")} />
                            </div>
                            <div className="flex flex-col" >
                              <label className="not-italic font-medium text-sm leading-5 text-gray-700" >Marital Status</label>
                              <input type={"text"} name={"phone"} className="box-border border border-gray-300 shadow-[0px_1px_2px_rgba(0,0,0,0.05)] px-[13px] py-[9px] rounded-md border-solid outline-none w-full" value={userFormInput.name} onChange={(ev) => onchangeField(ev, "name")} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                    <hr className="my-8" />
                    <section className="mx-8">
                      <div className="flex flex-col gap-8">
                        <div className="flex flex-col" >
                          <label className="not-italic font-medium text-sm leading-5 text-gray-700" >Email</label>
                          <input type={"text"} name={"email"} className="box-border border border-gray-300 shadow-[0px_1px_2px_rgba(0,0,0,0.05)] px-[13px] py-[9px] rounded-md border-solid outline-none w-full" value={userFormInput.name} onChange={(ev) => onchangeField(ev, "name")} />
                        </div>
                        <div className="flex flex-col" >
                          <label className="not-italic font-medium text-sm leading-5 text-gray-700" >Phone</label>
                          <input type={"text"} name={"email"} className="box-border border border-gray-300 shadow-[0px_1px_2px_rgba(0,0,0,0.05)] px-[13px] py-[9px] rounded-md border-solid outline-none w-full" value={userFormInput.name} onChange={(ev) => onchangeField(ev, "name")} />
                        </div>
                        <div className="flex flex-col" >
                          <label className="not-italic font-medium text-sm leading-5 text-gray-700" >Skills</label>
                          <input type={"text"} name={"email"} className="box-border border border-gray-300 shadow-[0px_1px_2px_rgba(0,0,0,0.05)] px-[13px] py-[9px] rounded-md border-solid outline-none w-full" value={userFormInput.name} onChange={(ev) => onchangeField(ev, "name")} />
                        </div>
                      </div>
                    </section>
                  </body>
                  <footer className="p-8">
                    <div className="flex justify-end items-center gap-3">
                      <button
                        type="button"
                        className="flex flex-row justify-center items-center border border-gray-300 shadow-[0px_1px_2px_rgba(0,0,0,0.05)] px-[17px] py-[9px] rounded-md border-solid not-italic font-medium text-sm leading-5 text-gray-700"
                        onClick={closeModal}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="flex flex-row justify-center items-center shadow-[0px_1px_2px_rgba(0,0,0,0.05)] px-[17px] py-[9px] rounded-md border-solid not-italic font-medium text-sm leading-5 border-transparent  bg-orange-500 text-white"
                        onClick={closeModal}
                      >
                        Save
                      </button>
                    </div>
                  </footer>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      {showCreateSkill && <CreateSkillModal showCreateSkill={showCreateSkill} closeSkillModal={closeSkillModal} />}
      {showListSkill && <ListSkillModal showListSkill={showListSkill} closeSkillListModal={closeSkillListModal} />}
    </>
  );
};
