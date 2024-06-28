import { View, TextInput, Text } from "react-native";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FORGOT_PASSWORD_SCHEMA, API_ENDPOINT } from "../utils/constants";
import { globals } from "../styles/globals";
import PrimaryButton from "./PrimaryButton";
import axios from "axios";
import { BASE_URL } from "@env";
import { showToast } from "../utils/functions";

const ForgotPasswordForm = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(FORGOT_PASSWORD_SCHEMA),
    });

    const onSubmit = async (data) => {
        try {
            setIsLoading(true);
            const response = await axios.post(
                `${BASE_URL}${API_ENDPOINT.FORGOT_PASSWORD_SEND_MAIL}`,
                data
            );

            switch (response.data.status) {
                case 200:
                    setIsLoading(false);
                    showToast(
                        "success",
                        "If you have an account linked to this email",
                        "we have sent you instructions for resetting it in your inbox."
                    );
                    break;
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View>
            <View style={globals.form}>
                <Controller
                    control={control}
                    name="email"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            placeholder="Enter your email"
                            style={globals.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        ></TextInput>
                    )}
                />
                {errors["email"]?.message && (
                    <Text>{String(errors["email"].message)}</Text>
                )}
            </View>
            <PrimaryButton
                title="Submit"
                onPress={handleSubmit(onSubmit)}
                isLoading={isLoading}
            />
        </View>
    );
};

export default ForgotPasswordForm;
