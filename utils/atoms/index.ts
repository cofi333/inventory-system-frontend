import { atom } from "recoil";
import { TCompanies, TItem } from "@/utils/types";

export const userAtom = atom({
    key: "User",
    default: {
        approveLogin: false,
        userId: 0,
        fullName: "",
        picture: "",
        token: "",
        role: "",
        email: "",
        company: "",
        phoneNumber: "",
    },
});

export const itemsRoomsAtom = atom({
    key: "Items and rooms",
    default: {
        items: [] as TItem[],
        rooms: [],
    },
});

export const compainesAtom = atom({
    key: "Companies",
    default: [] as TCompanies[],
});
