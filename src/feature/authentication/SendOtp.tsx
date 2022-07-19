import images from 'assets/images';
import metrics from 'assets/metrics';
import sizes from 'assets/sizes';
import { Themes } from 'assets/themes';
import { StyledButton, StyledText, StyledTouchable } from 'components/base';
import AlertMessage from 'components/base/AlertMessage';
import { AUTHENTICATE_ROUTE } from 'navigation/config/routes';
import { navigate } from 'navigation/NavigationService';
import React, { FunctionComponent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ImageBackground } from 'react-native';
import CodeInput from 'react-native-confirmation-code-input';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ScaledSheet } from 'react-native-size-matters';
import { logger } from 'utilities/helper';

const SendOTP: FunctionComponent = ({ route }: any) => {
    const [code, setCode] = useState('');
    const { t } = useTranslation();
    const { email } = route?.params;
    const [isValid, setIsValid] = useState<boolean>(false);
    const onCodeFilled = (codeVer: string) => {
        setCode(codeVer);
        setIsValid(true);
    };
    const confirm = async () => {
        try {
            if (code?.length < 5) {
                AlertMessage(t('sendOTP.invalidOTP'));
                return;
            }
            // const verifyCode = await checkVerifyCode(email, code);
            // if (verifyCode?.data?.isValid) {
            navigate(AUTHENTICATE_ROUTE.CHANGE_PASS, { email, code });
            // } else {
            //     AlertMessage(t('sendOTP.invalidOTP'));
            // }
            console.log('code', code);
            console.log('email', email);
        } catch (error: any) {
            logger(error);
            AlertMessage(error);
        }
    };
    const resendOTP = async () => {
        try {
            if (route?.params?.register) {
                // await getVerifyCode(email);
                AlertMessage(t('sendOTP.success'));
                return;
            }
            // await forgotPassword(email);
            AlertMessage(t('sendOTP.success'));
        } catch (error: any) {
            AlertMessage(error);
        }
    };
    return (
        <KeyboardAwareScrollView
            contentContainerStyle={styles.container}
            enableOnAndroid={true}
            showsVerticalScrollIndicator={false}
        >
            <ImageBackground source={images.photo.first_screen.background} style={styles.body}>
                <StyledText customStyle={styles.title} i18nText={t('sendOTP.title')} />
                <StyledText customStyle={styles.subTitle} i18nText={t('sendOTP.subTitle')} />
                <StyledTouchable onPress={resendOTP}>
                    <StyledText customStyle={styles.resend} i18nText="sendOTP.resend" />
                </StyledTouchable>
                <StyledButton
                    title={'sendOTP.buttonNext'}
                    onPress={confirm}
                    customStyle={[styles.buttonSave, !isValid && { backgroundColor: 'lightgray' }]}
                    disabled={!isValid}
                />
                <CodeInput
                    keyboardType="numeric"
                    space={10}
                    size={30}
                    activeColor={Themes.COLORS.baseOrange}
                    containerStyle={styles.otpInput}
                    codeInputStyle={styles.underlineStyleBase}
                    onFulfill={onCodeFilled}
                />
            </ImageBackground>
        </KeyboardAwareScrollView>
    );
};
const styles = ScaledSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    body: {
        width: metrics.screenWidth,
        height: metrics.screenHeight,
        paddingLeft: 24,
        paddingRight: 24,
        alignSelf: 'center',
    },
    otpInput: {
        height: '80@vs',
        top: '80@vs',
    },
    underlineStyleBase: {
        width: 45,
        height: 55,
        borderColor: Themes.COLORS.white,
        borderRadius: 15,
        color: Themes.COLORS.yellow,
        marginHorizontal: 20,
        fontSize: sizes.FONTSIZE.larger,
    },
    resend: {
        textDecorationLine: 'underline',
        color: Themes.COLORS.white,
        position: 'absolute',
        right: 20,
        top: '200@vs',
    },
    title: {
        top: 50,
        alignSelf: 'center',
        color: Themes.COLORS.white,
        fontSize: sizes.FONTSIZE.mediumLarge,
        fontWeight: 'bold',
    },
    subTitle: {
        top: 80,
        color: Themes.COLORS.white,
        fontSize: sizes.FONTSIZE.normal,
    },
    buttonSave: {
        marginTop: 20,
        backgroundColor: Themes.COLORS.baseOrange,
        borderWidth: 1,
        borderColor: Themes.COLORS.yellow,
        position: 'absolute',
        right: 40,
        top: '280@vs',
    },
});
export default SendOTP;
