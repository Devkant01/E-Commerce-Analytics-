import { atom } from "recoil";

export const monthAtom = atom({
    key: "month",
    default: "March",
});

export const path = atom({
    key: "path",
    default: ["/statistics", "/"]
})