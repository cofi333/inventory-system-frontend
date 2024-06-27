import { View, Text, TextInput } from "react-native";
import {
    REGISTER_INPUTS,
    REGISTER_SCHEMA,
    API_ENDPOINT,
} from "../utils/constants";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { globals } from "../styles/globals";
import PrimaryButton from "./PrimaryButton";
import axios from "axios";
import { BASE_URL } from "@env";
import Toast from "react-native-toast-message";
import { showToast } from "../utils/functions";

const SignupForm = () => {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(REGISTER_SCHEMA),
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const onSubmit = async (data) => {
        try {
            setIsLoading(true);
            const response = await axios.post(
                `${BASE_URL}${API_ENDPOINT.REGISTER}`,
                data
            );

            switch (response.data.status) {
                case 200:
                    showToast("success", response.data.description);
                    break;

                case 403:
                    showToast("error", response.data.description);
                    break;
                default:
                    setIsLoading(false);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <View>
                {REGISTER_INPUTS.map((input) => (
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
                <PrimaryButton
                    title="Submit"
                    onPress={handleSubmit(onSubmit)}
                    isLoading={isLoading}
                />
            </View>
            <Toast />
        </>
    );
};

export default SignupForm;
