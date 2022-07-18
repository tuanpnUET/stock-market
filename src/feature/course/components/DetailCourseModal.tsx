import Images from 'assets/images';
import metrics from 'assets/metrics';
import sizes from 'assets/sizes';
import { StyledIcon, StyledImage, StyledText, StyledTouchable } from 'components/base';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, Text, View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import WebView from 'react-native-webview';

const DetailCourseModal = (props: any) => {
    const { t } = useTranslation();
    const { item, modal } = props;
    return (
        <ScrollView style={styles.container}>
            <View style={styles.headerNews}>
                <StyledImage style={styles.avt} source={{ uri: item?.authorAvatar }} />
                <Text style={styles.title}>{item?.title}</Text>
                <StyledTouchable onPress={() => modal?.dismiss()} customStyle={{ position: 'absolute', right: 0 }}>
                    <StyledIcon size={40} source={Images.icons.close} />
                </StyledTouchable>
            </View>
            <View style={styles.body}>
                {item?.urlBanner && <StyledImage source={{ uri: item?.urlBanner }} customStyle={styles.img} />}
                <Text style={styles.content}>{item?.description}</Text>
                <WebView style={{ flex: 1, height: 200 }} javaScriptEnabled={true} source={{ uri: item?.urlCourse }} />
            </View>
            <View style={styles.footer}>
                <StyledText
                    customStyle={styles.date}
                    i18nText={t('courseScreen.createdAt', { value: item?.createdAt })}
                />
                <StyledText
                    i18nText={t('courseScreen.author', { value: item?.authorName })}
                    customStyle={styles.author}
                />
            </View>
        </ScrollView>
    );
};

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        width: metrics.screenWidth - 30,
        backgroundColor: '#eeeeee',
        borderRadius: 10,
        alignSelf: 'center',
    },
    headerNews: {
        width: '100%',
        height: '70@vs',
        justifyContent: 'center',
    },
    title: {
        width: metrics.screenWidth - 70,
        fontSize: sizes.FONTSIZE.large,
        fontWeight: 'bold',
        position: 'absolute',
        margin: 5,
        left: 50,
        paddingRight: 50,
    },
    body: {
        top: 5,
    },
    img: {
        width: metrics.screenWidth - 30,
        height: '220@vs',
    },
    content: {
        fontSize: sizes.FONTSIZE.normal,
        left: 5,
        margin: 5,
    },
    date: {
        fontSize: sizes.FONTSIZE.normal,
    },
    author: {
        fontSize: sizes.FONTSIZE.normal,
        fontWeight: 'bold',
    },
    avt: {
        width: 40,
        height: 40,
        borderRadius: 20,
        margin: 10,
    },
    footer: {
        flexDirection: 'row',
        paddingTop: 10,
        margin: 5,
        justifyContent: 'space-between',
        width: metrics.screenWidth - 40,
    },
});
export default DetailCourseModal;
