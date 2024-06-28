import { Pressable, Text, ActivityIndicator } from "react-native";
import { COLORS } from "../utils/constants";
import { StyleSheet } from "react-native";
import { TPrimaryButtonProps } from "../utils/types";

const PrimaryButton = ({ title, onPress, isLoading }: TPrimaryButtonProps) => {
    return (
        <Pressable onPress={onPress} style={button.background}>
            {isLoading ? (
                <ActivityIndicator size="small" color="#fff" />
            ) : (
                <Text style={button.text}>{title}</Text>
            )}
        </Pressable>
    );
};

const button = StyleSheet.create({
    text: {
        color: COLORS.button_text,
        textAlign: "center",
        fontSize: 14,
    },
    background: {
        backgroundColor: COLORS.color_primary,
        padding: 8,
        borderRadius: 4,
    },
});

export default PrimaryButton;
