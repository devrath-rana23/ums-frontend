import { useState } from "react";
import { apiCall } from "../../utils/services/api/api";
import { apiConstants } from "../../utils/services/api/apiEndpoints";
import { notify } from "../../utils/services/notify/notify";
import { constantText } from "../../utils/constants/ConstantText";
import { permissionConstants } from "../../utils/constants/PermissionConstants";

const InputCompo = ({ data, closeModal, rerenderUsers }) => {
  const [name, setName] = useState(data?.name ?? "");
  const [role, setRole] = useState(data?.role ?? "");
  const [email, setEmail] = useState(data?.email ?? "");
  const [status, setStatus] = useState(data?.status ?? "");

  const sumbitHandler = async () => {
    const addUser = await apiCall(apiConstants.createUser, {
      loader: true,
      body: { name, role, email },
    });
    if (addUser.status === 200) {
      closeModal();
      notify.success("User Created  successfully.");
      rerenderUsers(true);
    } else if (addUser.status === 404 && addUser.message) {
      console.log(addUser)
      if (addUser.message.name && Array.isArray(addUser.message.name)) {
        notify.error(addUser.message.name[0]);
      } else if (addUser.message.email && Array.isArray(addUser.message.email)) {
        notify.error(addUser.message.email[0]);
      } else if (addUser.message.role && Array.isArray(addUser.message.role)) {
        notify.error(addUser.message.role[0]);
      } else {
        notify.error(addUser.message);
      }
    } else {
      notify.error("sometihng went wrong...");
    }
  };

  const updateHandler = async () => {
    // console.log("update", name, role, email, status);
    const updateUser = await apiCall(apiConstants.updateUser, {
      loader: true,
      body: { status, role, user_id: data.id },
    });
    if (updateUser.status === 200) {
      closeModal();
      notify.success("User updated  successfully.");
      rerenderUsers(true);
    } else {
      notify.error("sometihng went wrong...");
    }
  };

  const modelClose = () => {
    closeModal();
  };

  return (
    <div className=" py-6 flex flex-col justify-center  ">
      <label className="text-gray-400 my-1">Name</label>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        className="p-2 mb-2 outline-none border rounded-md"
        readOnly={data.name ? true : false}
      />
      <label className="text-gray-400 my-1">Email</label>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="p-2 mb-2 outline-none border rounded-md"
        readOnly={data.email ? true : false}
      />
      <label className="text-gray-400 my-1">Role</label>
      <select
        className="border mb-2  w-full outline-none text-left text-base leading-6 text-gray-500 font-normal placeholder:mr-3 border-gray-300 h-10 py-1 px-3 rounded-md capitalize"
        onChange={(e) => setRole(e.target.value)}
      >
        <option selected value={role}>
          {role && constantText[role] ? constantText[role] : "Select role"}
        </option>
        {[{ name: permissionConstants.admin }, { name: permissionConstants.pm }, { name: permissionConstants.superadmin }]?.map(
          (optionValue, optionIndex) => (
            <option key={optionIndex} value={optionValue.name}>
              {constantText[optionValue.name] || "--"}
            </option>
          )
        )}
      </select>
      {data?.name ? (
        <>
          <label className="text-gray-400 my-1">Status</label>
          <select
            className="border  w-full outline-none text-left text-base leading-6 text-gray-500 font-normal placeholder:mr-3 border-gray-300 h-10 py-1 px-3 rounded-md "
            onChange={(e) => setStatus(e.target.value)}
          >
            <option selected value={status}>
              {status === 0 || status === 1 ? (Boolean(status) ? constantText.active : constantText.inActive) : "Select status"}
            </option>
            {[{ name: 1 }, { name: 0 }]?.map(
              (optionValue, optionIndex) => (
                <option key={optionIndex} value={optionValue.name}>
                  {Boolean(optionValue.name) ? constantText.active : constantText.inActive}
                </option>
              )
            )}
          </select>
        </>
      ) : null}

      <div className="mt-10 flex justify-between">
        <button onClick={modelClose} className="border p-2 rounded-md w-36 ">
          <p className="text-sm leading-5 font-medium font-inter">Cancel</p>
        </button>
        <button
          onClick={data.name ? updateHandler : sumbitHandler}
          className="border bg-indigo-600 p-2 rounded-md w-36"
        >
          <p className="text-sm leading-5 font-medium font-inter text-white">{data?.name ? "UPDATE" : "ADD"}</p>
        </button>
      </div>
    </div>
  );
};

export default InputCompo;
