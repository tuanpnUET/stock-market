/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-alert */
import React, { FunctionComponent, useState } from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useModal from 'components/base/modal/useModal';
import StyledHeader from 'components/common/StyledHeader';
import { TAB_NAVIGATION_ROOT } from 'navigation/config/routes';
import useLoading from 'components/base/modal/useLoading';
import { wait } from 'utilities/helper';
import StyledPicker from 'components/base/picker/StyledPicker';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'app-redux/rootReducer';
import { getUserInfo } from 'app-redux/userInfo/actions';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyledIcon, StyledText, StyledTouchable } from 'components/base';
import { navigate } from 'navigation/NavigationService';
import Images from 'assets/images';
import { ScaledSheet } from 'react-native-size-matters';

const HomeScreen: FunctionComponent = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    // const { userInfo } = useSelector((state: RootState) => state);
    const navigation = useNavigation();
    const modal = useModal();

    return (
        <SafeAreaView style={styles.contScreen}>
            <View style={styles.header}>
                {/* <StyledTouchable
                    customStyle={styles.center}
                    onPress={() => navigate(TAB_NAVIGATION_ROOT.HOME_ROUTE.HOME)}
                >
                    <StyledIcon source={Images.icons.close} size={50} />
                </StyledTouchable> */}
                <View style={styles.center} />
                <StyledText i18nText={'common.stockMarket'} customStyle={styles.titleText} />
                <StyledTouchable
                    customStyle={styles.center}
                    onPress={() => navigate(TAB_NAVIGATION_ROOT.SETTING_ROUTE.ROOT)}
                >
                    <StyledIcon source={Images.icons.menu} size={20} />
                </StyledTouchable>
            </View>
        </SafeAreaView>
    );
};

const styles = ScaledSheet.create({
    contScreen: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: '5@s',
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '50@vs',
        height: '50@vs',
    },
    titleText: {
        fontSize: '22@ms0.3',
        alignSelf: 'center',
        fontWeight: 'bold',
    },
});

export default HomeScreen;
