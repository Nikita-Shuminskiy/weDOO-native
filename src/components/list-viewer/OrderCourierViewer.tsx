import React from 'react';
import {Image, StyleSheet} from "react-native";
import {Box, Text} from "native-base";
import {getFormattedAddress} from "../MapViews/utils";
import {colors} from "../../assets/colors/colors";
import Button from "../Button";
import {OrderCourierType} from "../../api/couierApi";
import fromToImg from '../../assets/images/courierImages/fromTo.png'

type OrderCourierProps = {
    order: OrderCourierType
    onPressTakeOrder: () => void
    isMyOrder?: boolean
}
const OrderCourierViewer = ({order, onPressTakeOrder, isMyOrder = false}: OrderCourierProps) => {
    const formattedAddressStore = getFormattedAddress({
        fullAddress: order.store?.address,
        location: order.store?.location
    })
    const formattedAddressUser = getFormattedAddress(order?.user?.address)

    return (<Box style={styles.container}>
            <Box flexDirection={'row'} justifyContent={'space-between'}>
                <Box maxW={250} flexDirection={'row'} alignItems={'flex-start'}>
                    <Image style={styles.imageFromTo} source={fromToImg} alt={'img'}/>
                    <Box ml={2}>
                        <Text fontWeight={'600'} fontSize={14}>{formattedAddressStore}</Text>
                        <Text fontWeight={'600'} fontSize={14}>{formattedAddressUser}</Text>
                    </Box>
                </Box>
                <Text fontWeight={'600'} fontSize={16}>฿{' '}{order.totalPrice}</Text>
            </Box>


            <Box flexDirection={'row'} mt={2} justifyContent={'space-between'}>
                <Button backgroundColor={colors.green} styleText={styles.textBtn}
                        styleContainer={styles.containerBtn}
                        onPress={onPressTakeOrder} title={isMyOrder ? 'Go to order' :'Take order'}/>
            </Box>
        </Box>
    );
};
const styles = StyleSheet.create({
    imageFromTo: {
        position: "relative",
        top: 8,
        width: 9,
        height: 27.5
    },
    textBtn: {
        color: colors.white
    },
    containerBtn: {
        flex: 1,
        width: '100%',
        marginRight: 5
    },
    container: {
        borderRadius: 20,
        marginBottom: 15,
        margin: 10,
        padding: 10,
        backgroundColor: colors.white,
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 18,
        },
        shadowOpacity: 0.25,
        shadowRadius: 10.00,
        elevation: 10,
    }
})
export default OrderCourierViewer;
