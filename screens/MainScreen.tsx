import { Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { globals } from "../styles/globals";
import { TUser } from "../utils/types";

const MainScreen = () => {
    const [user, setUser] = useState<TUser>();
    useEffect(() => {
        const getData = async () => {
            try {
                const value = JSON.parse(await AsyncStorage.getItem("user"));
                setUser(value);
            } catch (e) {
                console.log(e);
            }
        };

        getData();
    }, []);
    return (
        <View style={globals.container}>
            <Text>Hello, {user?.userFullName}</Text>
        </View>
    );
};

export default MainScreen;
