import { View, Text, TextInput } from "react-native";
import { useState, useEffect } from "react";
import { PRODUCT_STATUS, ITEM_FORM_SCHEMA } from "../utils/constants";
import { StyleSheet, Image } from "react-native";
import { globals } from "../styles/globals";
import PrimaryButton from "./PrimaryButton";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SelectList } from "react-native-dropdown-select-list";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ItemForm = ({ onPhotoTake, photo, setPhoto }) => {
    const [selectedStatus, setSelectedStatus] = useState(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const {
        handleSubmit,
        control,
        formState: { errors },
        setValue,
        getValues,
    } = useForm({
        resolver: zodResolver(ITEM_FORM_SCHEMA),
    });

    const onSubmit = async (data) => {
        data.photo = photo;
        console.log(data);
    };

    useEffect(() => {
        const loadSavedData = async () => {
            const savedData = await AsyncStorage.getItem("itemForm");
            if (savedData) {
                const parsedData = JSON.parse(savedData);
                setValue("product_status", parsedData.product_status);
                setValue("product_comment", parsedData.product_comment);
            }
        };

        loadSavedData();
    }, [setValue]);

    const savePrevData = async () => {
        const data = {
            product_status: getValues("product_status"),
            product_comment: getValues("product_comment"),
        };
        await AsyncStorage.setItem("itemForm", JSON.stringify(data));
        onPhotoTake();
    };

    return (
        <>
            <View>
                <Controller
                    control={control}
                    render={({ field: { onChange } }) => (
                        <>
                            <SelectList
                                setSelected={(val: string) => {
                                    setSelectedStatus(val);
                                    onChange(val);
                                    val !== "2" && setPhoto(null);
                                }}
                                data={PRODUCT_STATUS}
                                save="key"
                                placeholder="Select a status of item"
                                boxStyles={styles.selectInput}
                                inputStyles={styles.selectText}
                                dropdownTextStyles={styles.selectText}
                                defaultOption={PRODUCT_STATUS.find(
                                    (el) =>
                                        el.key === getValues("product_status")
                                )}
                            />
                            {errors["product_status"]?.message && (
                                <Text>
                                    {String(errors["product_status"].message)}
                                </Text>
                            )}
                        </>
                    )}
                    name="product_status"
                />
                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <>
                            <TextInput
                                style={globals.input}
                                placeholder="Enter your additional comment for the item"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                            {errors["product_comment"]?.message && (
                                <Text>
                                    {String(errors["product_comment"].message)}
                                </Text>
                            )}
                        </>
                    )}
                    name="product_comment"
                />

                {photo && (
                    <Image
                        source={{
                            uri: "data:image/jpg;base64," + photo.base64,
                        }}
                        style={styles.preview}
                    />
                )}

                <View style={styles.buttons}>
                    {selectedStatus === "2" && (
                        <PrimaryButton
                            onPress={savePrevData}
                            title={photo ? "Retake a photo" : "Take a photo"}
                        />
                    )}

                    <PrimaryButton
                        isLoading={isLoading}
                        title="Submit"
                        onPress={handleSubmit(onSubmit)}
                    />
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    preview: {
        width: 200,
        height: 200,
        marginBottom: 10,
    },
    buttons: {
        display: "flex",
        gap: 8,
    },
    selectInput: {
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderWidth: 1,
        borderRadius: 4,
        borderColor: "#000",
    },
    selectText: {
        fontSize: 12,
    },
});

export default ItemForm;
