import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { COLORS } from "../utils/constants";
import CameraScreen from "../screens/CameraScreen";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";

const MainScreen = () => {
    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarActiveBackgroundColor: COLORS.active_tab,
                tabBarStyle: {
                    backgroundColor: COLORS.button_primary,
                },
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: () => (
                        <MaterialCommunityIcons
                            name="home"
                            size={26}
                            color="#fff"
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="CameraScreen"
                component={CameraScreen}
                options={{
                    tabBarIcon: () => (
                        <MaterialCommunityIcons
                            name="qrcode-scan"
                            size={26}
                            color="#fff"
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="ProfileScreen"
                component={ProfileScreen}
                options={{
                    tabBarIcon: () => (
                        <MaterialCommunityIcons
                            name="account"
                            size={26}
                            color="#fff"
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default MainScreen;
