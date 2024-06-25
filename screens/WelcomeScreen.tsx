import { Text, Image, View } from "react-native";
import { images } from "../resources/images";
import { welcomeScreen, globals } from "../styles/globals";
import { PrimaryButton } from "../components";

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
                <PrimaryButton
                    title="Login"
                    onPress={() => navigation.navigate("Login")}
                />
                <PrimaryButton
                    title="Signup"
                    onPress={() => navigation.navigate("Signup")}
                />
            </View>
        </View>
    );
};

export default WelcomeScreen;
