import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet, useWindowDimensions} from 'react-native';
import {Modalize} from 'react-native-modalize';

const ModalPopup = ({visible, onClose, children}) => {
    const modalizeRef = useRef(null);
    const {height} = useWindowDimensions();
    const modalHeight = height;

    useEffect(() => {
        if (visible) {
            modalizeRef.current?.open();
        } else {
            modalizeRef.current?.close();
        }
    }, [visible]);

    return (
        <Modalize
            childrenStyle={styles.modalContent}
            ref={modalizeRef}
            onClosed={onClose}
        >
            {children}
        </Modalize>
    );
};

const styles = StyleSheet.create({
    modalContent: {
        flex: 1,
        width: '100%',
        height: '100%',
        padding: 20,
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
});

export default ModalPopup;