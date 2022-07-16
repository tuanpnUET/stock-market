/* eslint-disable no-underscore-dangle */
import React, { FunctionComponent } from 'react';
import { Alert, TouchableOpacity, View } from 'react-native';
import StyledText from 'components/base/StyledText';
import { StyledIcon, StyledTouchable } from 'components/base';
import AuthenticateService from 'utilities/authenticate/AuthenticateService';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import Images from 'assets/images';
import { ScaledSheet } from 'react-native-size-matters';
import { Themes } from 'assets/themes';
import { navigate } from 'navigation/NavigationService';
import { TAB_NAVIGATION_ROOT } from 'navigation/config/routes';
import { languageCode } from 'utilities/staticData';
import { changeLanguage } from 'app-redux/language/actions';
import ConfirmModal from 'components/base/modal/ConfirmModal';
import useModal from 'components/base/modal/useModal';
import { RootState } from 'app-redux/rootReducer';
import { deleteAccount } from 'api/modules/api-app/authenticate';

const SettingItem = ({ title, onPress, textStyle }: any) => {
    return (
        <TouchableOpacity style={styles.settingItem} onPress={onPress}>
            <StyledText customStyle={[styles.settingText, textStyle]} i18nText={title} />
        </TouchableOpacity>
    );
};

const SettingView: FunctionComponent = () => {
    const { t } = useTranslation();
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state: RootState) => state);
    const modal = useModal();

    const handleDeleteAcc = async () => {
        await deleteAccount(userInfo?.user?._id);
        modal.dismiss();
        AuthenticateService.logOut();
    };

    const onDeleteAccount = () => {
        modal.show({
            children: (
                <ConfirmModal
                    text={'settings.deleteConfirm'}
                    confirmText="settings.delete"
                    modal={modal}
                    onConfirm={handleDeleteAcc}
                    confirmButtonStyle={styles.confirmButtonStyle}
                />
            ),
            onBackdropPress: () => {
                modal.dismissAll();
            },
        });
    };
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <StyledTouchable onPress={() => navigation.goBack()}>
                    <StyledIcon size={50} source={Images.icons.close} />
                </StyledTouchable>
                <StyledText i18nText={'tab.setting'} customStyle={styles.title} />
                <View style={styles.right} />
            </View>
            <SettingItem
                onPress={() => navigate(TAB_NAVIGATION_ROOT.SETTING_ROUTE.UPDATE_PROFILE)}
                title={'settings.profile'}
            />
            <SettingItem
                title={'settings.changeLang'}
                onPress={() => {
                    Alert.alert(
                        t('settings.selectLang'),
                        t('settings.multiLangSupported'),
                        [
                            {
                                text: t('settings.english'),
                                onPress: () => {
                                    dispatch(changeLanguage({ language: languageCode.english }));
                                },
                            },
                            {
                                text: t('settings.vietnamese'),
                                onPress: () => {
                                    dispatch(changeLanguage({ language: languageCode.vietnamese }));
                                },
                            },
                            {
                                text: t('common.cancel'),
                                onPress: () => {
                                    console.log('Cancel Pressed');
                                },
                                style: 'cancel',
                            },
                        ],
                        { cancelable: false },
                    );
                }}
            />
            <SettingItem title={'settings.logout'} onPress={AuthenticateService.logOut} />
            <SettingItem title={'settings.deleteAccount'} textStyle={styles.deleteAccount} onPress={onDeleteAccount} />
        </SafeAreaView>
    );
};

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        paddingLeft: '5@vs',
        paddingRight: '5@vs',
        backgroundColor: Themes.COLORS.white,
    },
    header: {
        height: '50@vs',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    right: {
        width: '50@s',
    },
    title: {
        fontSize: '22@ms0.3',
        alignSelf: 'center',
        fontWeight: 'bold',
    },
    settingItem: {
        justifyContent: 'flex-start',
        padding: '12@vs',
        borderBottomWidth: 0.5,
        borderColor: Themes.COLORS.black,
    },
    settingText: {
        fontSize: '20@s',
    },
    deleteAccount: {
        color: Themes.COLORS.red,
    },
    confirmButtonStyle: {
        color: Themes.COLORS.red,
    },
});

export default SettingView;
