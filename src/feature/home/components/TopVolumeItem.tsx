/* eslint-disable @typescript-eslint/no-unused-vars */
import Metrics from 'assets/metrics';
import { StyledText, StyledTouchable } from 'components/base';
import React, { Fragment, FunctionComponent } from 'react';
import { View } from 'react-native';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import Carousel from 'react-native-snap-carousel';
import Size from 'assets/sizes';
import { Themes, ThemesDark } from 'assets/themes';
import { useNavigation } from '@react-navigation/native';
import { TAB_NAVIGATION_ROOT } from 'navigation/config/routes';

const topVolumeData = require('assets/data/top_volume.json');

const horizontalMargin = 15;
const sliderWidth = Metrics.screenWidth;

const slideWidth = Metrics.screenWidth - horizontalMargin * 15;

const itemWidth = 250;
const scaleItemWidth = Math.round(moderateScale(itemWidth));

const TopVolumeItem: FunctionComponent = ({ ...carouselProps }: any) => {
    const navigation = useNavigation();
    const renderItem = ({ item, index }: any) => (
        <StyledTouchable
            onPress={() => {
                // go to detail
                navigation.navigate(TAB_NAVIGATION_ROOT.HOME_ROUTE.DETAIL_STOCK, item?.Symbol);
            }}
            customStyle={{ borderRightWidth: 1, borderColor: Themes.COLORS.black, left: -90 }}
        >
            <View style={{ paddingLeft: 10 }}>
                <View style={{ flexDirection: 'row' }}>
                    <StyledText
                        customStyle={[styles.symbol, { color: Themes.COLORS.black }]}
                        i18nText={'common.symbol'}
                    />
                    <StyledText customStyle={styles.symbol} originValue={`: ${item?.Symbol}`} />
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
            data={topVolumeData}
            renderItem={renderItem}
            sliderWidth={sliderWidth}
            itemWidth={slideWidth}
            containerCustomStyle={styles.containerCustomStyle}
            inactiveSlideOpacity={1}
            {...carouselProps}
        />
    );
};

const styles = ScaledSheet.create({
    slide: {
        flexDirection: 'row',
        width: `${scaleItemWidth}@s`,
        height: '120@vs',
        alignItems: 'center',
    },
    containerCustomStyle: {
        position: 'absolute',
        top: '10@vs',
        // backgroundColor: 'red',
    },
    symbol: {
        fontSize: Size.FONTSIZE.large,
        fontWeight: 'bold',
        color: Themes.COLORS.strongBlue,
    },
    prize: {
        fontSize: Size.FONTSIZE.normal,
        color: Themes.COLORS.black,
    },
    volume: {
        fontSize: Size.FONTSIZE.normal,
        color: Themes.COLORS.black,
    },
});

export default TopVolumeItem;
