import styles from "./LoginForm.module.scss";
import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import {
    LOGIN_SCHEMA,
    FORGOT_PASSWORD_SCHEMA,
    API_ENDPOINT,
} from "@/utils/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { LOGIN_INPUTS, FORGOT_PASSWORD_INPUT } from "@/utils/constants";
import { useForm, SubmitHandler } from "react-hook-form";
import {
    TLoginData,
    TForgotPassword,
    TForgotPasswordState,
} from "@/utils/types";
import { userAtom } from "@/utils/atoms";
import { useRecoilState } from "recoil";
import { useRouter } from "next/navigation";
import { FormInput, FormSubmit } from "@/components";
import { useSearchParams } from "next/navigation";
import { userActionMessages } from "@/utils/functions";
import { useToastMessage } from "@/utils/hooks";
import axiosInstance from "@/utils/axiosInstance";

const LoginForm = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [user, setUser] = useRecoilState(userAtom);
    const [showForgotPassword, setShowForgotPassword] =
        useState<TForgotPasswordState>({
            button: false,
            form: false,
        });

    const showToast = useToastMessage();
    const router = useRouter();
    const searchParams = useSearchParams();
    const userActions = searchParams.get("status");

    useEffect(() => {
        userActionMessages(showToast, userActions);
    }, []);

    const {
        register: loginRegister,
        handleSubmit: handleLoginSubmit,
        formState: { errors },
    } = useForm<TLoginData>({ resolver: zodResolver(LOGIN_SCHEMA) });

    const {
        register: forgotRegister,
        handleSubmit: handleForgotSubmit,
        formState: { errors: forgotErrors },
    } = useForm<TForgotPassword>({
        resolver: zodResolver(FORGOT_PASSWORD_SCHEMA),
    });

    const onLoginSubmit: SubmitHandler<TLoginData> = async (data) => {
        try {
            setIsLoading(true);
            const response = await axiosInstance.post(
                `${process.env.BASE_URL}${API_ENDPOINT.LOGIN}`,
                data
            );

            switch (response.data.status) {
                case 200:
                    setIsLoading(true);
                    const userInformations = {
                        userId: response.data.userId,
                        fullName: response.data.userFullName,
                        email: response.data.userEmail,
                        picture: response.data.profilePicture,
                        token: response.data.token,
                        role: response.data.userRole,
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
                    setShowForgotPassword((prev) => ({
                        ...prev,
                        button: true,
                    }));
                    break;
                default:
                    setIsLoading(false);
            }
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };

    const onforgotSubmit: SubmitHandler<TForgotPassword> = async (data) => {
        try {
            setIsLoading(true);
            const response = await axiosInstance.post(
                `${process.env.BASE_URL}${API_ENDPOINT.FORGOT_PASSWORD_SEND_MAIL}`,
                data
            );
            showToast(
                "success",
                "If you have an account linked to this email, we have sent you instructions for resetting it in your inbox."
            );
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.form}>
            <div className={styles.form_header}>
                {showForgotPassword.form ? (
                    <>
                        <h1>Reset your password</h1>
                        <p>
                            If you have forgotten your password, don't worry!
                            You can change it by entering your email.
                        </p>
                    </>
                ) : (
                    <>
                        <h1>Login</h1>
                        <p>
                            Let's make every login count towards a seamlessly
                            organized inventory. Happy working!
                        </p>
                    </>
                )}
            </div>
            <Form
                onSubmit={
                    showForgotPassword.form
                        ? handleForgotSubmit(onforgotSubmit)
                        : handleLoginSubmit(onLoginSubmit)
                }
            >
                {showForgotPassword.form ? (
                    <FormInput
                        input={FORGOT_PASSWORD_INPUT}
                        errors={forgotErrors}
                        register={forgotRegister}
                    />
                ) : (
                    LOGIN_INPUTS.map((input) => (
                        <FormInput
                            key={input.id}
                            input={input}
                            errors={errors}
                            register={loginRegister}
                        />
                    ))
                )}

                <div className={styles.form_buttons}>
                    <FormSubmit isLoading={isLoading} value="Submit" />
                    {showForgotPassword.button && (
                        <Button
                            onClick={() =>
                                setShowForgotPassword({
                                    button: false,
                                    form: true,
                                })
                            }
                        >
                            Forgot password?
                        </Button>
                    )}
                    {showForgotPassword.form && (
                        <Button
                            onClick={() =>
                                setShowForgotPassword({
                                    button: false,
                                    form: false,
                                })
                            }
                        >
                            Back to login
                        </Button>
                    )}
                </div>
            </Form>
        </div>
    );
};

export default LoginForm;
