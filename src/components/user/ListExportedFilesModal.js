import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { constantText } from "../../utils/constants/ConstantText";
import ImageUrls from "../../utils/constants/ImageUrls";
import { apiCall } from "../../utils/services/api/api";
import { apiConstants } from "../../utils/services/api/apiEndpoints";
import { notify } from "../../utils/services/notify/notify";
import { createQueryParams } from "../../utils/Utils";
import Pagination from "../common/pagination/Pagination";

export const ListExportedFilesModal = ({ closeExportFilesListModal = () => { }, showListExportedFiles = false }) => {

    const [exportedFilesList, setExportedFilesList] = useState([]);
    const [downloadsFileFilter, setDownloadsFileFilter] = useState({
        page: 1,
        limit: 1,
    });
    const [totalCount, setPageCount] = useState(0);

    useEffect(() => {
        getExportedList();

    }, [downloadsFileFilter]);

    const getExportedList = async () => {
        const downloadsFileFilterCopy = { ...downloadsFileFilter };
        const queryParams = createQueryParams({
            page: downloadsFileFilterCopy.page,
            limit: downloadsFileFilterCopy.limit,
        });
        const exportedFilesListDataResponse = await apiCall(apiConstants.downloadFileList, {
            loader: true
            , queryParams,
        });
        if (exportedFilesListDataResponse?.data?.data.length > 0 && exportedFilesListDataResponse?.data?.data && Array.isArray(exportedFilesListDataResponse?.data?.data)) {
            setExportedFilesList(exportedFilesListDataResponse?.data?.data);
            setPageCount(exportedFilesListDataResponse.data.total);
        }
    };

    const onChangeFilter = (ev, type) => {
        const data = {
            ...downloadsFileFilter,
            [type]: ev.target.value,
        };
        data.page = 1;
        setDownloadsFileFilter(data);
    };

    const onChangePage = (pageNumber) => {
        const data = { ...downloadsFileFilter, page: pageNumber };
        setDownloadsFileFilter(data);
    };


    return (<>
        <Transition appear show={showListExportedFiles} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeExportFilesListModal}>
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
                                            Exported Files
                                        </Dialog.Title>
                                        <figure className="cursor-pointer" onClick={closeExportFilesListModal}>
                                            <img src={ImageUrls.close} alt="close" />
                                        </figure>
                                    </div>
                                </header>
                                <div className="py-8 border border-[1px_0px_solid_#E5E7EB]">
                                    <section className="mx-8">
                                        <table className="box-border border border shadow-[0px_1px_3px_rgba(0,0,0,0.1),0px_1px_2px_rgba(0,0,0,0.06)] rounded-lg border-solid">
                                            <thead className="bg-orange-500 text-center">
                                                <tr>
                                                    <th className="px-6 py-3 not-italic font-medium text-xs leading-4 tracking-wider uppercase text-white">Name</th>
                                                    <th className="px-6 py-3 not-italic font-medium text-xs leading-4 tracking-wider uppercase text-white">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {exportedFilesList.length > 0 && exportedFilesList.map((item, index) => (
                                                    <tr key={index}>
                                                        <td className="px-6 py-3 not-italic font-medium text-sm leading-5 tracking-wider">{item?.filename}</td>
                                                        <td><a
                                                            href={item.filepath}
                                                            className="flex flex-row justify-center items-center shadow-[0px_1px_2px_rgba(0,0,0,0.05)] px-[17px] py-[9px] rounded-md border-solid not-italic font-medium text-sm leading-5 border-transparent  bg-orange-500 text-white"
                                                            target="_blank"
                                                        >
                                                            Download
                                                        </a></td>
                                                    </tr>
                                                ))}
                                                {!exportedFilesList.length > 0 && (
                                                    <tr>
                                                        <td colSpan={2} className="px-6 py-3 not-italic font-medium text-sm leading-5 tracking-wider">No data found</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                            <Pagination
                                                className="pagination-bar"
                                                siblingCount={0}
                                                totalCount={totalCount}
                                                page={downloadsFileFilter.page}
                                                limit={downloadsFileFilter.limit}
                                                currentPageCount={exportedFilesList.length}
                                                onChangePage={(pageNumber) => onChangePage(pageNumber)}
                                                onChangePageLimit={(ev) => onChangeFilter(ev, "limit")}
                                            />
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