/* eslint-disable @typescript-eslint/no-unused-vars */
import StockList from 'feature/home/components/StockList';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { getAllWatchlist } from 'app-redux/symbol/actions';
import { StyledIcon, StyledText, StyledTouchable } from 'components/base';
import { SafeAreaView } from 'react-native-safe-area-context';
import sizes from 'assets/sizes';
import { Themes } from 'assets/themes';
import Images from 'assets/images';
import { ScaledSheet } from 'react-native-size-matters';
import { navigate } from 'navigation/NavigationService';
import { TAB_NAVIGATION_ROOT } from 'navigation/config/routes';
import { useSelector } from 'react-redux';
import { RootState } from 'app-redux/rootReducer';
import { useIsFocused } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

const WatchList = (props: any) => {
    const isFocused = useIsFocused();
    const { symbolReducer } = useSelector((state: RootState) => state);
    const [watchList, setWatchList] = useState(symbolReducer?.watchList) as any[];
    const [stockWatchList, setStockWatchList] = React.useState([{}]) as any[];

    function getData() {
        const stockToday = require('assets/data/stock_today.json');
        const symbolList: Array<any> = [];
        stockToday.forEach((stock: any) => symbolList.push(stock.Symbol));
        const newR: any[] = [];
        const newWatchList = watchList.filter(
            (symbol: any) => symbol !== '' && symbol !== undefined && symbol !== null,
        );
        stockToday.forEach((stock: any) => {
            if (newWatchList.includes(stock?.Symbol)) newR.push(stock);
        });
        setStockWatchList(newR);
    }
    useEffect(() => {
        if (isFocused && symbolReducer?.watchList) setWatchList(symbolReducer?.watchList);
    }, [isFocused, symbolReducer?.watchList]);

    useEffect(() => {
        if (isFocused) getData();
    }, [watchList]);

    return (
        <SafeAreaView style={styles.watchList}>
            <View>
                <View style={styles.header}>
                    {/* <StyledTouchable
                    customStyle={styles.center}
                    onPress={() => navigate(TAB_NAVIGATION_ROOT.HOME_ROUTE.HOME)}
                >
                    <StyledIcon source={Images.icons.close} size={50} />
                </StyledTouchable> */}
                    <View style={styles.center} />
                    <StyledText i18nText={'watchlist.title'} customStyle={styles.title} />
                    <StyledTouchable
                        customStyle={styles.center}
                        onPress={() => navigate(TAB_NAVIGATION_ROOT.SETTING_ROUTE.ROOT)}
                    >
                        <StyledIcon source={Images.icons.menu} size={20} />
                    </StyledTouchable>
                </View>
                {stockWatchList.length === 0 && (
                    <StyledText i18nText={'watchlist.noData'} customStyle={styles.noData} />
                )}
                {stockWatchList && <StockList data={stockWatchList} />}
            </View>
        </SafeAreaView>
    );
};

export default WatchList;

const styles = ScaledSheet.create({
    watchList: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: '5@s',
    },
    title: {
        alignSelf: 'center',
        fontSize: '22@ms0.3',
        fontWeight: 'bold',
    },
    noData: {
        fontSize: sizes.FONTSIZE.normal,
        color: Themes.COLORS.red,
        margin: 5,
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '50@vs',
        height: '50@vs',
    },
});
