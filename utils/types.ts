import { FlashMode } from "expo-camera";

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

export type TPrimaryButtonProps = {
    title: string;
    onPress: () => {};
    isLoading?: boolean;
};

export type TColors = {
    [key: string]: string;
};

export type TPhoto = {
    uri: string;
    base64?: string;
    width: number;
    height: number;
    exif?: any;
};

export type TCameraButton = {
    id: number;
    buttonFunction: () => void;
    disableIcon?: string;
    enableIcon: string;
    state?: FlashMode | boolean;
};
