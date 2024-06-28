import { View, Text } from "react-native";
import { SignupForm } from "../components";
import { globals } from "../styles/globals";

const SignupScreen = ({ navigation }) => {
    return (
        <View style={globals.container}>
            <Text style={globals.header_second}>Sign up</Text>
            <Text style={globals.text_line}>
                If you already have an account, you can{" "}
                <Text
                    onPress={() => navigation.navigate("Login")}
                    style={globals.link}
                >
                    login.
                </Text>
            </Text>
            <SignupForm />
        </View>
    );
};

export default SignupScreen;
