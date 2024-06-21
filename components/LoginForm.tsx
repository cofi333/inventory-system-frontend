import { Text, TextInput, View } from "react-native";
import { globals } from "../styles/globals";
import { LOGIN_INPUTS, LOGIN_SCHEMA } from "../utils/constants";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const LoginForm = () => {
    return (
        <View>
            {LOGIN_INPUTS.map((input) => (
                <TextInput
                    key={input.id}
                    placeholder={input.placeholder}
                    style={globals.input}
                    secureTextEntry={input.type === "password" ? true : false}
                />
            ))}
        </View>
    );
};

export default LoginForm;
