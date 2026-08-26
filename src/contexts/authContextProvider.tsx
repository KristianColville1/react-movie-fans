import React, { useState, useEffect, useCallback } from "react";
import { Session } from "@supabase/supabase-js";
import { AuthContext } from "@contexts/authContext";
import { supabase } from "@storage/supabaseClient";

const AuthContextProvider: React.FC<React.PropsWithChildren> = ({
    children,
}) => {
    const [session, setSession] = useState<Session | null>(null);
    // Starts true so a private route waits for the first session lookup
    // instead of bouncing a signed in user to the login page on refresh.
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let active = true;

        supabase.auth.getSession().then(({ data }) => {
            if (!active) {
                return;
            }
            setSession(data.session);
            setIsLoading(false);
        });

        const { data: listener } = supabase.auth.onAuthStateChange(
            (_event, newSession) => {
                setSession(newSession);
                setIsLoading(false);
            },
        );

        return () => {
            active = false;
            listener.subscription.unsubscribe();
        };
    }, []);

    // The three actions return an error message rather than throwing, so the
    // forms can show it without each one wrapping a try block.
    const signUp = useCallback(async (email: string, password: string) => {
        const { error } = await supabase.auth.signUp({ email, password });
        return error ? error.message : null;
    }, []);

    const signIn = useCallback(async (email: string, password: string) => {
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        return error ? error.message : null;
    }, []);

    const signOut = useCallback(async () => {
        await supabase.auth.signOut();
    }, []);

    // the display name lives in the auth user metadata, so there is no
    // profile table to keep in step with it
    const updateDisplayName = useCallback(async (displayName: string) => {
        const { error } = await supabase.auth.updateUser({
            data: { display_name: displayName },
        });
        return error ? error.message : null;
    }, []);

    const updatePassword = useCallback(async (password: string) => {
        const { error } = await supabase.auth.updateUser({ password });
        return error ? error.message : null;
    }, []);

    return (
        <AuthContext.Provider
            value={{
                session,
                user: session?.user ?? null,
                isLoading,
                signUp,
                signIn,
                signOut,
                updateDisplayName,
                updatePassword,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
