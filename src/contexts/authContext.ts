import React from "react";
import { Session, User } from "@supabase/supabase-js";

export interface AuthContextInterface {
    session: Session | null;
    user: User | null;
    isLoading: boolean;
    signUp: (email: string, password: string) => Promise<string | null>;
    signIn: (email: string, password: string) => Promise<string | null>;
    signOut: () => Promise<void>;
    updateDisplayName: (displayName: string) => Promise<string | null>;
    updatePassword: (password: string) => Promise<string | null>;
}

const initialContextState: AuthContextInterface = {
    session: null,
    user: null,
    isLoading: true,
    signUp: async () => null,
    signIn: async () => null,
    signOut: async () => {},
    updateDisplayName: async () => null,
    updatePassword: async () => null,
};

export const AuthContext =
    React.createContext<AuthContextInterface>(initialContextState);
