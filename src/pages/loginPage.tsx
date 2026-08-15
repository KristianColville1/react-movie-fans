import React from "react";
import Grid from "@mui/material/Grid";
import AuthForm from "@organisms/authForm";

const LoginPage: React.FC = () => {
    return (
        <Grid container className="bg-jet-black p-4">
            <Grid item xs={12}>
                <AuthForm />
            </Grid>
        </Grid>
    );
};

export default LoginPage;
