import { Text, TextInput, View, Button } from "react-native";
import { globals } from "../styles/globals";
import { LOGIN_INPUTS, LOGIN_SCHEMA, API_ENDPOINT } from "../utils/constants";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "@env";
import { PrimaryButton } from "../components";

const LoginForm = () => {
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
            console.log(response);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };

    return (
        <View>
            {LOGIN_INPUTS.map((input) => (
                <View key={input.id}>
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <>
                                <TextInput
                                    placeholder={input.placeholder}
                                    style={globals.input}
                                    secureTextEntry={input.type === "password"}
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

            <PrimaryButton title="Login" onPress={handleSubmit(onSubmit)} />
        </View>
    );
};

export default LoginForm;
