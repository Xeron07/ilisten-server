import React from "react";
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XCircleIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
const CustomAlert = (props) => {
  // const classNames=(...classes)=> {
  //   return classes.filter(Boolean).join(" ");
  // }
  const iconOfAlert = (type) => {
    switch (type) {
      case "success":
        return (
          <CheckCircleIcon
            className='h-5 w-5 text-green-400'
            ariaHidden='true'
          />
        );

      case "error":
        return (
          <XCircleIcon className='h-5 w-5 text-red-400' ariaHidden='true' />
        );
      case "info":
        return (
          <InformationCircleIcon
            className='h-5 w-5 text-blue-400'
            ariaHidden='true'
          />
        );
      case "warning":
        return (
          <ExclamationTriangleIcon
            className='h-5 w-5 text-yellow-400'
            ariaHidden='true'
          />
        );
      default:
        return (
          <CheckCircleIcon
            className='h-5 w-5 text-green-400'
            ariaHidden='true'
          />
        );
    }
  };

  const alertColor = (type) => {
    switch (type) {
      case "success":
        return "green";
      case "error":
        return "red";
      case "info":
        return "blue";
      case "warning":
        return "yellow";
      default:
        return "green";
    }
  };
  return (
    <>
      <div
        className={`rounded-md bg-${alertColor(props.variant)}-50 p-4 ${
          props.open ? "block" : "hidden"
        } `}>
        <div className='flex'>
          <div className='flex-shrink-0'>{iconOfAlert(props.variant)}</div>
          <div className='ml-3'>
            <p
              className={`text-sm font-medium text-${alertColor(
                props.variant
              )}-800`}>
              {props.message}
            </p>
          </div>
          <div className='ml-auto pl-3'>
            <div className='-mx-1.5 -my-1.5'>
              <button
                type='button'
                onClick={props.handleClose}
                className={`inline-flex rounded-md bg-${alertColor(
                  props.variant
                )}-50 p-1.5 text-${alertColor(
                  props.variant
                )}-500 hover:bg-${alertColor(
                  props.variant
                )}-100 focus:outline-none focus:ring-2 focus:ring-${alertColor(
                  props.variant
                )}-600 focus:ring-offset-2 focus:ring-offset-green-50`}>
                <span className='sr-only'>Dismiss</span>
                <XMarkIcon className='h-5 w-5' aria-hidden='true' />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomAlert;
