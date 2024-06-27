import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
    WelcomeScreen,
    LoginScreen,
    SignupScreen,
    MainScreen,
} from "./screens";
export default function App() {
    const Stack = createNativeStackNavigator();

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="WelcomeScreen"
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Signup" component={SignupScreen} />
                <Stack.Screen name="Main" component={MainScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
