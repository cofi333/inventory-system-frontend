import { TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const CameraButton = ({ buttonFunction, disableIcon, enableIcon, state }) => {
    return (
        <TouchableOpacity onPress={buttonFunction}>
            <MaterialCommunityIcons
                name={state ? disableIcon : enableIcon}
                size={26}
                color="#fff"
            />
        </TouchableOpacity>
    );
};

export default CameraButton;
