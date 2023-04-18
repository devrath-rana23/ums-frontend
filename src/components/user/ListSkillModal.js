import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { constantText } from "../../utils/constants/ConstantText";
import ImageUrls from "../../utils/constants/ImageUrls";
import { apiCall } from "../../utils/services/api/api";
import { apiConstants } from "../../utils/services/api/apiEndpoints";
import { notify } from "../../utils/services/notify/notify";
import Pagination from "../common/pagination/Pagination";
import { createQueryParams } from "../../utils/Utils";

export const ListSkillModal = ({ closeSkillListModal = () => { }, showListSkill = false, editSkillHandler = () => { } }) => {

    const [skillFilter, setSkillFilter] = useState({
        page: 1,
        limit: 10,
    });
    const [totalCount, setPageCount] = useState(0);
    const [skillsList, setSkillsList] = useState([]);
    const deleteHandler = async (skillId) => {
        const deleteUserResponseData = await apiCall(apiConstants.skillDelete, {
            loader: true,
            params: { id: skillId },
        })
        if (deleteUserResponseData?.status === 200) {
            notify.success(deleteUserResponseData?.message)
            closeSkillListModal();
            return;
        } else if (deleteUserResponseData?.status === 400) {
            notify.error(deleteUserResponseData?.message || constantText.SOMETHING_WENT_WRONG)
            return;
        }
        notify.error(constantText.SOMETHING_WENT_WRONG);
    }

    const onChangeFilter = (ev, type) => {
        const data = {
            ...skillFilter,
            [type]: ev.target.value,
        };
        data.page = 1;
        setSkillFilter(data);
    };

    const onChangePage = (pageNumber) => {
        const data = { ...skillFilter, page: pageNumber };
        setSkillFilter(data);
    };

    useEffect(() => {
        getSkillsList();

    }, [skillFilter]);

    const getSkillsList = async () => {
        const skillFilterCopy = { ...skillFilter };
        const queryParams = createQueryParams({
            page: skillFilterCopy.page,
            limit: skillFilterCopy.limit,
        });
        const skillsListDataResponse = await apiCall(apiConstants.skillList, { loader: true, queryParams, });
        if (skillsListDataResponse?.data?.data.length > 0 && skillsListDataResponse?.data?.data && Array.isArray(skillsListDataResponse?.data?.data)) {
            setSkillsList(skillsListDataResponse?.data?.data);
            setPageCount(skillsListDataResponse.data.total);
        }
    };

    const handleDownload = async () => {
        const skillsExportDataResponse = await apiCall(apiConstants.exportSkill, { loader: true });
        if (skillsExportDataResponse?.status === 200) {
            notify.success(skillsExportDataResponse?.message)
            return;
        } else if (skillsExportDataResponse?.status === 400) {
            notify.error(skillsExportDataResponse?.message || constantText.SOMETHING_WENT_WRONG)
            return;
        }
        notify.error(constantText.SOMETHING_WENT_WRONG);
    }

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
                                                    <th colSpan={2} className="px-6 py-3 not-italic font-medium text-xs leading-4 tracking-wider uppercase text-white">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {skillsList.length > 0 && skillsList.map((item, index) => (
                                                    <tr key={index}>
                                                        <td className="px-6 py-3 not-italic font-medium text-sm leading-5 tracking-wider">{item?.name}</td>
                                                        <td><button
                                                            type="button"
                                                            className="flex flex-row justify-center items-center shadow-[0px_1px_2px_rgba(0,0,0,0.05)] px-[17px] py-[9px] rounded-md border-solid not-italic font-medium text-sm leading-5 border-transparent  bg-orange-500 text-white"
                                                            onClick={() => editSkillHandler(item.id)}
                                                        >
                                                            Edit
                                                        </button></td>
                                                        <td>
                                                            <button
                                                                type="button"
                                                                className="flex flex-row justify-center items-center shadow-[0px_1px_2px_rgba(0,0,0,0.05)] px-[17px] py-[9px] rounded-md border-solid not-italic font-medium text-sm leading-5 border-transparent  bg-orange-500 text-white"
                                                                onClick={() => deleteHandler(item.id)}
                                                            >
                                                                Delete
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                                {!skillsList.length > 0 && (
                                                    <tr>
                                                        <td colSpan={2} className="px-6 py-3 not-italic font-medium text-sm leading-5 tracking-wider">No data found</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                        <Pagination
                                            className="pagination-bar"
                                            siblingCount={0}
                                            totalCount={totalCount}
                                            page={skillFilter.page}
                                            limit={skillFilter.limit}
                                            currentPageCount={skillsList.length}
                                            onChangePage={(pageNumber) => onChangePage(pageNumber)}
                                            onChangePageLimit={(ev) => onChangeFilter(ev, "limit")}
                                        />
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