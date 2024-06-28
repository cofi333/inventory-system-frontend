import { StyleSheet } from "react-native";
import { COLORS } from "../utils/constants";

export const globals = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        marginHorizontal: 20,
    },
    header: {
        fontSize: 25,
        marginBottom: 5,
        textAlign: "center",
    },
    header_second: {
        fontSize: 33,
    },
    text: {
        fontSize: 15,
        marginVertical: 5,
        textAlign: "center",
    },
    input: {
        marginVertical: 8,
        borderWidth: 1,
        borderRadius: 4,
        paddingHorizontal: 8,
        paddingVertical: 2,
        minWidth: "100%",
        fontSize: 12,
    },
    form: {
        marginVertical: 16,
    },
    line: {
        height: 2,
        width: 70,
        backgroundColor: COLORS.color_primary,
        marginVertical: 6,
    },
    text_line: {
        marginTop: 6,
        fontSize: 12,
    },
    link: {
        fontWeight: "700",
        textDecorationLine: "underline",
    },
});

export const welcomeScreen = StyleSheet.create({
    logo: {
        width: 200,
        height: 200,
        marginHorizontal: "auto",
    },
    buttons: {
        gap: 24,
        marginVertical: 40,
        width: "100%",
    },
});
