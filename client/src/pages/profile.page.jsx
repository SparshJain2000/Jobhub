import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { useLocation } from "react-router-dom";
const Profile = () => {
    const location = useLocation();
    const history = useHistory();
    const [isEmployer, setIsEmployer] = useState(
        location.pathname.split("/")[1] === "employer",
    );
    history.listen((location, action) =>
        setIsEmployer(location.pathname.split("/")[1] === "employer"),
    );
    return (
        <>
            <div className='p-3 bg-white'>
                <h3 className='text-align-center'>
                    Profile {isEmployer ? "Employer " : "Professional"}
                </h3>
            </div>
        </>
    );
};
export default Profile;
