import {Linking, TouchableOpacity} from "react-native";
import {Text} from "native-base";
import React from "react";

export const PhoneNumberComponent = ({ phoneNumber }) => {
    const handlePhonePress = async () => {
        const url = `tel:${phoneNumber}`;
        const supported = await Linking.canOpenURL(url);

        if (supported) {
            await Linking.openURL(url);
        } else {
            console.error('Невозможно открыть телефонную книгу');
        }
    };

    return (
        <TouchableOpacity onPress={handlePhonePress}>
            <Text ml={2} mb={2}>{phoneNumber}</Text>
        </TouchableOpacity>
    );
};