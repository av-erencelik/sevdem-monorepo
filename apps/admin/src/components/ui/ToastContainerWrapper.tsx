"use client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
const ToastContainerWrapper = () => {
  return (
    <ToastContainer
      position="top-right"
      hideProgressBar={false}
      autoClose={3000}
      closeOnClick
      pauseOnHover
      theme="light"
    />
  );
};

export default ToastContainerWrapper;
