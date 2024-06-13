"use client";
import styles from "@/styles/Profile.module.scss";
import {
    DashboardHeader,
    ProfileForm,
    ProfilePasswordForm,
    ProfilePhoto,
    ProfileProgress,
} from "@/components";
import axiosInstance from "@/utils/axiosInstance";
import { API_ENDPOINT } from "@/utils/constants";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { compainesAtom, userAtom } from "@/utils/atoms";
import { useState } from "react";

const page = () => {
    const [user, setUser] = useRecoilState(userAtom);
    const [companies, setCompanies] = useRecoilState(compainesAtom);
    const [isLoadingData, setIsLoadingData] = useState<boolean>(false);

    useEffect(() => {
        const getUserInfo = async () => {
            try {
                setIsLoadingData(true);
                const response = await axiosInstance.get(
                    `${process.env.BASE_URL}${API_ENDPOINT.GET_USER_INFO}/${user.userId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${user.token}`,
                        },
                    }
                );

                switch (response.data.status) {
                    case 200:
                        setUser((prev) => ({
                            ...prev,
                            company: String(response.data.userInfo.company_id),
                            phoneNumber: response.data.userInfo.phone_number,
                        }));
                        setCompanies(response.data.companies);
                        setIsLoadingData(false);
                        break;
                    default:
                        setIsLoadingData(false);
                }
            } catch (error) {
                console.log(error);
            }
        };
        getUserInfo();
    }, []);

    return (
        <div className={styles.profile}>
            <DashboardHeader title="Profile" />
            <div className={styles.profile_body}>
                <div className={styles.profile_body_top}>
                    <ProfilePhoto />
                    <ProfileProgress isLoadingData={isLoadingData} />
                </div>
                <div className={styles.profile_body_bottom}>
                    <ProfileForm isLoadingData={isLoadingData} />
                    <ProfilePasswordForm />
                </div>
            </div>
        </div>
    );
};

export default page;
