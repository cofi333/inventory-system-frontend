import { View } from "react-native";
import { LoginForm } from "../components";
import { globals } from "../styles/globals";
const LoginScreen = ({ navigation }) => {
    return (
        <View style={globals.container}>
            <LoginForm navigation={navigation} />
        </View>
    );
};

export default LoginScreen;
