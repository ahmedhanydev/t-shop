import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { InputText } from "primereact/inputtext";
import UserProfileHook from "../../hook/user/user-profile-hook";
import { InputTextarea } from "primereact/inputtextarea";
const UserProfile = () => {
  const [
    user,
    open,
    setOpen,
    cancelButtonRef,
    handleSubmit,
    name,
    email,
    phone,
    onChangeName,
    onChangeEmail,
    onChangePhone,
    oldPassword,
    newPassword,
    confirmNewPassword,
    onChangeOldPassword,
    onChangeNewPassword,
    onChangeConfirmNewPassword,
    changePassword,
  ] = UserProfileHook();
  return (
    <div className="container mx-auto ">
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <ExclamationTriangleIcon
                          className="h-6 w-6 text-red-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          Edit User Info
                        </Dialog.Title>
                        <div className="flex flex-col gap-8 items-center mt-5   w-full">
                          <div className="">
                            <span className="p-float-label  ">
                              <InputText
                                id="name"
                                value={name}
                                className="w-full"
                                onChange={onChangeName}
                              />
                              <label htmlFor="name">Name</label>
                            </span>
                          </div>
                          <div className="">
                            <span className="p-float-label  ">
                              <InputText
                                id="email"
                                value={email}
                                type="email"
                                className="w-full"
                                onChange={onChangeEmail}
                              />
                              <label htmlFor="email">Email</label>
                            </span>
                          </div>

                          <div className="">
                            <input
                              value={phone}
                              id="phone"
                              mask="999-99999999"
                              onChange={onChangePhone}
                              className="w-full py-3 px-2 border-2 rounded-md  focus:outline-violet-300"
                              placeholder="Phone Number"
                            ></input>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                      onClick={() => {
                        setOpen(false);
                        handleSubmit();
                      }}
                    >
                      Save Changes
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>{" "}
      <div className="pl-5 mb-5">
        <h1 className="font-bold text-lg lg:text-xl">My Profile</h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-3  mx-5">
        <div className="bg-slate-200 pb-8 pt-3 relative px-5 rounded-lg">
          <div className="flex flex-col ">
            <p className=" text-base lg:text-lg  font-semibold pb-5">
              {" "}
              Name : <span className="text-gray-600">{user.name}</span>
            </p>
            <p className="text-base lg:text-lg font-semibold pb-5">
              {" "}
              Phone Number : <span className="text-gray-600">{user.phone}</span>
            </p>
            <p className="text-base lg:text-lg font-semibold ">
              {" "}
              Email : <span className="text-gray-600">{user.email}</span>
            </p>
          </div>
          <div className="absolute right-2 lg:right-8 top-3 flex gap-10">
            <button
              onClick={() => setOpen(true)}
              className="font-medium text-base lg:text-lg  text-indigo-500 hover:text-indigo-500"
            >
              Edit
            </button>
          </div>
        </div>
      </div>
      <div className="mt-8 ">
        <div className="pl-5 mb-5 flex justify-center">
          <h1 className="font-bold text-xl">Change Password </h1>
        </div>

        <div className="flex flex-col gap-8 items-center   ">
          <div className="w-1/2">
            <span className="p-float-label  ">
              <InputText
                id="oldPassword"
                value={oldPassword}
                className="w-full"
                type="password"
                onChange={onChangeOldPassword}
              />
              <label htmlFor="oldPassword">Old Password</label>
            </span>
          </div>
          <div className="w-1/2">
            <span className="p-float-label  ">
              <InputText
                id="newPassword"
                value={newPassword}
                className="w-full"
                type="password"
                onChange={onChangeNewPassword}
              />
              <label htmlFor="newPassword">New Password</label>
            </span>
          </div>
          <div className="w-1/2">
            <span className="p-float-label  ">
              <InputText
                id="confirmNewPassword"
                value={confirmNewPassword}
                className="w-full"
                type="password"
                onChange={onChangeConfirmNewPassword}
              />
              <label htmlFor="confirmNewPassword"> Confirm New Password</label>
            </span>
          </div>

          <button
            onClick={changePassword}
            className="bg-gray-900 hover:bg-gray-800 px-10 py-3 rounded-lg text-white font-semibold"
          >
            Save Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
