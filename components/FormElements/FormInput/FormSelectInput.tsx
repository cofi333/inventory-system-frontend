import { Form } from "react-bootstrap";
import styles from "./FormInput.module.scss";
import Image from "next/image";
import { Tooltip, useDisclosure } from "@chakra-ui/react";
import { ErrorIcon } from "@/resources/icons";
import { useRecoilState } from "recoil";
import { compainesAtom, userAtom } from "@/utils/atoms";

const FormSelectInput = ({ input, register, errors }) => {
    const { isOpen, onOpen, onToggle, onClose } = useDisclosure();
    const [user, setUser] = useRecoilState(userAtom);
    const [companies, setCompanies] = useRecoilState(compainesAtom);

    return (
        <Form.Group
            className="mb-3"
            controlId={"FormInput " + input.id}
            key={input.id}
        >
            <Form.Label>{input.label}</Form.Label>
            <div className={styles.input}>
                <Form.Select {...register(input.name)}>
                    <option value="0">Select a company</option>
                    {companies.map((option) => (
                        <option value={option.company_id}>
                            {option.company_name}
                        </option>
                    ))}
                </Form.Select>
                <div className={styles.input_error}>
                    {errors[input.name] && (
                        <Tooltip
                            label={errors[input.name].message}
                            fontSize="sm"
                            bg="red.600"
                            textAlign="center"
                            isOpen={isOpen}
                        >
                            <Image
                                src={ErrorIcon}
                                width={20}
                                height={20}
                                alt="Error"
                                onMouseEnter={onOpen}
                                onMouseLeave={onClose}
                                onClick={onToggle}
                            />
                        </Tooltip>
                    )}
                </div>
            </div>
        </Form.Group>
    );
};

export default FormSelectInput;
