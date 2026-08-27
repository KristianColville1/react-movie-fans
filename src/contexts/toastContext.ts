import React, { useContext } from "react";

export interface ToastContextInterface {
    triggerToast: (variant: string, title: string, message: string) => void;
}

const initialContextState: ToastContextInterface = {
    triggerToast: () => {},
};

export const ToastContext =
    React.createContext<ToastContextInterface>(initialContextState);

/**
 * Reads the toast context.
 *
 * @returns The trigger used to raise a toast.
 */
export const useToast = () => {
    return useContext(ToastContext);
};
