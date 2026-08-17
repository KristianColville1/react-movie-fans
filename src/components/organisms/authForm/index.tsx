import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "@contexts/authContext";

const fieldStyle = "mb-4 w-full";
const inputStyle = "rounded-t bg-white/95 text-jet-black";
const labelStyle = "text-jet-black/70";

/**
 * Sign in and sign up on one form. Which one it does is a toggle rather than
 * a separate page, because the two differ only in which call is made.
 *
 * @returns JSX.Element
 */
const AuthForm: React.FC = () => {
    const { signIn, signUp } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [isRegistering, setIsRegistering] = useState(false);
    const [failure, setFailure] = useState<string | null>(null);
    const [registered, setRegistered] = useState(false);

    const {
        control,
        formState: { errors, isSubmitting },
        handleSubmit,
    } = useForm<{ email: string; password: string }>({
        defaultValues: { email: "", password: "" },
    });

    // A private route sends people here with where they were headed, so a
    // successful sign in can carry them on instead of dumping them home.
    const state = location.state as { from?: { pathname: string } } | null;
    const destination = state?.from?.pathname || "/";

    const onSubmit: SubmitHandler<{ email: string; password: string }> = async ({
        email,
        password,
    }) => {
        setFailure(null);
        const message = isRegistering
            ? await signUp(email, password)
            : await signIn(email, password);

        if (message) {
            setFailure(message);
            return;
        }

        if (isRegistering) {
            setRegistered(true);
            return;
        }

        navigate(destination, { replace: true });
    };

    return (
        <Box className="mx-auto mt-10 max-w-md rounded-xl bg-surface p-6 text-navajo-white">
            <Typography variant="h4" component="h2" className="mb-4">
                {isRegistering ? "Create an account" : "Sign in"}
            </Typography>

            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                open={registered}
                onClose={() => setRegistered(false)}
                autoHideDuration={6000}
            >
                <Alert severity="success" onClose={() => setRegistered(false)}>
                    Account created. You can sign in now.
                </Alert>
            </Snackbar>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <Controller
                    name="email"
                    control={control}
                    rules={{
                        required: "Email is required",
                        pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: "That does not look like an email",
                        },
                    }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            className={fieldStyle}
                            InputProps={{ className: inputStyle }}
                            InputLabelProps={{ className: labelStyle }}
                            variant="filled"
                            label="Email"
                            id="auth-email"
                            type="email"
                        />
                    )}
                />
                {errors.email && (
                    <Typography variant="body2" className="mb-2 text-red-400">
                        {errors.email.message}
                    </Typography>
                )}

                <Controller
                    name="password"
                    control={control}
                    rules={{
                        required: "Password is required",
                        minLength: {
                            value: 6,
                            message: "Password must be at least six characters",
                        },
                    }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            className={fieldStyle}
                            InputProps={{ className: inputStyle }}
                            InputLabelProps={{ className: labelStyle }}
                            variant="filled"
                            label="Password"
                            id="auth-password"
                            type="password"
                        />
                    )}
                />
                {errors.password && (
                    <Typography variant="body2" className="mb-2 text-red-400">
                        {errors.password.message}
                    </Typography>
                )}

                {failure && (
                    <Typography
                        variant="body2"
                        role="alert"
                        className="mb-3 text-red-400"
                    >
                        {failure}
                    </Typography>
                )}

                <Box className="flex items-center gap-3">
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={isSubmitting}
                        className="bg-magenta-bloom font-semibold text-jet-black hover:bg-magenta-bloom/90"
                    >
                        {isRegistering ? "Sign up" : "Sign in"}
                    </Button>
                    <Button
                        type="button"
                        variant="text"
                        className="text-ocean-mist hover:bg-ocean-mist/10"
                        onClick={() => {
                            setIsRegistering(!isRegistering);
                            setFailure(null);
                        }}
                    >
                        {isRegistering
                            ? "I already have an account"
                            : "Create an account"}
                    </Button>
                </Box>
            </form>
        </Box>
    );
};

export default AuthForm;
