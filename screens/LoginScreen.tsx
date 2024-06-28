import { View, Text } from "react-native";
import { LoginForm, ForgotPasswordForm } from "../components";
import { globals } from "../styles/globals";
import { useState } from "react";
import { StyleSheet } from "react-native";
import Toast from "react-native-toast-message";

const LoginScreen = ({ navigation }) => {
    const [forgotPassword, setForgotPassword] = useState<boolean>(false);

    return (
        <>
            <View style={globals.container}>
                <Text style={globals.header_second}>Login</Text>
                {forgotPassword ? (
                    <Text style={globals.text_line}>
                        To change your password, please enter your email.
                    </Text>
                ) : (
                    <Text style={globals.text_line}>
                        If you are first time using our system, you need to{" "}
                        <Text
                            onPress={() => navigation.navigate("Signup")}
                            style={globals.link}
                        >
                            sign up.
                        </Text>
                    </Text>
                )}

                {forgotPassword ? (
                    <ForgotPasswordForm />
                ) : (
                    <LoginForm navigation={navigation} />
                )}
                <Text
                    style={[styles.link, forgotPassword && styles.link_active]}
                    onPress={() => setForgotPassword((prev) => !prev)}
                >
                    Forgot password?
                </Text>
            </View>
            <Toast />
        </>
    );
};

const styles = StyleSheet.create({
    link: {
        marginTop: 16,
        fontWeight: "300",
        fontSize: 12,
    },
    link_active: {
        textDecorationLine: "underline",
        fontWeight: "700",
    },
});

export default LoginScreen;
