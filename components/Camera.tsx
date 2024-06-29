import { CameraView, FlashMode, useCameraPermissions } from "expo-camera";
import { Button, StyleSheet, Text, View, Image } from "react-native";
import { useState, useRef } from "react";
import { COLORS } from "../utils/constants";
import { TCameraButton, TPhoto } from "../utils/types";
import CameraButton from "./CameraButton";

const Camera = () => {
    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState<boolean>(false);
    const [torchEnabled, setTorchEnabled] = useState<boolean>(false);
    const [photo, setPhoto] = useState<TPhoto>();
    const [flashEnabled, setFlashEnabled] = useState<FlashMode>("off");
    const cameraRef = useRef(null);

    const CAMERA_BUTTONS_SCANNED: TCameraButton[] = [
        {
            id: 1,
            buttonFunction: () => setScanned((prev) => !prev),
            enableIcon: "scan-helper",
        },
        {
            id: 2,
            buttonFunction: () =>
                setFlashEnabled((prev) => (prev === "off" ? "on" : "off")),
            enableIcon: "lightbulb",
            disableIcon: "lightbulb-off",
            state: flashEnabled === "on",
        },
        {
            id: 3,
            buttonFunction: () => takePhoto(),
            enableIcon: "camera",
        },
    ];

    const handleBarCodeScanned = ({ data }) => {
        setScanned(true);
        alert(`QR code data: ${data}`);
    };

    const takePhoto = async () => {
        if (cameraRef.current) {
            let options = {
                quality: 1,
                base64: true,
                exif: false,
            };
            const newPhoto = await cameraRef.current.takePictureAsync(options);
            setPhoto(newPhoto);
        }
    };

    if (!permission) {
        return <View />;
    }

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

    if (photo) {
        return (
            <View style={styles.container}>
                <Image
                    source={{ uri: "data:image/jpg;base64," + photo.base64 }}
                    style={styles.preview}
                />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <CameraView
                style={styles.camera}
                barcodeScannerSettings={{
                    barcodeTypes: ["qr"],
                }}
                onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
                enableTorch={torchEnabled}
                flash={flashEnabled}
                ref={cameraRef}
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
                    <CameraButton
                        buttonFunction={() => setTorchEnabled((prev) => !prev)}
                        state={torchEnabled}
                        enableIcon="lightbulb"
                        disableIcon="lightbulb-off"
                    />
                )}
                {scanned && (
                    <>
                        {CAMERA_BUTTONS_SCANNED.map((button) => (
                            <CameraButton
                                buttonFunction={button.buttonFunction}
                                enableIcon={button.enableIcon}
                                disableIcon={button.disableIcon}
                                state={button.state}
                                key={button.id}
                            />
                        ))}
                    </>
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
    preview: {
        alignSelf: "stretch",
        flex: 1,
    },
});

export default Camera;
