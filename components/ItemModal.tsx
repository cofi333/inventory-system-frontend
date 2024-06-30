import React from "react";
import { Modal, View, StyleSheet, TouchableOpacity } from "react-native";
import ItemForm from "./ItemForm";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const ItemModal = ({ visible, onClose, photo, onPhotoTake, setPhoto }) => {
    return (
        <Modal visible={visible} transparent={true} animationType="slide">
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <TouchableOpacity
                        onPress={onClose}
                        style={styles.closeButton}
                    >
                        <MaterialCommunityIcons
                            size={26}
                            color="#000"
                            name="close"
                        />
                    </TouchableOpacity>
                    <View style={styles.modalForm}>
                        <ItemForm
                            onPhotoTake={onPhotoTake}
                            photo={photo}
                            setPhoto={setPhoto}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default ItemModal;

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#00000080",
    },
    modalContent: {
        width: "90%",
        padding: 10,
        backgroundColor: "#fff",
        borderRadius: 10,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    closeButton: {
        alignSelf: "flex-end",
    },
    modalForm: {
        width: "100%",
        marginVertical: 16,
    },
});
