/* eslint-disable react/no-children-prop */
import React, { FunctionComponent } from 'react';
import { Platform, StyleSheet, View, Text } from 'react-native';
import { StyledText } from 'components/base';
import { Themes, ThemesDark } from 'assets/themes';
import sizes from 'assets/sizes';
import metrics from 'assets/metrics';

const HomeUserListScreen: FunctionComponent = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <StyledText i18nText="homeListScreen.title" customStyle={styles.headerText} />
            </View>
            <Text>Home List Screen</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: ThemesDark.colors.dark,
    },
    header: {
        flexDirection: 'row',
        height: 100,
        borderBottomWidth: 0.5,
        borderColor: ThemesDark.colors.strongGray,
    },
    headerText: {
        width: metrics.screenWidth - 50,
        textAlign: 'left',
        top: Platform.OS === 'android' ? 49 : 59,
        left: 17,
        fontSize: sizes.FONTSIZE.medium,
        color: Themes.COLORS.white,
    },
    touchable: {
        width: 50,
    },
    body: {
        flex: 1,
    },
    tabIcon: {
        width: 24,
        height: 24,
        top: Platform.OS === 'android' ? 49 : 59,
        resizeMode: 'contain',
    },
});

export default HomeUserListScreen;
