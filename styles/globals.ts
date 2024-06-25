import { StyleSheet } from "react-native";

export const globals = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 20,
    },
    header: {
        fontSize: 25,
        marginBottom: 5,
        textAlign: "center",
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
        paddingVertical: 4,
        minWidth: "100%",
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
