import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { useAuth } from "../../hooks";
import { constantText } from "../../utils/constants/ConstantText";
import ImageUrls from "../../utils/constants/ImageUrls";
import { apiCall } from "../../utils/services/api/api";
import { apiConstants } from "../../utils/services/api/apiEndpoints";
import { notify } from "../../utils/services/notify/notify";

export const ListRoleModal = ({ editRoleHandler = () => { }, closeRoleListModal = () => { }, showListRole = false }) => {
    const { user } = useAuth();
    const [rolesList, setRolesList] = useState([]);
    const deleteHandler = async (roleId) => {
        const deleteRoleResponseData = await apiCall(apiConstants.roleDelete, {
            loader: true,
            params: { id: roleId },
        })
        if (deleteRoleResponseData?.status === 200) {
            notify.success(deleteRoleResponseData?.message)
            closeRoleListModal();
            return;
        } else if (deleteRoleResponseData?.status === 400) {
            notify.error(deleteRoleResponseData?.message || constantText.SOMETHING_WENT_WRONG)
            return;
        }
        notify.error(constantText.SOMETHING_WENT_WRONG);
    }

    useEffect(() => {
        getRolesList();

    }, []);

    const getRolesList = async () => {
        const rolesListDataResponse = await apiCall(apiConstants.roleList, { loader: true });
        if (rolesListDataResponse?.data?.data.length > 0 && rolesListDataResponse?.data?.data && Array.isArray(rolesListDataResponse?.data?.data)) {
            setRolesList(rolesListDataResponse?.data?.data);
        }
    };

    const handleDownload = async () => {
        const rolesExportDataResponse = await apiCall(apiConstants.exportRole, { loader: true });
        if (rolesExportDataResponse?.status === 200) {
            notify.success(rolesExportDataResponse?.message)
            return;
        } else if (rolesExportDataResponse?.status === 400) {
            notify.error(rolesExportDataResponse?.message || constantText.SOMETHING_WENT_WRONG)
            return;
        }
        notify.error(constantText.SOMETHING_WENT_WRONG);
    }

    return (<>
        <Transition appear show={showListRole} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeRoleListModal}>
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
                                            Roles
                                        </Dialog.Title>
                                        <figure className="cursor-pointer" onClick={closeRoleListModal}>
                                            <img src={ImageUrls.close} alt="close" />
                                        </figure>
                                    </div>
                                </header>
                                <div className="py-8 border border-[1px_0px_solid_#E5E7EB]">
                                    <div className="flex justify-end mx-8 pb-3">
                                        <button
                                            type="button"
                                            className="flex flex-row justify-center items-center shadow-[0px_1px_2px_rgba(0,0,0,0.05)] px-[17px] py-[9px] rounded-md border-solid not-italic font-medium text-sm leading-5 border-transparent  bg-orange-500 text-white"
                                            onClick={handleDownload}
                                        >
                                            Export
                                        </button>
                                    </div>
                                    <section className="mx-8">
                                        <table className="box-border border border shadow-[0px_1px_3px_rgba(0,0,0,0.1),0px_1px_2px_rgba(0,0,0,0.06)] rounded-lg border-solid">
                                            <thead className="bg-orange-500 text-center">
                                                <tr>
                                                    <th className="px-6 py-3 not-italic font-medium text-xs leading-4 tracking-wider uppercase text-white">Name</th>
                                                    {user?.user?.role_id === constantText.superadmin && (
                                                        <th colSpan={2} className="px-6 py-3 not-italic font-medium text-xs leading-4 tracking-wider uppercase text-white">Action</th>
                                                    )}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {rolesList.length > 0 && rolesList.map((item, index) => (
                                                    <tr key={index}>
                                                        <td className="px-6 py-3 not-italic font-medium text-sm leading-5 tracking-wider">{item?.name}</td>
                                                        {user?.user?.role_id === constantText.superadmin && (
                                                            <>
                                                                <td><button
                                                                    type="button"
                                                                    className={`flex flex-row justify-center items-center shadow-[0px_1px_2px_rgba(0,0,0,0.05)] px-[17px] py-[9px] rounded-md border-solid not-italic font-medium text-sm leading-5 border-transparent  ${item.id === constantText.admin || item.id === constantText.superadmin ? "bg-orange-100" : "bg-orange-500"} text-white`}
                                                                    onClick={() => editRoleHandler(item.id)}
                                                                    disabled={item?.id === constantText.superadmin || item?.id === constantText.admin ? true : false}
                                                                >
                                                                    Edit
                                                                </button></td>
                                                                <td>
                                                                    <button
                                                                        type="button"
                                                                        className={`flex flex-row justify-center items-center shadow-[0px_1px_2px_rgba(0,0,0,0.05)] px-[17px] py-[9px] rounded-md border-solid not-italic font-medium text-sm leading-5 border-transparent  ${item.id === constantText.admin || item.id === constantText.superadmin ? "bg-orange-100" : "bg-orange-500"} text-white`}
                                                                        onClick={() => deleteHandler(item.id)}
                                                                        disabled={item?.id === constantText.superadmin || item?.id === constantText.admin ? true : false}
                                                                    >
                                                                        Delete
                                                                    </button>
                                                                </td>
                                                            </>
                                                        )}
                                                    </tr>
                                                ))}
                                                {!rolesList.length > 0 && (
                                                    <tr>
                                                        <td colSpan={2} className="px-6 py-3 not-italic font-medium text-sm leading-5 tracking-wider">No data found</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </section>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    </>);
}