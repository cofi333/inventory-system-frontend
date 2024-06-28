import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { COLORS } from "../utils/constants";
import CameraScreen from "../screens/CameraScreen";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { useEffect } from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MainScreen = ({ navigation }) => {
    const Tab = createBottomTabNavigator();

    useEffect(() => {
        const beforeRemoveListener = (e) => {
            e.preventDefault();
            Alert.alert("Logout?", "Are you sure you want to log out?", [
                { text: "Cancel", onPress: () => {} },
                {
                    text: "Logout",
                    onPress: async () => {
                        navigation.dispatch(e.data.action);
                        await AsyncStorage.removeItem("user");
                    },
                },
            ]);
        };

        navigation.addListener("beforeRemove", beforeRemoveListener);

        return () => {
            navigation.removeListener("beforeRemove", beforeRemoveListener);
        };
    }, [navigation]);

    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarActiveBackgroundColor: COLORS.active_tab,
                tabBarStyle: {
                    backgroundColor: COLORS.color_primary,
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
