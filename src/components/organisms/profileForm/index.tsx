import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useForm, Controller, SubmitHandler } from "react-hook-form";

const fieldStyle = "mb-4 w-full";
const inputStyle = "rounded-t bg-white/95 text-jet-black";
const labelStyle = "text-jet-black/70";
const sectionStyle = "mb-6 rounded-xl bg-surface p-6 text-navajo-white";

/**
 * Account settings, split into the display name and the password. Both
 * handlers return an error message or null, the same as the auth context.
 *
 * @param email The address the account signs in with.
 * @param displayName The name currently saved, empty when there is none.
 * @param onSaveName Saves a new display name.
 * @param onChangePassword Sets a new password.
 * @returns JSX.Element
 */
const ProfileForm: React.FC<{
    email: string;
    displayName: string;
    onSaveName: (displayName: string) => Promise<string | null>;
    onChangePassword: (password: string) => Promise<string | null>;
}> = ({ email, displayName, onSaveName, onChangePassword }) => {
    const [failure, setFailure] = useState<string | null>(null);
    const [saved, setSaved] = useState<string | null>(null);

    const nameForm = useForm<{ displayName: string }>({
        defaultValues: { displayName },
    });
    const passwordForm = useForm<{ password: string }>({
        defaultValues: { password: "" },
    });

    const submitName: SubmitHandler<{ displayName: string }> = async (
        values,
    ) => {
        setFailure(null);
        const message = await onSaveName(values.displayName);
        if (message) {
            setFailure(message);
            return;
        }
        setSaved("Display name saved.");
    };

    const submitPassword: SubmitHandler<{ password: string }> = async (
        values,
    ) => {
        setFailure(null);
        const message = await onChangePassword(values.password);
        if (message) {
            setFailure(message);
            return;
        }
        passwordForm.reset({ password: "" });
        setSaved("Password changed.");
    };

    return (
        <Box className="mx-auto mt-10 max-w-md">
            <Typography variant="h4" component="h2" className="mb-4">
                Profile
            </Typography>

            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                open={saved !== null}
                onClose={() => setSaved(null)}
                autoHideDuration={6000}
            >
                <Alert severity="success" onClose={() => setSaved(null)}>
                    {saved}
                </Alert>
            </Snackbar>

            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                open={failure !== null}
                onClose={() => setFailure(null)}
                autoHideDuration={6000}
            >
                <Alert severity="error" onClose={() => setFailure(null)}>
                    {failure}
                </Alert>
            </Snackbar>

            <Box
                component="form"
                className={sectionStyle}
                onSubmit={nameForm.handleSubmit(submitName)}
            >
                <Typography variant="h6" component="h3" className="mb-1">
                    Your details
                </Typography>
                <Typography
                    variant="body2"
                    className="mb-4 text-navajo-white/70"
                >
                    Signed in as {email}
                </Typography>

                <Controller
                    name="displayName"
                    control={nameForm.control}
                    rules={{ required: "Enter a display name" }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Display name"
                            variant="filled"
                            className={fieldStyle}
                            InputProps={{ className: inputStyle }}
                            InputLabelProps={{ className: labelStyle }}
                            error={!!nameForm.formState.errors.displayName}
                            helperText={
                                nameForm.formState.errors.displayName?.message
                            }
                        />
                    )}
                />

                <Button
                    type="submit"
                    variant="contained"
                    disabled={nameForm.formState.isSubmitting}
                    className="bg-ocean-mist font-semibold text-jet-black hover:bg-ocean-mist/90"
                >
                    Save
                </Button>
            </Box>

            <Box
                component="form"
                className={sectionStyle}
                onSubmit={passwordForm.handleSubmit(submitPassword)}
            >
                <Typography variant="h6" component="h3" className="mb-4">
                    Change password
                </Typography>

                <Controller
                    name="password"
                    control={passwordForm.control}
                    rules={{
                        required: "Enter a new password",
                        minLength: {
                            value: 6,
                            message: "Use at least six characters",
                        },
                    }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            type="password"
                            label="New password"
                            variant="filled"
                            className={fieldStyle}
                            InputProps={{ className: inputStyle }}
                            InputLabelProps={{ className: labelStyle }}
                            error={!!passwordForm.formState.errors.password}
                            helperText={
                                passwordForm.formState.errors.password?.message
                            }
                        />
                    )}
                />

                <Button
                    type="submit"
                    variant="contained"
                    disabled={passwordForm.formState.isSubmitting}
                    className="bg-ocean-mist font-semibold text-jet-black hover:bg-ocean-mist/90"
                >
                    Change password
                </Button>
            </Box>
        </Box>
    );
};

export default ProfileForm;
