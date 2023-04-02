import { Fragment, useEffect, useState } from "react";
import ImageUrls from "../../utils/constants/ImageUrls";
import { TextField } from "../common/textField/TextField";
import { Dialog, Transition } from "@headlessui/react";
import { Select } from "../common/select/Select";
import { apiConstants } from "../../utils/services/api/apiEndpoints";
import { apiCall } from "../../utils/services/api/api";
import { SelectWithAutoComplete } from "../common/select/SelectWithAutoComplete";
import { CheckIcon } from "@heroicons/react/20/solid";

export const UserFormModal = ({ isOpen, closeModal }) => {

    useEffect(() => {
        getSkills();
        getRoles();
    }, []);

    const maritalStatusArray = [
        { name: "single" },
        { name: "married" },
        { name: "divorced" }
    ];

    const [rolesList, setRolesList] = useState([]);
    const [skillsList, setSkillsList] = useState([]);
    const [selected, setSelected] = useState([]);
    const [userFormInput, setUserFormInput] = useState({
        name: "",
        role_id: "",
        avatar: "",
        birth: "",
        salary: "",
        martial_status: "",
        bonus: "",
        phone: "",
        email: "",
        skills: "",
    });

    const handleFormSubmit = (ev) => {
        closeModal();
    };

    const getSkills = async () => {
        const skillsListResponse = await apiCall(apiConstants.skillList, { loader: true });
        if (skillsListResponse?.data?.data && Array.isArray(skillsListResponse?.data?.data)) {
            setSkillsList(skillsListResponse?.data?.data);
        }
    };

    const getRoles = async () => {
        const rolesListResponse = await apiCall(apiConstants.roleList, { loader: true });
        if (rolesListResponse?.data?.data && Array.isArray(rolesListResponse?.data?.data)) {
            setRolesList(rolesListResponse?.data?.data);
        }
    };

    const onchangeField = (ev, fieldName) => {
        const reqValue = ev.target.value;
        switch (fieldName) {
            case "name":
                return setUserFormInput({ ...userFormInput, name: reqValue });
            case "role_id":
                return setUserFormInput({ ...userFormInput, role_id: reqValue });
            case "avatar":
                return setUserFormInput({ ...userFormInput, avatar: reqValue });
            case "birth":
                return setUserFormInput({ ...userFormInput, birth: reqValue });
            case "salary":
                return setUserFormInput({ ...userFormInput, salary: reqValue });
            case "martial_status":
                return setUserFormInput({ ...userFormInput, martial_status: reqValue });
            case "bonus":
                return setUserFormInput({ ...userFormInput, bonus: reqValue });
            case "phone":
                return setUserFormInput({ ...userFormInput, phone: reqValue });
            case "email":
                return setUserFormInput({ ...userFormInput, email: reqValue });
        }
    };

    return (
        <>
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
                                    <form onSubmit={handleFormSubmit}>
                                        <div className="py-8 border border-[1px_0px_solid_#E5E7EB]">
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
                                                            <div className="flex flex-[1] flex-col" >
                                                                <TextField
                                                                    nameField={"name"}
                                                                    label={"Name"}
                                                                    type={"text"}
                                                                    value={userFormInput.name}
                                                                    onChange={(ev) => onchangeField(ev, "name")}
                                                                    required={true}
                                                                />
                                                            </div>
                                                            <div className="flex flex-[1] flex-col" >
                                                                <TextField
                                                                    nameField={"birth"}
                                                                    label={"Date of birth"}
                                                                    type={"date"}
                                                                    value={userFormInput.birth}
                                                                    onChange={(ev) => onchangeField(ev, "birth")}
                                                                    required={true}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="flex gap-2">
                                                            <div className="flex flex-col" >
                                                                <TextField
                                                                    nameField={"salary"}
                                                                    label={"Salary"}
                                                                    type={"number"}
                                                                    value={userFormInput.salary}
                                                                    onChange={(ev) => onchangeField(ev, "salary")}
                                                                    required={true}
                                                                />
                                                            </div>
                                                            <div className="flex flex-col" >
                                                                <TextField
                                                                    nameField={"bonus"}
                                                                    label={"Bonus"}
                                                                    type={"number"}
                                                                    value={userFormInput.bonus}
                                                                    onChange={(ev) => onchangeField(ev, "bonus")}
                                                                    required={true}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="flex gap-2">
                                                            <div className="flex flex-1 flex-col" >
                                                                <SelectWithAutoComplete
                                                                    label={"Skills"}
                                                                    options={skillsList}
                                                                    selected={selected}
                                                                    setSelected={setSelected}
                                                                    multipleVal={true}
                                                                    setUserFormInput={setUserFormInput}
                                                                    userFormInput={userFormInput}
                                                                />
                                                            </div>
                                                            <div className="flex flex-1 flex-col" >
                                                                <Select
                                                                    valueKey={"name"}
                                                                    textKey={"name"}
                                                                    nameField={"martial_status"}
                                                                    label={"Marital Status"}
                                                                    options={maritalStatusArray}
                                                                    onChange={(ev) => onchangeField(ev, "martial_status")}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-col" >
                                                            <Select
                                                                valueKey={"id"}
                                                                textKey={"name"}
                                                                nameField={"role_id"}
                                                                label={"Role"}
                                                                options={rolesList}
                                                                onChange={(ev) => onchangeField(ev, "role_id")}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </section>
                                            <hr className="my-8" />
                                            <section className="mx-8">
                                                <div className="flex flex-col gap-8">
                                                    <div className="flex flex-col" >
                                                        <TextField
                                                            nameField={"email"}
                                                            label={"Email"}
                                                            type={"email"}
                                                            value={userFormInput.email}
                                                            onChange={(ev) => onchangeField(ev, "email")}
                                                            required={true}
                                                        />
                                                    </div>
                                                    <div className="flex flex-col" >
                                                        <TextField
                                                            nameField={"phone"}
                                                            label={"Phone"}
                                                            type={"number"}
                                                            value={userFormInput.phone}
                                                            onChange={(ev) => onchangeField(ev, "phone")}
                                                            required={true}
                                                        />
                                                    </div>
                                                </div>
                                            </section>
                                        </div>
                                        <footer className="p-8">
                                            <div className="flex justify-end items-center gap-3">
                                                <button
                                                    className="flex flex-row justify-center items-center border border-gray-300 shadow-[0px_1px_2px_rgba(0,0,0,0.05)] px-[17px] py-[9px] rounded-md border-solid not-italic font-medium text-sm leading-5 text-gray-700"
                                                    onClick={closeModal}
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    className="flex flex-row justify-center items-center shadow-[0px_1px_2px_rgba(0,0,0,0.05)] px-[17px] py-[9px] rounded-md border-solid not-italic font-medium text-sm leading-5 border-transparent  bg-orange-500 text-white"
                                                >
                                                    Save
                                                </button>
                                            </div>
                                        </footer>
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};