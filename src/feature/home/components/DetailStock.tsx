/* eslint-disable @typescript-eslint/no-unused-vars */
import { StyledText } from 'components/base';
import StyledPicker from 'components/base/picker/StyledPicker';
import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';

const DetailStock = (props: any) => {
    console.log('props', props);
    return (
        <View style={styles.contModalContent}>
            <Text>Detail Stock</Text>
        </View>
    );
};

export default DetailStock;

const styles = StyleSheet.create({
    contModalContent: {
        flex: 1, // Must have flex: 1 in here
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
