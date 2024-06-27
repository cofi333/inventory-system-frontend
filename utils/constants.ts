import { TApiEndpoints, TInputs, TScreens } from "./types";
import { z } from "zod";
import CameraScreen from "../screens/CameraScreen";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";

export const COLORS = {
    button_primary: "#202930",
    button_text: "#fff",
    active_tab: "#52697a",
};

export const API_ENDPOINT: TApiEndpoints = {
    LOGIN: "Users/LoginUser",
    REGISTER: "Users/RegisterUser",
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

export const TAB_SCREENS: TScreens[] = [
    {
        id: 1,
        component: HomeScreen,
        name: "Home",
        icon: "home",
    },

    {
        id: 2,
        component: CameraScreen,
        name: "CameraScreen",
        icon: "qrcode-scan",
    },

    {
        id: 3,
        component: ProfileScreen,
        name: "ProfileScreen",
        icon: "account",
    },
];
