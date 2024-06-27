import { View } from "react-native";
import { SignupForm } from "../components";
import { globals } from "../styles/globals";

const SignupScreen = () => {
    return (
        <View style={globals.container}>
            <SignupForm />
        </View>
    );
};

export default SignupScreen;
