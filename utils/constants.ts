import { TApiEndpoints, TInputs } from "./types";
import { z } from "zod";

export const COLORS = {
    color_primary: "#202930",
    button_text: "#fff",
    active_tab: "#52697a",
};

export const API_ENDPOINT: TApiEndpoints = {
    LOGIN: "Users/LoginUser",
    REGISTER: "Users/RegisterUser",
    FORGOT_PASSWORD_SEND_MAIL: "Users/SendPasswordResetEmail",
};

export const LOGIN_INPUTS: TInputs[] = [
    {
        id: 1,
        label: "E-mail",
        name: "email",
        type: "email",
        placeholder: "Enter your email",
    },
    {
        id: 2,
        label: "Password",
        name: "password",
        type: "password",
        placeholder: "Enter your password",
    },
];

export const LOGIN_SCHEMA = z.object({
    email: z.string().email("Email is not valid."),
    password: z
        .string()
        .regex(
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            {
                message:
                    "Your password must contain minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character.",
            }
        ),
});

export const REGISTER_INPUTS: TInputs[] = [
    {
        id: 1,
        label: "First name",
        name: "firstName",
        type: "text",
        placeholder: "Enter your first name",
    },
    {
        id: 2,
        label: "Last name",
        name: "lastName",
        type: "text",
        placeholder: "Enter your last name",
    },
    {
        id: 3,
        label: "E-mail",
        name: "email",
        type: "email",
        placeholder: "Enter your e-mail",
    },
    {
        id: 4,
        label: "Password",
        name: "password",
        type: "password",
        placeholder: "Enter your password",
    },
    {
        id: 5,
        label: "Repeat your password",
        name: "repeatPassword",
        type: "password",
        placeholder: "Enter your password again",
    },
    {
        id: 6,
        label: "Phone number",
        name: "phoneNumber",
        type: "text",
        placeholder: "Enter your phone number",
    },
];

export const REGISTER_SCHEMA = z
    .object({
        firstName: z.string().min(3, {
            message: "First name must have at least three characters.",
        }),
        lastName: z.string().min(3, {
            message: "Last name must have at least three characters.",
        }),
        email: z.string().email("Email is not valid."),
        password: z
            .string()
            .regex(
                /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                {
                    message:
                        "Your password must contain minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character.",
                }
            ),
        repeatPassword: z.string(),
        phoneNumber: z.string().regex(/^\+(?:\d\s?){10,14}\d$/, {
            message: "Phone number must start with a '+' symbol.",
        }),
    })
    .refine((data) => data.password === data.repeatPassword, {
        message: "Passwords don't match.",
        path: ["repeatPassword"],
    });

export const FORGOT_PASSWORD_SCHEMA = z.object({
    email: z.string().email("Email is not valid."),
});
