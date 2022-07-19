/* eslint-disable @typescript-eslint/no-unused-vars */
import Metrics from 'assets/metrics';
import { StyledText, StyledTouchable } from 'components/base';
import React, { Fragment, FunctionComponent, useState } from 'react';
import { View } from 'react-native';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import Carousel from 'react-native-snap-carousel';
import Size from 'assets/sizes';
import { Themes, ThemesDark } from 'assets/themes';
import { useNavigation } from '@react-navigation/native';
import { TAB_NAVIGATION_ROOT } from 'navigation/config/routes';
import useModal from 'components/base/modal/useModal';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'app-redux/rootReducer';
import ConfirmModal from 'components/base/modal/ConfirmModal';
import { addToWatchlist, removeFromWatchlist } from 'app-redux/symbol/actions';
import { useTranslation } from 'react-i18next';
import Toast from 'react-native-toast-message';

const topVolumeData = require('assets/data/top_volume.json');

const horizontalMargin = 15;
const sliderWidth = Metrics.screenWidth;

const slideWidth = Metrics.screenWidth / 2;
const itemWidth = 200;
const scaleItemWidth = Math.round(moderateScale(itemWidth)) - 15;

const TopVolumeItem: FunctionComponent = ({ ...carouselProps }: any) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const modal = useModal();
    const { symbolReducer } = useSelector((state: RootState) => state);
    const [watchList, setWatchList] = useState(symbolReducer?.watchList) as any[];

    const checkWatchListHas = (symbol: string) => {
        if (watchList.includes(symbol)) {
            return true;
        }
        return false;
    };

    const renderItem = ({ item, index }: any) => (
        <StyledTouchable
            onPress={() => {
                // go to detail
                navigation.navigate(TAB_NAVIGATION_ROOT.HOME_ROUTE.DETAIL_STOCK, item?.Symbol);
            }}
            onLongPress={() => {
                // check watchlist to add or remove
                if (checkWatchListHas(item?.Symbol)) {
                    modal.show({
                        children: (
                            <ConfirmModal
                                text={t('confirmModal.remove')}
                                confirmText={'common.ok'}
                                modal={modal}
                                onConfirm={() => {
                                    dispatch(removeFromWatchlist(item?.Symbol));
                                    Toast.show({
                                        type: 'success',
                                        text1: t('toastMessage.removeSuccess'),
                                        text2: '',
                                    });
                                }}
                            />
                        ),
                        onBackdropPress: () => {
                            modal.dismiss();
                        },
                    });
                } else {
                    modal.show({
                        children: (
                            <ConfirmModal
                                text={t('confirmModal.addToWatchlist')}
                                confirmText={'common.ok'}
                                modal={modal}
                                onConfirm={() => {
                                    dispatch(addToWatchlist(item?.Symbol));
                                    Toast.show({
                                        type: 'success',
                                        text1: t('toastMessage.addSuccess'),
                                        text2: '',
                                    });
                                }}
                            />
                        ),
                        onBackdropPress: () => {
                            modal.dismiss();
                        },
                    });
                }
            }}
            customStyle={styles.slide}
        >
            <View style={{ paddingLeft: 5 }}>
                <View style={{ flexDirection: 'row' }}>
                    <StyledText
                        customStyle={[styles.symbol, { color: Themes.COLORS.white }]}
                        i18nText={'common.symbol'}
                    />
                    <StyledText customStyle={styles.symbol} originValue={` ${item?.Symbol}`} />
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <StyledText customStyle={styles.volume} i18nText={'common.volume'} />
                    <StyledText customStyle={styles.volume} originValue={`: ${item?.Volume}`} />
                </View>
            </View>
        </StyledTouchable>
    );
    return (
        <Carousel
            autoplay={true}
            sliderHeight={60}
            itemHeight={60}
            enableMomentum={false}
            lockScrollWhileSnapping={true}
            loop={true}
            data={topVolumeData}
            renderItem={renderItem}
            sliderWidth={sliderWidth}
            itemWidth={slideWidth}
            containerCustomStyle={styles.containerCustomStyle}
            inactiveSlideOpacity={1}
            inactiveSlideScale={1}
            inverted
            horizontal
            useNativeDriver
            autoplayDelay={3000}
            autoplayInterval={3000}
            {...carouselProps}
        />
    );
};

const styles = ScaledSheet.create({
    slide: {
        flexDirection: 'row',
        width: `${scaleItemWidth}@s`,
        height: '60@vs',
        margin: 5,
        left: -90,
        borderWidth: 1,
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor: Themes.COLORS.dark,
    },
    containerCustomStyle: {
        position: 'relative',
        // backgroundColor: 'red',
    },
    symbol: {
        fontSize: Size.FONTSIZE.large,
        fontWeight: 'bold',
        color: Themes.COLORS.blue,
    },
    prize: {
        fontSize: Size.FONTSIZE.normal,
        color: Themes.COLORS.white,
    },
    volume: {
        fontSize: Size.FONTSIZE.normal,
        color: Themes.COLORS.white,
    },
});

export default TopVolumeItem;
