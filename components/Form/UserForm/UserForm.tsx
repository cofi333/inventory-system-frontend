import { Button } from "@chakra-ui/react";
import { Form } from "react-bootstrap";
import { ADD_USER_INPUTS } from "@/utils/constants";
import { FormInput } from "@/components";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TRoomsData } from "@/utils/types";
import { ADD_USER_VALIDATION_SCHEMA } from "@/utils/constants";

const UserForm = ({ onAddUserClose }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TRoomsData>({
        resolver: zodResolver(ADD_USER_VALIDATION_SCHEMA),
    });

    const onSubmit = () => {};

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            {ADD_USER_INPUTS.map((input) => (
                <FormInput
                    input={input}
                    register={register}
                    errors={errors}
                    key={input.id}
                />
            ))}
            <div className="form_buttons">
                <Button colorScheme="blue" mr={3} onClick={onAddUserClose}>
                    Close
                </Button>
                <Button colorScheme="green" type="submit">
                    Add
                </Button>
            </div>
        </Form>
    );
};

export default UserForm;
