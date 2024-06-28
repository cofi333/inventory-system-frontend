import { CameraView, useCameraPermissions } from "expo-camera";
import {
    Pressable,
    Button,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { COLORS } from "../utils/constants";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Camera = () => {
    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(false);
    const [torchEnabled, setTorchEnabled] = useState(false);

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
                <View style={styles.overlay} />
            </CameraView>

            <TouchableOpacity onPress={toggleTorch} style={styles.bulb}>
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
        borderWidth: 2,
        borderColor: "rgba(255, 255, 255, 0.8)",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
    },
    bulb: {
        position: "absolute",
        bottom: 30,
        right: 10,
        borderRadius: 10,
        zIndex: 10,
        backgroundColor: COLORS.color_primary,
        padding: 10,
    },
    text: {
        color: "#fff",
        fontSize: 15,
    },
});

export default Camera;
