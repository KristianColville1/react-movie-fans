import React, { useContext } from "react";
import ProfileForm from "@organisms/profileForm";
import { AuthContext } from "@contexts/authContext";

/**
 * Account settings for the signed in user.
 *
 * @returns JSX.Element
 */
const ProfilePage: React.FC = () => {
    const { user, updateDisplayName, updatePassword } = useContext(AuthContext);

    return (
        <ProfileForm
            email={user?.email ?? ""}
            displayName={(user?.user_metadata?.display_name as string) ?? ""}
            onSaveName={updateDisplayName}
            onChangePassword={updatePassword}
        />
    );
};

export default ProfilePage;
