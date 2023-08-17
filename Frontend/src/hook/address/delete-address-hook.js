import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteAddress } from "../../redux/actions/addressAction";

const DeleteAddressHook = (address) => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const cancelButtonRef = useRef(null);

  const handelDelete = async () => {
    await dispatch(deleteAddress(address._id));
    setOpen(false);
    window.location.reload(false);
  };

  return [open, setOpen, cancelButtonRef, handelDelete];
};

export default DeleteAddressHook;
