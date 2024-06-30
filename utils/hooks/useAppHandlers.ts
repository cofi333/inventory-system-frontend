import { useEffect } from "react";
import { Alert, AppState } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useAppStateAndNavigationHandlers = (navigation) => {
    useEffect(() => {
        const handleAppStateChange = async (nextAppState) => {
            if (nextAppState === "background" || nextAppState === "inactive") {
                await AsyncStorage.clear();
            }
        };

        const beforeRemoveListener = (e) => {
            e.preventDefault();
            Alert.alert("Logout?", "Are you sure you want to log out?", [
                { text: "Cancel", onPress: () => {} },
                {
                    text: "Logout",
                    onPress: async () => {
                        navigation.dispatch(e.data.action);
                        await AsyncStorage.multiRemove(["user", "itemForm"]);
                    },
                },
            ]);
        };

        const appState = AppState.addEventListener(
            "change",
            handleAppStateChange
        );

        navigation.addListener("beforeRemove", beforeRemoveListener);

        return () => {
            appState.remove();
            navigation.removeListener("beforeRemove", beforeRemoveListener);
        };
    }, [navigation]);
};

export default useAppStateAndNavigationHandlers;
