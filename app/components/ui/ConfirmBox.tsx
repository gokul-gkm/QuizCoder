"use client";

import { FiAlertTriangle } from "react-icons/fi";
import Button from "./Button";

interface ConfirmBoxProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmBox({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
}: ConfirmBoxProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-fade-in"
        onClick={onCancel}
      />

      <div className="flex min-h-full items-center justify-center p-4">
        <div
          className="relative transform overflow-hidden rounded-xl 
                     bg-gray-900/90 backdrop-blur-md border border-gray-700/50 
                     px-4 pb-4 pt-5 text-left shadow-xl transition-all 
                     sm:my-8 sm:w-full sm:max-w-md sm:p-6 animate-scale-up
                     ring-1 ring-inset ring-white/10"
        >
          <div className="sm:flex sm:items-start">
            <div
              className="mx-auto flex h-10 w-10 flex-shrink-0 items-center 
                         justify-center rounded-full bg-red-900/20 
                         sm:mx-0 sm:h-8 sm:w-8"
            >
              <FiAlertTriangle className="h-5 w-5 text-red-400" />
            </div>
            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
              <h3 className="text-base font-semibold leading-6 text-white">
                {title}
              </h3>
              <div className="mt-2">
                <p className="text-sm text-gray-300/80">{message}</p>
              </div>
            </div>
          </div>
          <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse gap-2">
            <Button
              variant="danger"
              onClick={onConfirm}
              className="w-full sm:w-auto text-sm px-3 py-1.5"
              size="sm"
            >
              Delete
            </Button>
            <Button
              variant="secondary"
              onClick={onCancel}
              className="w-full mt-2 sm:w-auto sm:mt-0 text-sm px-3 py-1.5"
              size="sm"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
