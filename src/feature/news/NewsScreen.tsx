/* eslint-disable no-shadow */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { RootState } from 'app-redux/rootReducer';
import Images from 'assets/images';
import metrics from 'assets/metrics';
import sizes from 'assets/sizes';
import { Themes, ThemesDark } from 'assets/themes';
import { StyledIcon, StyledImage, StyledList, StyledText, StyledTouchable } from 'components/base';
import useModal from 'components/base/modal/useModal';
import ConfirmModal from 'components/base/modal/ConfirmModal';
import { TAB_NAVIGATION_ROOT } from 'navigation/config/routes';
import { navigate } from 'navigation/NavigationService';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, View, Text, SafeAreaView } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import Toast from 'react-native-toast-message';
import { useSelector } from 'react-redux';
import Header from 'components/base/Header';
import AddNewsModal from './components/AddNewsModal';
import DetailNewsModal from './components/DetailNewsModal';
import EditNewsModal from './components/EditNewsModal';

export const News = (props: any) => {
    const { item, index, newsList, setNewsList } = props;
    const { userInfo } = useSelector((state: RootState) => state);
    const [like, setLike] = useState<boolean>(false);
    const [hideItem, setHideItem] = useState<boolean>(false);
    const editModal = useModal();
    const detailModal = useModal();
    const confirmModal = useModal();
    const { t } = useTranslation();

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
            children: <DetailNewsModal item={item} modal={detailModal} />,
            onBackdropPress: () => {
                detailModal.dismiss?.();
            },
        });
    };
    const deleteNews = (id: string) => {
        confirmModal.show({
            children: (
                <ConfirmModal
                    modal={confirmModal}
                    text={t('confirmModal.delete')}
                    confirmText={'common.ok'}
                    onConfirm={() => {
                        setNewsList(newsList.filter((news: any) => news.idNews !== id));
                        Toast.show({
                            type: 'success',
                            text1: t('toastMessage.deleteSuccess'),
                        });
                    }}
                />
            ),
            onBackdropPress: () => {
                confirmModal.dismiss?.();
            },
        });
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
                    <View style={{ flexDirection: 'row' }}>
                        <StyledTouchable onPress={() => editNews(item)}>
                            <View style={styles.right}>
                                <StyledIcon size={35} source={Images.icons.edit_post} />
                            </View>
                        </StyledTouchable>
                        <View style={{ width: 20 }} />
                        <StyledTouchable onPress={() => deleteNews(item?.idNews)}>
                            <View style={styles.right}>
                                <StyledIcon size={35} source={Images.icons.delete} />
                            </View>
                        </StyledTouchable>
                    </View>
                )}
                {item?.idOwner !== userInfo?.user?._id && (
                    <StyledTouchable onPress={() => setHideItem(!hideItem)}>
                        <View style={styles.right}>
                            <StyledIcon size={35} source={hideItem ? Images.icons.hide_pass : Images.icons.show_pass} />
                        </View>
                    </StyledTouchable>
                )}
            </View>
            <Text style={styles.date}>{item?.date}</Text>
            {hideItem && <StyledText i18nText={'news.hide'} customStyle={styles.hide} />}
            {!hideItem && (
                <>
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
                </>
            )}
        </View>
    );
};
const news = require('assets/data/news_list.json');

const NewsScreen = (props: any) => {
    const { userInfo } = useSelector((state: RootState) => state);
    const [newsList, setNewsList] = React.useState(news);
    const [newsListOrderByDate, setNewsListOrderByDate] = React.useState(newsList);
    const addModal = useModal();
    useEffect(() => {
        const sortByDate = (news: any) =>
            [...news].sort((a: any, b: any) => new Date(b?.date).getTime() - new Date(a?.date).getTime());
        const output = sortByDate(newsList);
        return setNewsListOrderByDate(output);
    }, [newsList]);
    const addNews = () => {
        addModal.show({
            children: <AddNewsModal modal={addModal} newsList={newsList} setNewsList={setNewsList} />,
            onBackdropPress: () => {
                addModal.dismiss?.();
            },
        });
    };

    return (
        <View style={styles.contScreen}>
            <Header />
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
                data={newsListOrderByDate}
                renderItem={({ item, index }: any) => (
                    <News item={item} index={index} newsList={newsList} setNewsList={setNewsList} />
                )}
                keyExtractor={(item: any) => `key_${item?.idNews}`}
            />
        </View>
    );
};

export default NewsScreen;

const styles = ScaledSheet.create({
    contScreen: {
        flex: 1,
        backgroundColor: ThemesDark.colors.background,
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '50@vs',
        height: '50@vs',
    },
    bar: {
        width: metrics.screenWidth - 10,
        margin: 5,
        borderRadius: 5,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5,
    },
    news: {
        width: metrics.screenWidth - 10,
        margin: 5,
        borderRadius: 5,
        backgroundColor: 'white',
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
    right: {
        marginRight: 0,
        padding: 5,
    },
    comment: {
        fontSize: sizes.FONTSIZE.large,
        fontWeight: 'bold',
    },
    hide: {
        fontSize: sizes.FONTSIZE.large,
        alignSelf: 'center',
        opacity: 0.5,
    },
});
