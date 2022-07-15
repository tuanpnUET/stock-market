import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const EditNews = (props: any) => {
    console.log('props', props);
    return (
        <View style={styles.contModalContent}>
            <Text>Edit News Stock</Text>
        </View>
    );
};

export default EditNews;

const styles = StyleSheet.create({
    contModalContent: {
        flex: 1, // Must have flex: 1 in here
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
