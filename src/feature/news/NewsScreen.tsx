/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { RootState } from 'app-redux/rootReducer';
import Images from 'assets/images';
import metrics from 'assets/metrics';
import sizes from 'assets/sizes';
import { Themes } from 'assets/themes';
import { StyledIcon, StyledImage, StyledList, StyledText, StyledTouchable } from 'components/base';
import { TAB_NAVIGATION_ROOT } from 'navigation/config/routes';
import { navigate } from 'navigation/NavigationService';
import React from 'react';
import { StyleSheet, View, Text, SafeAreaView } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { ScaledSheet } from 'react-native-size-matters';
import { useSelector } from 'react-redux';

const News = (props: any) => {
    const { userInfo } = useSelector((state: RootState) => state);
    const handleLike = () => {
        //
    };
    const editNews = (id: string) => {
        //
    };
    const detailNews = (id: string) => {
        //
    };
    return (
        <View style={styles.news}>
            <View style={styles.headerNews}>
                <StyledImage source={props?.avatarOwner} customStyle={styles.avatar} />
                <Text style={styles.nameOwner}>{props?.nameOwner}</Text>
                {props?.idOwner === userInfo?.user?._id && (
                    <StyledTouchable onPress={() => editNews(props?.idNews)}>
                        <View style={styles.edit}>
                            <StyledIcon size={35} source={Images.icons.edit} />
                        </View>
                    </StyledTouchable>
                )}
            </View>
            <Text style={styles.date}>{props?.date}</Text>
            <View style={styles.bodyNews}>
                <Text style={styles.title}>{props?.title}</Text>
                <Text style={styles.content}>{props?.content}</Text>
                {props?.image && <StyledImage source={props?.image} customStyle={styles.image} />}
            </View>
            <View style={styles.footer}>
                <StyledTouchable onPress={() => handleLike()}>
                    <StyledIcon size={30} source={Images.icons.liked} />
                </StyledTouchable>
                <StyledTouchable onPress={() => detailNews(props?.id)}>
                    <StyledText i18nText={'news.comment'} customStyle={styles.comment} />
                </StyledTouchable>
            </View>
        </View>
    );
};

const NewsScreen = (props: any) => {
    const { userInfo } = useSelector((state: RootState) => state);
    const [newsList, setNewsList] = React.useState([]);
    const addNews = () => {
        //
    };
    return (
        <SafeAreaView style={styles.contScreen}>
            <View style={styles.header}>
                <View style={styles.center} />
                <StyledText i18nText={'common.stockMarket'} customStyle={styles.titleText} />
                <StyledTouchable
                    customStyle={styles.center}
                    onPress={() => navigate(TAB_NAVIGATION_ROOT.SETTING_ROUTE.ROOT)}
                >
                    <StyledIcon source={Images.icons.menu} size={20} />
                </StyledTouchable>
            </View>
            <View style={styles.bar}>
                <StyledImage
                    source={userInfo?.user?.avatar ? userInfo?.user?.avatar : Images.icons.noAvatar}
                    customStyle={styles.avatar}
                />
                <StyledTouchable onPress={() => addNews()}>
                    <StyledText i18nText={'news.addNews'} customStyle={styles.content} />
                    <StyledIcon size={35} source={Images.icons.edit} />
                </StyledTouchable>
            </View>
            <StyledList
                data={newsList}
                renderItem={({ item, index }: any) => <News {...item} index={index} />}
                keyExtractor={(item: any) => item?.id}
            />
        </SafeAreaView>
    );
};

export default NewsScreen;

const styles = ScaledSheet.create({
    contScreen: {
        flex: 1,
        backgroundColor: Themes.COLORS.white,
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
    bar: {
        width: metrics.screenWidth,
        margin: 5,
        borderRadius: 5,
        backgroundColor: '#eeeeee',
        flexDirection: 'row',
    },
    news: {
        width: metrics.screenWidth,
        margin: 5,
        borderRadius: 5,
        backgroundColor: '#eeeeee',
    },
    headerNews: {
        flexDirection: 'row',
    },
    avatar: {
        width: '40@s',
        height: '40@s',
        borderRadius: 20,
    },
    nameOwner: {
        fontSize: sizes.FONTSIZE.large,
        fontWeight: 'bold',
    },
    date: {
        fontSize: sizes.FONTSIZE.small,
        opacity: 0.5,
    },
    bodyNews: {
        paddingTop: '10@vs',
        flexDirection: 'column',
    },
    title: {
        fontSize: sizes.FONTSIZE.normal,
        fontWeight: 'bold',
    },
    content: {
        fontSize: sizes.FONTSIZE.normal,
    },
    image: {
        width: metrics.screenWidth,
        height: '200@vs',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    edit: {
        right: 10,
    },
    comment: {
        fontSize: sizes.FONTSIZE.large,
        fontWeight: 'bold',
    },
});
