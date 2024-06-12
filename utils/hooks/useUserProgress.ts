import React from "react";
import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { userAtom } from "../atoms";

const useUserProgress = () => {
    const [progress, setProgress] = useState<number>();
    const [user, setUser] = useRecoilState(userAtom);

    const userStatus = {
        image: user.picture ? 1 : 0,
        information: user.phoneNumber && user.company ? 1 : 0,
    };

    useEffect(() => {
        const finalProgress =
            ((userStatus.image + userStatus.information) * 100) / 2;
        setProgress(finalProgress);
    }, [userStatus]);

    return { progress, userStatus };
};

export default useUserProgress;
