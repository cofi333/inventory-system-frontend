import "primeicons/primeicons.css";
import { InputText } from "primereact/inputtext";
import { useDisclosure, Button } from "@chakra-ui/react";
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";
import { PlusIconSecond, DeleteIcon } from "@/resources/icons";
import { ButtonIcon, RoomForm, CompaniesForm, UserForm } from "@/components";
import "@/styles/ItemsTable.scss";
import { Form } from "react-bootstrap";
import { DeleteRowModal, AddRowModal } from "@/components";

export const TableHeader = ({
    globalFilterValue,
    onGlobalFilterChange,
    selectedData,
    type,
}) => {
    const {
        isOpen: addItemIsOpen,
        onOpen: onAddItemOpen,
        onClose: onAddItemClose,
    } = useDisclosure();

    const {
        isOpen: deleteItemIsOpen,
        onOpen: onDeleteItemOpen,
        onClose: onDeleteItemClose,
    } = useDisclosure();

    let form;

    switch (type) {
        case "rooms":
            form = <RoomForm onAddRoomClose={onAddItemClose} />;
            break;
        case "company":
            form = <CompaniesForm onAddCompanyClose={onAddItemClose} />;
            break;

        case "user":
            form = <UserForm onAddUserClose={onAddItemClose} />;
            break;
    }

    return (
        <div className="items_header">
            {type === "items" && (
                <div className="items_header_top">
                    <Form.Select>
                        <option>Room 356</option>
                        <option>Room 123</option>
                        <option>Room 765</option>
                    </Form.Select>
                </div>
            )}
            <div className="items_header_bottom">
                <div className="items_header_bottom_actions">
                    <Button
                        colorScheme="green"
                        onClick={onAddItemOpen}
                        leftIcon={<ButtonIcon icon={PlusIconSecond} />}
                    >
                        <div className="label">Add a {type}</div>
                    </Button>
                    <Button
                        colorScheme="red"
                        onClick={onDeleteItemOpen}
                        leftIcon={<ButtonIcon icon={DeleteIcon} />}
                        isDisabled={!selectedData || selectedData.length === 0}
                    >
                        <div className="label">Delete selected {type}</div>
                    </Button>
                </div>
                <div className="items_header_bottom_search">
                    <InputText
                        value={globalFilterValue}
                        onChange={onGlobalFilterChange}
                        placeholder="Search"
                    />
                </div>
            </div>
            <AddRowModal
                addItemIsOpen={addItemIsOpen}
                onAddItemClose={onAddItemClose}
                form={form}
                type={type}
            />
            <DeleteRowModal
                deleteItemIsOpen={deleteItemIsOpen}
                onDeleteItemClose={onDeleteItemClose}
                type={type}
            />
        </div>
    );
};
