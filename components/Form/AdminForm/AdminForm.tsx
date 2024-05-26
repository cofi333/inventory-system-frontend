import styles from "./AdminForm.module.scss";
import { LOGIN_INPUTS, LOGIN_SCHEMA } from "@/utils/constants";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { FormInput, FormSubmit } from "@/components";
import { useForm, SubmitHandler } from "react-hook-form";
import { TLoginData } from "@/utils/types";
import { zodResolver } from "@hookform/resolvers/zod";

const AdminForm = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const {
        register: loginRegister,
        handleSubmit: handleSubmit,
        formState: { errors },
    } = useForm<TLoginData>({ resolver: zodResolver(LOGIN_SCHEMA) });

    const onLoginSubmit: SubmitHandler<TLoginData> = async (data) => {};

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
