import { roomTableValidator, companiesTableValidator } from "../functions";
import useToastMessage from "./useToastMessage";

const useTableValidator = () => {
    const showToast = useToastMessage();

    const validateRow = (type, rowData) => {
        let validator;

        switch (type) {
            case "rooms":
                validator = roomTableValidator;
                break;
            case "company":
                validator = companiesTableValidator;
                break;
        }

        const { message, isValid } = validator(rowData);
        !isValid && showToast("error", message);
        return isValid;
    };

    return { validateRow };
};

export default useTableValidator;
