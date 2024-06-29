import { CameraView, useCameraPermissions } from "expo-camera";
import { Button, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useState } from "react";
import { COLORS } from "../utils/constants";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Camera = () => {
    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState<boolean>(false);
    const [torchEnabled, setTorchEnabled] = useState<boolean>(false);

    if (!permission) {
        return <View />;
    }

    const toggleTorch = () => {
        setTorchEnabled((prev) => !prev);
    };

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: "center" }}>
                    We need your permission to show the camera
                </Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    }

    const handleBarCodeScanned = ({ data }) => {
        setScanned(true);
        alert(`QR code data: ${data}`);
    };

    return (
        <View style={styles.container}>
            <CameraView
                style={styles.camera}
                barcodeScannerSettings={{
                    barcodeTypes: ["qr"],
                }}
                onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
                enableTorch={torchEnabled}
            >
                <View style={styles.overlay}>
                    <View style={[styles.corner, styles.topLeft]} />
                    <View style={[styles.corner, styles.topRight]} />
                    <View style={[styles.corner, styles.bottomLeft]} />
                    <View style={[styles.corner, styles.bottomRight]} />
                </View>
            </CameraView>

            <View style={styles.camera_buttons}>
                {!scanned && (
                    <TouchableOpacity onPress={toggleTorch}>
                        {torchEnabled ? (
                            <MaterialCommunityIcons
                                name="lightbulb-off"
                                size={26}
                                color="#fff"
                            />
                        ) : (
                            <MaterialCommunityIcons
                                name="lightbulb"
                                size={26}
                                color="#fff"
                            />
                        )}
                    </TouchableOpacity>
                )}

                {scanned && (
                    <TouchableOpacity onPress={() => setScanned(false)}>
                        <MaterialCommunityIcons
                            name="scan-helper"
                            size={26}
                            color="#fff"
                        />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    },
    camera: {
        flex: 1,
    },
    overlay: {
        position: "absolute",
        top: "50%",
        left: "50%",
        width: 200,
        height: 200,
        marginLeft: -100,
        marginTop: -100,
    },
    corner: {
        position: "absolute",
        width: 30,
        height: 30,
        borderColor: "rgba(255, 255, 255, 0.8)",
    },
    topLeft: {
        borderTopWidth: 3,
        borderLeftWidth: 3,
        top: 0,
        left: 0,
    },
    topRight: {
        borderTopWidth: 3,
        borderRightWidth: 3,
        top: 0,
        right: 0,
    },
    bottomLeft: {
        borderBottomWidth: 3,
        borderLeftWidth: 3,
        bottom: 0,
        left: 0,
    },
    bottomRight: {
        borderBottomWidth: 4,
        borderRightWidth: 4,
        bottom: 0,
        right: 0,
    },
    camera_buttons: {
        position: "absolute",
        bottom: 30,
        right: 10,
        borderRadius: 10,
        zIndex: 10,
        backgroundColor: COLORS.color_primary,
        padding: 10,
        gap: 32,
    },
    text: {
        color: "#fff",
        fontSize: 15,
    },
});

export default Camera;
