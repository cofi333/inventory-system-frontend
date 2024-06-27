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
    status: Number;
    userEmail: string;
    userFullName: string;
    token: string;
    userId: Number;
    userRole: string;
    profilePicture: string | null;
};
