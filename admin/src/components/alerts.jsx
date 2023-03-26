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

  const alertColor = (variant, type, code) => {
    if (type === "bg") {
      switch (variant) {
        case "success":
          return `bg-green-50`;
        case "error":
          return `bg-red-50`;
        case "info":
          return `bg-blue-50`;
        case "warning":
          return `bg-yellow-50`;
        default:
          return `bg-green-50`;
      }
    } else if (type === "text") {
      switch (variant) {
        case "success":
          return `text-green-800`;
        case "error":
          return `text-red-800`;
        case "info":
          return `text-blue-800`;
        case "warning":
          return `text-yellow-800`;
        default:
          return `text-green-800`;
      }
    } else if (type === "ring") {
      switch (variant) {
        case "success":
          return `ring-green-600`;
        case "error":
          return `ring-red-600`;
        case "info":
          return `ring-blue-600`;
        case "warning":
          return `ring-yellow-600`;
        default:
          return `ring-green-600`;
      }
    } else if (type === "border") {
      switch (variant) {
        case "success":
          return `border-green-100`;
        case "error":
          return `border-red-100`;
        case "info":
          return `border-blue-100`;
        case "warning":
          return `border-yellow-100`;
        default:
          return `border-green-100`;
      }
    }
  };
  return (
    <>
      <div
        className={`rounded-md ${alertColor(
          props.variant,
          "bg",
          50
        )} border ${alertColor(props.variant, "border", 100)} p-4 ${
          props.open ? "block" : "hidden"
        } `}>
        <div className='flex'>
          <div className='flex-shrink-0'>{iconOfAlert(props.variant)}</div>
          <div className='ml-3'>
            <p
              className={`text-sm font-medium ${alertColor(
                props.variant,
                "text",
                800
              )}`}>
              {props.message}
            </p>
          </div>
          <div className='ml-auto pl-3'>
            <div className='-mx-1.5 -my-1.5'>
              <button
                type='button'
                onClick={props.handleClose}
                className={`inline-flex rounded-md ${alertColor(
                  props.variant,
                  "bg",
                  50
                )}  p-1.5 ${alertColor(
                  props.variant,
                  "text",
                  500
                )} hover:${alertColor(
                  props.variant,
                  "bg",
                  100
                )} focus:outline-none focus:ring-2 focus:${alertColor(
                  props.variant,
                  "ring",
                  600
                )} focus:ring-offset-2 focus:ring-offset-green-50`}>
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
