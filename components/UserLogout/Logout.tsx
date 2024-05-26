import React, { useState } from "react";
import styles from "./Logout.module.scss";
import Image from "next/image";
import { ExitIcon } from "@/resources/icons";
import { useRouter } from "next/navigation";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalCloseButton,
    useDisclosure,
    Button,
} from "@chakra-ui/react";
import { Spinner } from "react-bootstrap";

const Logout = () => {
    const router = useRouter();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    return (
        <div className={styles.user_logout}>
            <div className={styles.user_logout_text} onClick={onOpen}>
                <Image src={ExitIcon} alt="Exit Icon" width={20} height={20} />
                Logout
            </div>

            <Modal
                isOpen={isOpen}
                onClose={onClose}
                isCentered
                size={{ base: "xs", sm: "md" }}
            >
                <ModalOverlay
                    bg="blackAlpha.300"
                    backdropFilter="blur(5px) hue-rotate(10deg)"
                />
                <ModalContent margin="0 5px">
                    <ModalHeader
                        fontSize={{ base: "0.9rem", sm: "1.2rem" }}
                        marginRight="15px"
                    >
                        Are you sure you want to log out?
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalFooter>
                        <Button mr={3} onClick={onClose} fontSize="0.9rem">
                            Close
                        </Button>
                        <Button
                            colorScheme="blue"
                            onClick={() => {
                                setIsLoading(true);
                                sessionStorage.removeItem("user");
                                router.push("/");
                            }}
                            minWidth="80px"
                            fontSize="0.9rem"
                        >
                            {isLoading ? (
                                <Spinner animation="border" size="sm" />
                            ) : (
                                "Log out"
                            )}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
};

export default Logout;
