import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const WatchList = (props: any) => {
    console.log('props', props);
    return (
        <View style={styles.contModalContent}>
            <Text>Watch List Screen</Text>
        </View>
    );
};

export default WatchList;

const styles = StyleSheet.create({
    contModalContent: {
        flex: 1, // Must have flex: 1 in here
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
