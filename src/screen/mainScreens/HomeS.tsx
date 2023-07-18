import React, {useState} from 'react';
import {observer} from "mobx-react-lite";
import {BaseWrapperComponent} from "../../components/baseWrapperComponent";
import {Box, Image, Text} from "native-base";
import AuthStore from "../../store/AuthStore/auth-store";
import likeImg from '../../assets/images/likeGreen.png'
import userImg from '../../assets/images/userGreen.png'
import searchImg from '../../assets/images/search.png'
import settingImg from '../../assets/images/setting.png'
import {Dimensions, FlatList, StyleSheet, TouchableOpacity, TouchableOpacityProps} from "react-native";
import {colors} from "../../assets/colors/colors";
import TextInput from "../../components/TextInput";
import EmptyList from "../../components/list-viewer/empty-list";
import CategoriesViewer from "../../components/list-viewer/CategoriesViewer";
import StoresViewer from "../../components/list-viewer/StoresViewer";
import {useEffect} from "react/index";
import rootStore from "../../store/RootStore/root-store";
import {StoreType} from "../../api/storesApi";
import {CategoryType} from "../../api/categoriesApi";

type TouchableWrappedProps = TouchableOpacityProps & {
    children: JSX.Element
}
const TouchableWrapped = ({children, ...rest}: TouchableWrappedProps) => {
    return <TouchableOpacity {...rest}>
        {children}
    </TouchableOpacity>
}
const HomeS = observer(() => {
    const {user} = AuthStore
    const {StoresService, StoresStore, CategoriesService, CategoriesStore} = rootStore
    const {stores} = StoresStore
    const {categories} = CategoriesStore

    const [search, setSearch] = useState('')
    const onChangeTextSearch = (e) => {
        setSearch(e)
    }
    const categoriesViews = ({item}: {item: CategoryType}) => {
        return (
            <CategoriesViewer
                category={item}
            />
        )
    }
    const storesViews = ({item}: { item: StoreType }) => {
        return (
            <StoresViewer
                stores={item}
            />
        )
    }
    const renderEmptyContainer = (height, text) => {
        const onPressLink = () => {

        }
        return (
            <EmptyList
                height={height}
                text={text}
                onPressLink={onPressLink}
            />
        )
    }

    useEffect(() => {
        StoresService.getStores()
        CategoriesService.getCategories()
    }, [])
    return (
        <BaseWrapperComponent isKeyboardAwareScrollView={true}>
            <Box mt={2}>
                <Box paddingX={5} h={45} w={'100%'} flexDirection={'row'} justifyContent={'space-between'}>
                    <TouchableWrapped>
                        <Image source={userImg} alt={'user'}/>
                    </TouchableWrapped>
                    <Text fontSize={16} w={'60%'} textAlign={'center'}
                          fontWeight={'600'}>{user?.location}1313111113</Text>
                    <TouchableWrapped>
                        <Image source={likeImg} alt={'like'}/>
                    </TouchableWrapped>
                </Box>

                <Box mt={10} w={'100%'} backgroundColor={colors.white} borderTopLeftRadius={16}
                     borderTopRightRadius={16}>
                    <Box w={'100%'} paddingX={5}>
                        <TextInput
                            iconLeft={<Image ml={2} source={searchImg} alt={'search'}/>}
                            iconRight={
                                <Box flexDirection={'row'} mr={2}>
                                    <Box borderRightWidth={1} borderColor={colors.gray} mr={4}/>
                                    <Image source={settingImg} alt={'setting'}/>
                                </Box>
                            }
                            h={50}
                            placeholder={'Name, strain or shop'}
                            borderRadius={16}
                            backgroundColor={'transparent'}
                            borderColor={colors.grayLight}
                            value={search}
                            onChangeText={onChangeTextSearch}/>
                    </Box>

                    <Box mt={5} mb={2}>
                        <FlatList
                            data={categories}
                            renderItem={categoriesViews}
                            keyExtractor={(item, index) => index.toString()}
                            style={{width: '100%'}}
                            contentContainerStyle={
                                !categories?.length && {
                                    flex: 1,
                                    width: '100%',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }
                            }
                            ListEmptyComponent={() => renderEmptyContainer(0, '')}
                            horizontal={true}
                            showsVerticalScrollIndicator={false}
                        />
                    </Box>
                    <Box>
                        <FlatList
                            data={stores}
                            renderItem={storesViews}
                            keyExtractor={(item, index) => index.toString()}
                            style={{width: '100%'}}
                            ListEmptyComponent={() => renderEmptyContainer(Dimensions.get('window').height, 'List is empty')}
                            contentContainerStyle={
                                !stores?.length ? {
                                    flex: 1,
                                    width: '100%',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                } : {width: '100%', flex: 1}
                            }
                        />
                    </Box>
                </Box>
            </Box>
        </BaseWrapperComponent>
    );
});
const styles = StyleSheet.create({})

export default HomeS;