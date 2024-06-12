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

const page = () => {
    const [user, setUser] = useRecoilState(userAtom);
    const [companies, setCompanies] = useRecoilState(compainesAtom);

    const getUserInfo = async () => {
        try {
            const response = await axiosInstance.get(
                `${process.env.BASE_URL}${API_ENDPOINT.GET_USER_INFO}/${user.userId}`,
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                }
            );

            setUser((prev) => ({
                ...prev,
                company: String(response.data.userInfo.company_id),
                phoneNumber: response.data.userInfo.phone_number,
            }));
            setCompanies(response.data.companies);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getUserInfo();
    }, []);

    return (
        <div className={styles.profile}>
            <DashboardHeader title="Profile" />
            <div className={styles.profile_body}>
                <div className={styles.profile_body_top}>
                    <ProfilePhoto />
                    <ProfileProgress />
                </div>
                <div className={styles.profile_body_bottom}>
                    <ProfileForm />
                    <ProfilePasswordForm />
                </div>
            </div>
        </div>
    );
};

export default page;
