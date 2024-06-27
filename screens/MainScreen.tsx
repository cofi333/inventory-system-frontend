import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { COLORS, TAB_SCREENS } from "../utils/constants";

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
            {TAB_SCREENS.map((screen) => (
                <Tab.Screen
                    name={screen.name}
                    component={screen.component}
                    options={{
                        tabBarIcon: () => (
                            <MaterialCommunityIcons
                                name={screen.icon}
                                size={26}
                                color="#fff"
                            />
                        ),
                    }}
                    key={screen.id}
                />
            ))}
        </Tab.Navigator>
    );
};

export default MainScreen;
