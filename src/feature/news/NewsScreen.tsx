/* eslint-disable no-shadow */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { RootState } from 'app-redux/rootReducer';
import Images from 'assets/images';
import metrics from 'assets/metrics';
import sizes from 'assets/sizes';
import { Themes } from 'assets/themes';
import { StyledIcon, StyledImage, StyledList, StyledText, StyledTouchable } from 'components/base';
import useModal from 'components/base/modal/useModal';
import { TAB_NAVIGATION_ROOT } from 'navigation/config/routes';
import { navigate } from 'navigation/NavigationService';
import React, { useState } from 'react';
import { Image, View, Text, SafeAreaView } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { useSelector } from 'react-redux';
import AddNewsModal from './components/AddNewsModal';
import DetailNewsModal from './components/DetailNewsModal';
import EditNewsModal from './components/EditNewsModal';

export const News = (props: any) => {
    const { item, index, newsList, setNewsList } = props;
    const { userInfo } = useSelector((state: RootState) => state);
    const [like, setLike] = useState<boolean>(false);
    const editModal = useModal();
    const detailModal = useModal();
    const handleLike = () => {
        //
    };
    const editNews = (item: any) => {
        editModal.show({
            children: <EditNewsModal {...item} modal={editModal} newsList={newsList} setNewsList={setNewsList} />,
            onBackdropPress: () => {
                editModal.dismiss?.();
            },
        });
        //
    };
    const detailNews = (item: any) => {
        detailModal.show({
            children: <DetailNewsModal modal={detailModal} newsList={newsList} setNewsList={setNewsList} />,
            onBackdropPress: () => {
                detailModal.dismiss?.();
            },
        });
        //
    };
    return (
        <View style={styles.news}>
            <View style={styles.headerNews}>
                {item?.avatarOwner !== null && item?.avatarOwner !== undefined && (
                    <Image source={{ uri: item?.avatarOwner }} style={styles.avatar} />
                )}
                {!item?.avatarOwner && <Image source={Images.icons.noAvatar} style={styles.avatar} />}
                <Text style={styles.nameOwner}>{item?.nameOwner}</Text>
                {item?.idOwner === userInfo?.user?._id && (
                    <StyledTouchable onPress={() => editNews(item)}>
                        <View style={styles.edit}>
                            <StyledIcon size={35} source={Images.icons.edit} />
                        </View>
                    </StyledTouchable>
                )}
            </View>
            <Text style={styles.date}>{item?.date}</Text>
            <View style={styles.bodyNews}>
                <Text style={styles.title}>{item?.title}</Text>
                <Text style={styles.content}>{item?.content}</Text>
                {item?.image && <Image source={{ uri: item?.image }} style={styles.image} />}
            </View>
            <View style={styles.footer}>
                <StyledTouchable onPress={() => setLike(!like)}>
                    <StyledIcon size={30} source={like ? Images.icons.liked : Images.icons.unlike} />
                </StyledTouchable>
                <StyledTouchable onPress={() => detailNews(item)}>
                    <StyledText i18nText={'news.comment'} customStyle={styles.comment} />
                </StyledTouchable>
            </View>
        </View>
    );
};
const news = require('assets/data/news_list.json');

const NewsScreen = (props: any) => {
    const { userInfo } = useSelector((state: RootState) => state);
    const [newsList, setNewsList] = React.useState(news);
    const addModal = useModal();
    const addNews = () => {
        addModal.show({
            children: <AddNewsModal modal={addModal} newsList={newsList} setNewsList={setNewsList} />,
            onBackdropPress: () => {
                addModal.dismiss?.();
            },
        });
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
                <StyledTouchable
                    customStyle={styles.center}
                    onPress={() => navigate(TAB_NAVIGATION_ROOT.SETTING_ROUTE.ROOT)}
                >
                    <StyledImage
                        source={userInfo?.user?.avatar ? userInfo?.user?.avatar : Images.icons.noAvatar}
                        customStyle={styles.avatar}
                    />
                </StyledTouchable>
                <StyledTouchable onPress={() => addNews()}>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <StyledText i18nText={'news.addNews'} customStyle={styles.content} />
                        <StyledIcon size={40} source={Images.icons.edit} />
                    </View>
                </StyledTouchable>
            </View>
            <StyledList
                data={newsList.reverse()}
                renderItem={({ item, index }: any) => (
                    <News item={item} index={index} newsList={newsList} setNewsList={setNewsList} />
                )}
                keyExtractor={(item: any) => `key_${item?.idNews}`}
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
        width: metrics.screenWidth - 10,
        margin: 5,
        borderRadius: 5,
        backgroundColor: '#eeeeee',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5,
    },
    news: {
        width: metrics.screenWidth - 10,
        margin: 5,
        borderRadius: 5,
        backgroundColor: '#eeeeee',
        padding: 5,
    },
    headerNews: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        // alignItems: 'center',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    nameOwner: {
        fontSize: sizes.FONTSIZE.large,
        fontWeight: 'bold',
        position: 'absolute',
        left: 45,
    },
    date: {
        fontSize: sizes.FONTSIZE.small,
        opacity: 0.5,
        left: 45,
        top: -20,
    },
    bodyNews: {
        flexDirection: 'column',
    },
    title: {
        fontSize: sizes.FONTSIZE.normal,
        fontWeight: 'bold',
        margin: 5,
    },
    content: {
        fontSize: sizes.FONTSIZE.normal,
        margin: 5,
    },
    image: {
        width: metrics.screenWidth - 20,
        height: '200@vs',
        borderRadius: 10,
    },
    footer: {
        margin: 5,
        width: metrics.screenWidth - 80,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'center',
    },
    edit: {
        marginRight: 0,
        // position: 'absolute',
        backgroundColor: 'green',
    },
    comment: {
        fontSize: sizes.FONTSIZE.large,
        fontWeight: 'bold',
    },
});
