import React, {useEffect, useState} from 'react';
import {BaseWrapperComponent} from "../../components/baseWrapperComponent";
import {Box, Text} from "native-base";
import {FlatList, RefreshControl, StyleSheet, TouchableOpacity} from "react-native";
import {renderEmptyContainer} from "../../components/list-viewer/empty-list";
import {ApiOrderType} from "../../api/ordersApi";
import OrderViewer from "../../components/list-viewer/OrderViewer";
import OrderCourierViewer from "../../components/list-viewer/OrderCourierViewer";
import AuthStore from "../../store/AuthStore/auth-store";
import Button from "../../components/Button";
import {colors} from "../../assets/colors/colors";
import rootStore from "../../store/RootStore/root-store";
import {OrderCourierType} from "../../api/couierApi";
import {observer} from "mobx-react-lite";
import {routerConstants} from "../../constants/routerConstants";
import {NavigationProp, ParamListBase} from "@react-navigation/native";

type CourierOrdersProps = {
    navigation: NavigationProp<ParamListBase>
}

const CourierOrders = observer(({navigation}: CourierOrdersProps) => {
    const {logOut} = AuthStore
    const {CourierOrderService, CourierOrderStore} = rootStore
    const {courierOrders, setSelectedOrder} = CourierOrderStore
    const [refreshing, setRefreshing] = useState(false);
    const onPressGoMyOrders = () => {
        navigation.navigate(routerConstants.COURIER_TAKEN_ORDERS)
    }
    const onRefresh = () => {
        setRefreshing(true)
          CourierOrderService.getCourierOrders().finally(() => {
              setRefreshing(false)
          })
    };

    const orderViews = ({item}: { item: OrderCourierType }) => {
        const onPressTakeOrder = () => {
            setSelectedOrder(item)
            CourierOrderService.assignCourierOrder()
            navigation.navigate(routerConstants.COURIER_PICK_ORDER)
        }
        return (
            <OrderCourierViewer onPressTakeOrder={onPressTakeOrder} order={item}/>
        )
    }
    useEffect(() => {
        CourierOrderService.getCourierOrders()
    }, [])

    return (
        <BaseWrapperComponent isKeyboardAwareScrollView={true}>
            <Box>
                <Box paddingX={5} w={'100%'} alignItems={'center'} flexDirection={'row'}
                     justifyContent={'space-between'}>
                    <Box>
                        <Text fontSize={28} fontWeight={'700'}>Placed orders</Text>
                    </Box>
                    <Box mt={2}>
                        <TouchableOpacity onPress={onPressGoMyOrders}>
                            <Text fontSize={18} borderBottomWidth={1} fontWeight={'500'}>My orders</Text>
                        </TouchableOpacity>
                    </Box>

                </Box>
                <Box paddingX={5} w={100}>
                    <Button backgroundColor={colors.green} onPress={logOut} title={' log out '}/>
                </Box>
                <Box mt={5} alignItems={'center'} flex={1} w={'100%'}>
                    <FlatList
                        data={courierOrders ?? []}
                        renderItem={orderViews}
                        scrollEnabled={false}
                        keyExtractor={(item, index) => index?.toString()}
                        style={{width: '100%'}}
                        contentContainerStyle={
                            !courierOrders.length &&
                            styles.contentContainerOrder
                        }
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                        }
                        ListEmptyComponent={() => renderEmptyContainer(500, 'No orders.')}
                    />
                </Box>
            </Box>
        </BaseWrapperComponent>
    );
});
const styles = StyleSheet.create({
    contentContainerOrder: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    }

})
export default CourierOrders;
