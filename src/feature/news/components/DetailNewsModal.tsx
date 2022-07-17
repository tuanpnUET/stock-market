import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const DetailNewsModal = (props: any) => {
    console.log('props', props);
    return (
        <View style={styles.contModalContent}>
            <Text>Add News Stock</Text>
        </View>
    );
};

export default DetailNewsModal;

const styles = StyleSheet.create({
    contModalContent: {
        flex: 1, // Must have flex: 1 in here
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
