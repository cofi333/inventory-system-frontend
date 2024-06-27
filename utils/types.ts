import { ReactElement } from "react";

export type TApiEndpoints = {
    [key: string]: string;
};

export type TInputs = {
    id: number;
    label: string;
    name: string;
    type: string;
    placeholder?: string;
};

export type TUser = {
    status: number;
    userEmail: string;
    userFullName: string;
    token: string;
    userId: number;
    userRole: string;
    profilePicture: string | null;
};

export type TScreens = {
    id: number;
    component: React.FC;
    name: string;
    icon?: string;
};
