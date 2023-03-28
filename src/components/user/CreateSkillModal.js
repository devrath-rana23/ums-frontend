import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import ImageUrls from "../../utils/constants/ImageUrls";

export const CreateSkillModal = ({ closeSkillModal = () => { }, showCreateSkill = false }) => {
    const [userFormInput, setUserFormInput] = useState({
        name: ""
    })

    const onchangeField = (ev, fieldName) => {
        switch (fieldName) {
            case "name":
                setUserFormInput({ ...userFormInput, name: ev.target.value })
        }
    }

    return (<>
        <Transition appear show={showCreateSkill} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeSkillModal}>
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
                                            Add New Skill
                                        </Dialog.Title>
                                        <figure className="cursor-pointer" onClick={closeSkillModal}>
                                            <img src={ImageUrls.close} alt="close" />
                                        </figure>
                                    </div>
                                </header>
                                <body className="py-8 border border-[1px_0px_solid_#E5E7EB]">
                                    <section className="mx-8">
                                        <div className="flex flex-col gap-8">
                                            <div className="flex flex-col" >
                                                <label className="not-italic font-medium text-sm leading-5 text-gray-700" >Name</label>
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
                                            onClick={closeSkillModal}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="button"
                                            className="flex flex-row justify-center items-center shadow-[0px_1px_2px_rgba(0,0,0,0.05)] px-[17px] py-[9px] rounded-md border-solid not-italic font-medium text-sm leading-5 border-transparent  bg-orange-500 text-white"
                                            onClick={closeSkillModal}
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