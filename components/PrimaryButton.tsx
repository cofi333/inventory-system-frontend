import { Pressable, Text } from "react-native";
import { globals } from "../styles/globals";
import { COLORS } from "../utils/constants";
import { StyleSheet } from "react-native";

const PrimaryButton = ({ title, onPress }) => {
    return (
        <Pressable onPress={onPress} style={button.background}>
            <Text style={button.text}>{title}</Text>
        </Pressable>
    );
};

const button = StyleSheet.create({
    text: {
        color: COLORS.button_text,
        textAlign: "center",
    },
    background: {
        backgroundColor: COLORS.button_primary,
        padding: 8,
        borderRadius: 4,
    },
});

export default PrimaryButton;
