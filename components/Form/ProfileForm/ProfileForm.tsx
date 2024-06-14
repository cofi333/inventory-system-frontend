import styles from "./ProfileForm.module.scss";
import { FormInput, FormSubmit } from "@/components";
import {
    PROFILE_FORM_INPUTS,
    PROFILE_INFORMATION_SCHEMA,
    API_ENDPOINT,
} from "@/utils/constants";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TProfileData } from "@/utils/types";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useToastMessage } from "@/utils/hooks";
import axiosInstance from "@/utils/axiosInstance";
import { useRecoilState } from "recoil";
import { userAtom } from "@/utils/atoms";
import { Skeleton } from "@chakra-ui/react";

const ProfileForm = ({ isLoadingData }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const showToast = useToastMessage();
    const [user, setUser] = useRecoilState(userAtom);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<TProfileData>({
        resolver: zodResolver(PROFILE_INFORMATION_SCHEMA),
        defaultValues: {
            phone_number: user.phoneNumber,
            company_id: user.company || "0",
        },
    });

    const onSubmit: SubmitHandler<TProfileData> = async (data) => {
        data.worker_id = user.userId;

        try {
            setIsLoading(true);
            const response = await axiosInstance.post(
                `${process.env.BASE_URL}${API_ENDPOINT.UPDATE_PROFILE_INFO}`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                }
            );

            switch (response.data.status) {
                case 200:
                    showToast("success", response.data.description);
                    setUser((prev) => ({
                        ...prev,
                        phoneNumber: data.phone_number,
                        company: data.company_id,
                    }));
                    setIsLoading(false);
                    break;
            }
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        setValue("phone_number", user.phoneNumber);
        setValue("company_id", user.company?.toString() || "0");
    }, [user, setValue]);

    return (
        <div className={styles.profile_form}>
            <div className={styles.profile_form_header}>
                <h3>Profile information</h3>
            </div>
            <div className={styles.profile_form_body}>
                <Form
                    onSubmit={handleSubmit(onSubmit)}
                    className={styles.profile_form_body_form}
                >
                    <div>
                        {PROFILE_FORM_INPUTS.map((input) => (
                            <div key={input.id}>
                                {isLoadingData ? (
                                    <Skeleton
                                        height="38px"
                                        marginBottom="20px"
                                        borderRadius="6px"
                                    />
                                ) : (
                                    <>
                                        <FormInput
                                            input={input}
                                            errors={errors}
                                            register={register}
                                        />
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                    {isLoadingData ? (
                        <Skeleton
                            width="80px"
                            height="38px"
                            borderRadius="6px"
                        />
                    ) : (
                        <FormSubmit isLoading={isLoading} value="Update" />
                    )}
                </Form>
            </div>
        </div>
    );
};

export default ProfileForm;
