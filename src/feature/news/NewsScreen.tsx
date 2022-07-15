import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const NewsScreen = (props: any) => {
    console.log('props', props);
    return (
        <View style={styles.contModalContent}>
            <Text>News Screen</Text>
        </View>
    );
};

export default NewsScreen;

const styles = StyleSheet.create({
    contModalContent: {
        flex: 1, // Must have flex: 1 in here
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
