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

const palette: Record<string, string> = {
    success: "bg-ocean-mist text-jet-black",
    error: "bg-magenta-bloom text-jet-black",
    warning: "bg-pale-amber text-jet-black",
    info: "bg-slate-700 text-white",
};

const lifetime = 3000;

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

            <div className="fixed top-20 left-1/2 z-50 flex w-80 max-w-[calc(100vw-2rem)] -translate-x-1/2 flex-col items-center gap-2">
                {toasts.map((toast) => {
                    const severity = severities[toast.variant] ?? "info";
                    return (
                    <Alert
                        key={toast.id}
                        variant="filled"
                        severity={severity}
                        onClose={() => dismiss(toast.id)}
                        className={`w-full rounded-xl shadow-lg shadow-black/40 ${palette[severity]} [&_.MuiAlert-action_button]:text-inherit [&_.MuiAlert-icon]:text-inherit`}
                    >
                        <AlertTitle className="font-semibold">
                            {toast.title}
                        </AlertTitle>
                        {toast.message}
                    </Alert>
                    );
                })}
            </div>
        </ToastContext.Provider>
    );
};

export default ToastContextProvider;
