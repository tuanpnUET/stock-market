/* eslint-disable no-shadow */
/* eslint-disable radix */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { StyledButton, StyledText } from 'components/base';
import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Platform, View, StyleSheet, Alert } from 'react-native';
import sizes from 'assets/sizes';
import metrics from 'assets/metrics';
import { Themes, ThemesDark } from 'assets/themes';
import { updateMessenger } from 'api/modules/api-app/messenger';
import useLoading from 'components/base/modal/useLoading';
import * as yup from 'yup';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { TAB_NAVIGATION_ROOT } from 'navigation/config/routes';
import AlertMessage from 'components/base/AlertMessage';
import StyledInputForm from 'components/base/StyledInputForm';
import { FormProvider, useForm } from 'react-hook-form';
import { requireField } from 'utilities/format';
import { yupResolver } from '@hookform/resolvers/yup';

const UpdateMessengerScreen = () => {
    const navigation = useNavigation();
    const route: any = useRoute();
    const contentRef = useRef<any>(null);
    const statusRef = useRef<any>(null);
    const { itemId, itemTitle, itemContent, itemStatus } = route.params;
    const loading = useLoading();
    const { t } = useTranslation();
    const oldStatus: any = route.params.itemStatus;
    const updateMessSchema = yup.object().shape({
        title: yup
            .string()
            .required(() => requireField('title'))
            .test(
                'len',
                t('validateMessage.titleRequired', { len: 6 }),
                (val: string | undefined) => !!val && val.length >= 6,
            ),
        content: yup
            .string()
            .required(() => requireField('content'))
            .test(
                'len',
                t('validateMessage.contentRequired', { len: 6 }),
                (val: string | undefined) => !!val && val.length >= 6,
            ),
        status: yup
            .string()
            .required(() => requireField('status'))
            .test(
                'len',
                t('validateMessage.statusRequired', { len: 1 }),
                (val: string | undefined) => !!val && (val === '1' || val === '2' || val === '3'),
            ),
    });
    const form = useForm({
        mode: 'onChange',
        resolver: yupResolver(updateMessSchema),
    });
    const {
        formState: { isValid },
        handleSubmit,
    } = form;
    const updateMess = async (form: any) => {
        const messenger = {
            title: form.title,
            content: form.content,
            status: parseInt(form.status),
        };
        const newStatus: any = messenger.status;
        try {
            await updateMessenger(itemId, messenger);
            Alert.alert(t('alert.updateSuccess'));
            navigation.navigate(TAB_NAVIGATION_ROOT.HOME_ROUTE.HOME_USER_LIST);
        } catch (error: any) {
            AlertMessage(error);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.header} />
            <View style={styles.body}>
                <StyledText customStyle={styles.title} i18nText="updateMessengerScreen.buttonUpdate" />
                <View style={styles.formUpdate}>
                    <FormProvider {...form}>
                        <StyledInputForm
                            defaultValue={itemTitle}
                            name="title"
                            label={t('updateMessengerScreen.labelTitle')}
                            returnKeyType={'next'}
                            onSubmitEditing={() => contentRef.current.focus()}
                        />
                        <StyledInputForm
                            defaultValue={itemContent}
                            name="content"
                            label={t('updateMessengerScreen.labelContent')}
                            returnKeyType={'next'}
                            onSubmitEditing={() => statusRef.current.focus()}
                        />
                        <StyledInputForm
                            defaultValue={String(itemStatus)}
                            name="status"
                            label={t('updateMessengerScreen.labelStatus')}
                            returnKeyType={'next'}
                        />
                    </FormProvider>
                </View>
            </View>
            <View style={styles.bottomContent}>
                <StyledButton
                    onPress={handleSubmit(updateMess)}
                    title={t('updateMessengerScreen.buttonUpdate')}
                    customStyle={styles.updateButton}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: ThemesDark.colors.dark,
    },
    header: {
        height: 100,
        backgroundColor: ThemesDark.colors.strongDark,
    },
    body: {
        width: metrics.screenWidth,
        alignSelf: 'center',
        paddingLeft: 24,
        paddingRight: 24,
    },
    title: {
        paddingTop: Platform.OS === 'android' ? 30 : 40,
        color: Themes.COLORS.white,
        fontSize: sizes.FONTSIZE.medium,
        fontWeight: 'bold',
    },
    formUpdate: {
        paddingTop: 36,
    },
    label: {
        paddingLeft: 24,
        marginBottom: 5,
        fontSize: sizes.FONTSIZE.large,
        color: Themes.COLORS.white,
        fontWeight: 'bold',
    },
    containerInput: {
        height: 50,
        width: metrics.screenWidth - 48,
        alignSelf: 'center',
        backgroundColor: Themes.COLORS.white,
        fontSize: sizes.FONTSIZE.moreLarge,
    },
    bottomContent: {
        alignItems: 'center',
        position: 'absolute',
        left: 24,
        bottom: 20,
        top: metrics.screenHeight * 0.8,
    },
    updateButton: {
        marginBottom: 10,
        width: metrics.screenWidth - 48,
        backgroundColor: Themes.COLORS.yellow,
        alignSelf: 'center',
        height: 52,
        borderRadius: 0,
        fontWeight: 'bold',
    },
});
export default UpdateMessengerScreen;
