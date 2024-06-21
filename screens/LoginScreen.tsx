import { Text, View } from "react-native";
import { LoginForm } from "../components";
import { globals } from "../styles/globals";
const LoginScreen = () => {
    return (
        <View style={globals.container}>
            <LoginForm />
        </View>
    );
};

export default LoginScreen;
