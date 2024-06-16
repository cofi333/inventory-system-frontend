import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
} from "@chakra-ui/react";

const AddRowModal = ({ addItemIsOpen, onAddItemClose, form, type }) => {
    return (
        <Modal isOpen={addItemIsOpen} onClose={onAddItemClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader> Add a {type}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>{form}</ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default AddRowModal;
