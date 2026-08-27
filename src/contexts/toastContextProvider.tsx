import React, { useState, useCallback } from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { ToastContext } from "@contexts/toastContext";

const severities: Record<string, "success" | "error" | "warning" | "info"> = {
    success: "success",
    danger: "error",
    error: "error",
    warning: "warning",
    info: "info",
    dark: "info",
};

const lifetime = 5500;

/**
 * Holds the toasts on screen and hands out the trigger that raises one. Each
 * toast clears itself after a few seconds, and can be closed sooner.
 *
 * @param children The tree that can raise toasts.
 * @returns JSX.Element
 */
const ToastContextProvider: React.FC<React.PropsWithChildren> = ({
    children,
}) => {
    const [toasts, setToasts] = useState<
        { id: number; variant: string; title: string; message: string }[]
    >([]);

    const dismiss = useCallback((id: number) => {
        setToasts((current) => current.filter((toast) => toast.id !== id));
    }, []);

    const triggerToast = useCallback(
        (variant: string, title: string, message: string) => {
            const id = Date.now() + Math.random();
            setToasts((current) => [
                ...current,
                { id, variant: variant.toLowerCase(), title, message },
            ]);
            setTimeout(() => dismiss(id), lifetime);
        },
        [dismiss],
    );

    return (
        <ToastContext.Provider value={{ triggerToast }}>
            {children}

            <div className="fixed top-20 right-4 z-50 flex w-80 max-w-[calc(100vw-2rem)] flex-col gap-2">
                {toasts.map((toast) => (
                    <Alert
                        key={toast.id}
                        variant="filled"
                        severity={severities[toast.variant] ?? "info"}
                        onClose={() => dismiss(toast.id)}
                        className="rounded-xl shadow-lg shadow-black/40"
                    >
                        <AlertTitle className="font-semibold">
                            {toast.title}
                        </AlertTitle>
                        {toast.message}
                    </Alert>
                ))}
            </div>
        </ToastContext.Provider>
    );
};

export default ToastContextProvider;
