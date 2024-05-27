import styles from "./ProfilePasswordForm.module.scss";
import {
    PROFILE_PASSWORD_INPUTS,
    PASSWORD_PROFILE_SCHEMA,
    API_ENDPOINT,
} from "@/utils/constants";
import { Form } from "react-bootstrap";
import { FormInput, FormSubmit } from "@/components";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { TPasswordProfileData } from "@/utils/types";
import { zodResolver } from "@hookform/resolvers/zod";
import axiosInstance from "@/utils/axiosInstance";
import { useToastMessage } from "@/utils/hooks";
import { useRecoilState } from "recoil";
import { userAtom } from "@/utils/atoms";

const ProfilePasswordForm = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [user, setUser] = useRecoilState(userAtom);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<TPasswordProfileData>({
        resolver: zodResolver(PASSWORD_PROFILE_SCHEMA),
    });
    const showToast = useToastMessage();

    const onSubmit: SubmitHandler<TPasswordProfileData> = async (data) => {
        const { repeatNewPassword, ...newPasswordData } = data;
        newPasswordData.worker_id = user.userId;
        try {
            setIsLoading(true);
            const response = await axiosInstance.post(
                `${process.env.BASE_URL}${API_ENDPOINT.SET_NEW_PASSWORD}`,
                newPasswordData,
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                }
            );
            switch (response.data.status) {
                case 200:
                    showToast("success", response.data.description);
                    setIsLoading(false);
                    break;
                case 401:
                    showToast("error", response.data.description);
                    setIsLoading(false);
                    break;
                case 500:
                    showToast("error", response.data.message);
                    break;
                default:
                    setIsLoading(false);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.profile_password}>
            <div className={styles.profile_password_header}>
                <h3>Change password</h3>
            </div>

            <div className={styles.profile_password_body}>
                <Form
                    onSubmit={handleSubmit(onSubmit)}
                    className={styles.profile_password_body_form}
                >
                    {PROFILE_PASSWORD_INPUTS.map((input) => (
                        <FormInput
                            input={input}
                            register={register}
                            errors={errors}
                            key={input.id}
                        />
                    ))}
                    <FormSubmit isLoading={isLoading} value="Change" />
                </Form>
            </div>
        </div>
    );
};

export default ProfilePasswordForm;
