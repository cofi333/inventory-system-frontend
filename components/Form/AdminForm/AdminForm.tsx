import styles from "./AdminForm.module.scss";
import { LOGIN_INPUTS, LOGIN_SCHEMA, API_ENDPOINT } from "@/utils/constants";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { FormInput, FormSubmit } from "@/components";
import { useForm, SubmitHandler } from "react-hook-form";
import { TAdminLoginData } from "@/utils/types";
import { zodResolver } from "@hookform/resolvers/zod";
import axiosInstance from "@/utils/axiosInstance";
import { userAtom } from "@/utils/atoms";
import { useRecoilState } from "recoil";
import { useRouter } from "next/navigation";
import { useToastMessage } from "@/utils/hooks";

const AdminForm = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [user, setUser] = useRecoilState(userAtom);
    const router = useRouter();
    const showToast = useToastMessage();

    const {
        register: loginRegister,
        handleSubmit: handleSubmit,
        formState: { errors },
    } = useForm<TAdminLoginData>({ resolver: zodResolver(LOGIN_SCHEMA) });

    const onLoginSubmit: SubmitHandler<TAdminLoginData> = async (data) => {
        try {
            setIsLoading(true);
            const response = await axiosInstance.post(
                `${process.env.BASE_URL}${API_ENDPOINT.ADMIN_LOGIN}`,
                data
            );

            console.log(response);

            switch (response.data.status) {
                case 200:
                    const userInformations = {
                        userId: response.data.userId,
                        fullName: response.data.userEmail,
                        role: response.data.userRole,
                        token: response.data.token,
                    };

                    sessionStorage.setItem(
                        "user",
                        JSON.stringify(userInformations)
                    );

                    setUser((prev) => ({
                        ...prev,
                        approveLogin: true,
                    }));
                    router.push("/dashboard");
                    break;

                case 403:
                    showToast("error", response.data.description);
                    setIsLoading(false);
                    break;

                case 401:
                case 404:
                    showToast("error", response.data.description);
                    setIsLoading(false);

                    break;
                default:
                    setIsLoading(false);
            }
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.admin}>
            <div className={styles.admin_header}>
                <h1>IMS Admin</h1>
            </div>
            <div className={styles.admin_form}>
                <Form onSubmit={handleSubmit(onLoginSubmit)}>
                    {LOGIN_INPUTS.map((input) => (
                        <FormInput
                            key={input.id}
                            input={input}
                            errors={errors}
                            register={loginRegister}
                        />
                    ))}

                    <FormSubmit isLoading={isLoading} value="Submit" />
                </Form>
            </div>
        </div>
    );
};

export default AdminForm;
