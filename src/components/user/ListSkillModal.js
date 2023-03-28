import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import ImageUrls from "../../utils/constants/ImageUrls";

export const ListSkillModal = ({ closeSkillListModal = () => { }, showListSkill = false }) => {
    const [userFormInput, setUserFormInput] = useState({
        name: ""
    })

    const onchangeField = (ev, fieldName) => {
        switch (fieldName) {
            case "name":
                setUserFormInput({ ...userFormInput, name: ev.target.value })
        }
    }

    const editHandler = (userId) => { }
    const deleteHandler = (userId) => { }

    return (<>
        <Transition appear show={showListSkill} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeSkillListModal}>
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
                                            Skills
                                        </Dialog.Title>
                                        <figure className="cursor-pointer" onClick={closeSkillListModal}>
                                            <img src={ImageUrls.close} alt="close" />
                                        </figure>
                                    </div>
                                </header>
                                <body className="py-8 border border-[1px_0px_solid_#E5E7EB]">
                                    <section className="mx-8">
                                        <table className="box-border border border shadow-[0px_1px_3px_rgba(0,0,0,0.1),0px_1px_2px_rgba(0,0,0,0.06)] rounded-lg border-solid">
                                            <thead className="bg-orange-500 text-center">
                                                <th className="px-6 py-3 not-italic font-medium text-xs leading-4 tracking-wider uppercase text-white">Name</th>
                                                <th colSpan={2} className="px-6 py-3 not-italic font-medium text-xs leading-4 tracking-wider uppercase text-white">Action</th>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td className="px-6 py-3 not-italic font-medium text-sm leading-5 tracking-wider">Skill 1</td>
                                                    <td><button
                                                        type="button"
                                                        className="flex flex-row justify-center items-center shadow-[0px_1px_2px_rgba(0,0,0,0.05)] px-[17px] py-[9px] rounded-md border-solid not-italic font-medium text-sm leading-5 border-transparent  bg-orange-500 text-white"
                                                        onClick={() => editHandler(123)}
                                                    >
                                                        Edit
                                                    </button></td>
                                                    <td>
                                                        <button
                                                            type="button"
                                                            className="flex flex-row justify-center items-center shadow-[0px_1px_2px_rgba(0,0,0,0.05)] px-[17px] py-[9px] rounded-md border-solid not-italic font-medium text-sm leading-5 border-transparent  bg-orange-500 text-white"
                                                            onClick={() => deleteHandler(123)}
                                                        >
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </section>
                                </body>
                                <footer className="p-8">
                                    <div className="flex justify-end items-center gap-3">
                                        <button
                                            type="button"
                                            className="flex flex-row justify-center items-center border border-gray-300 shadow-[0px_1px_2px_rgba(0,0,0,0.05)] px-[17px] py-[9px] rounded-md border-solid not-italic font-medium text-sm leading-5 text-gray-700"
                                            onClick={closeSkillListModal}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="button"
                                            className="flex flex-row justify-center items-center shadow-[0px_1px_2px_rgba(0,0,0,0.05)] px-[17px] py-[9px] rounded-md border-solid not-italic font-medium text-sm leading-5 border-transparent  bg-orange-500 text-white"
                                            onClick={closeSkillListModal}
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
    </>);
}