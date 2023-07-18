import React from 'react';
import {Box, Image, Text} from "native-base";
import {colors} from "../../assets/colors/colors";
import test from '../../assets/images/test.png'
import {TouchableOpacity} from "react-native";
import motorcycle from '../../assets/images/moto.png'
import {StoreType} from "../../api/storesApi";

type StoresViewerType = {
    stores: StoreType
}

const StoresViewer = ({stores}: StoresViewerType) => {

    return (
        <TouchableOpacity style={{alignItems: 'center', flex: 1}}>
            <Box backgroundColor={'rgba(203,203,203,0.27)'}
                 borderRadius={16}
                 alignItems={'flex-start'} justifyContent={'space-between'} m={1}
                 borderColor={colors.green}>
                <Box>
                    <Box w={24}
                         position={'absolute'}
                         p={1}
                         top={2}
                         left={0}
                         borderWidth={1}
                         zIndex={10}
                         borderColor={colors.green}
                         flexDirection={'row'}
                         borderRadius={16}
                         alignItems={'center'}
                         justifyContent={'center'}
                         backgroundColor={'transparent'}>
                        <Image source={motorcycle} h={17} w={26} alt={'moto'}/>
                        <Text ml={2} color={colors.white} fontSize={16} fontWeight={'500'}>{stores?.deliveryTime}</Text>
                    </Box>
                    <Image alt={'image-store'} borderRadius={16} source={test}/>
                    <Box position={'absolute'}
                         bottom={0}
                         right={0}
                         backgroundColor={colors.green}
                         borderRadius={16} borderRightRadius={0} paddingY={1} paddingX={3}>
                        <Text color={colors.white} fontWeight={'600'} fontSize={14}>Open
                            until {stores?.workingHours}</Text>
                    </Box>
                </Box>
                <Box paddingY={2}
                     w={'100%'}
                     borderBottomRightRadius={16}
                     borderBottomLeftRadius={16}>
                    <Text ml={3}
                          fontSize={18}
                          fontWeight={'700'}
                          color={colors.balck}>{stores?.name}</Text>
                    <Box ml={4} flexDirection={'row'} flexWrap={'wrap'} w={'90%'} alignItems={'center'}>
                        {stores?.products?.map((product, key) => {
                            const lastElem = stores?.products?.length - 1 === key
                            console.log(lastElem)
                            return <Text key={`${product}-${key}`}
                                         fontWeight={'500'}>{product}{lastElem ? '' : ','}</Text>
                        })}
                    </Box>
                </Box>
            </Box>
        </TouchableOpacity>
    );
};

export default StoresViewer;