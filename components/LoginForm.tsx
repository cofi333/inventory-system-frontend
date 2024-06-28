import { Text, TextInput, View, Button } from "react-native";
import { globals } from "../styles/globals";
import { LOGIN_INPUTS, LOGIN_SCHEMA, API_ENDPOINT } from "../utils/constants";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "@env";
import PrimaryButton from "./PrimaryButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showToast } from "../utils/functions";
import Toast from "react-native-toast-message";

const LoginForm = ({ navigation }) => {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(LOGIN_SCHEMA),
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const onSubmit = async (data) => {
        try {
            setIsLoading(true);
            const response = await axios.post(
                `${BASE_URL}${API_ENDPOINT.LOGIN}`,
                data
            );
            switch (response.data.status) {
                case 200:
                    await AsyncStorage.setItem(
                        "user",
                        JSON.stringify(response.data)
                    );
                    navigation.navigate("Main");
                    break;

                case 401:
                case 403:
                case 404:
                    setIsLoading(false);
                    showToast("error", response.data.description);
                    break;
            }
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };

    return (
        <>
            <View style={globals.form}>
                {LOGIN_INPUTS.map((input) => (
                    <View key={input.id}>
                        <Controller
                            control={control}
                            render={({
                                field: { onChange, onBlur, value },
                            }) => (
                                <>
                                    <TextInput
                                        placeholder={input.placeholder}
                                        style={globals.input}
                                        secureTextEntry={
                                            input.type === "password"
                                        }
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                    />
                                    {errors[input.name]?.message && (
                                        <Text>
                                            {String(errors[input.name].message)}
                                        </Text>
                                    )}
                                </>
                            )}
                            name={input.name}
                        />
                    </View>
                ))}
            </View>
            <PrimaryButton
                title="Submit"
                onPress={handleSubmit(onSubmit)}
                isLoading={isLoading}
            />
            <Toast />
        </>
    );
};

export default LoginForm;
