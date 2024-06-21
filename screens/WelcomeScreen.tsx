import { Text, Image, View, Button } from "react-native";
import { images } from "../resources/images";
import { welcomeScreen, globals } from "../styles/globals";
import { colors } from "../utils/constants";

const WelcomeScreen = ({ navigation }) => {
    return (
        <View style={globals.container}>
            <View>
                <Image source={images.logo} style={welcomeScreen.logo} />
            </View>
            <View>
                <Text style={globals.header}>Welcome to IMS application</Text>
                <Text style={globals.text}>
                    Our Inventory Management System is designed to empower you
                    with efficient tools to streamline and optimize your
                    inventory processes.
                </Text>
            </View>
            <View style={welcomeScreen.buttons}>
                <Button
                    title="Login"
                    color={colors.button_primary}
                    onPress={() => navigation.navigate("Login")}
                />
                <Button
                    title="Signup"
                    color={colors.button_primary}
                    onPress={() => navigation.navigate("Signup")}
                />
            </View>
        </View>
    );
};

export default WelcomeScreen;
