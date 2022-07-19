/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-alert */
import React, { Fragment, FunctionComponent, useEffect, useState } from 'react';
import { Text, View, Button, StyleSheet, ViewBase } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useModal from 'components/base/modal/useModal';
import StyledHeader from 'components/common/StyledHeader';
import { TAB_NAVIGATION_ROOT } from 'navigation/config/routes';
import useLoading from 'components/base/modal/useLoading';
import { wait } from 'utilities/helper';
import StyledPicker from 'components/base/picker/StyledPicker';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'app-redux/rootReducer';
import { getUserInfo } from 'app-redux/userInfo/actions';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyledIcon, StyledText, StyledTouchable } from 'components/base';
import { navigate } from 'navigation/NavigationService';
import Images from 'assets/images';
import { ScaledSheet } from 'react-native-size-matters';
import axios from 'axios';
import Header from 'components/base/Header';
import { Themes, ThemesDark } from 'assets/themes';
import TopVolumeItem from './components/TopVolumeItem';
import StockList from './components/StockList';

const StockToday = require('assets/data/stock_today.json');

interface StockProps {
    Symbol?: string;
    Open?: string;
    Close: string;
    Low: string;
    High: string;
    Volume: number;
    Date: string;
}

const pagingStockToday = StockToday.slice(0, 20) as StockProps[];

const HomeScreen: FunctionComponent = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    // const { userInfo } = useSelector((state: RootState) => state);
    const navigation = useNavigation();
    const modal = useModal();
    // const getData = async () => {
    //     const data = await axios.get('https://fiin-core.ssi.com.vn/Master/GetListOrganization');
    //     const fakeData = require('assets/data/stock_data_18_22.json');

    //     const result = fakeData.filter(
    //         (dat: any) =>
    //             // eslint-disable-next-line no-unused-expressions
    //             dat?.Date === '2022-03-28T00:00:00Z',
    //     );

    //     const stockToday = require('assets/data/stock_today.json');
    //     const symbolList: Array<any> = [];
    //     stockToday.forEach((stock: any) => symbolList.push(stock.Symbol));
    //     const newR = [{}];
    //     const stockSymbols = require('assets/data/stock_symbols.json');
    //     stockSymbols.forEach((stock: any) => {
    //         if (symbolList.includes(stock?.ticker)) newR.push(stock);
    //     });
    //     const sortByUpdatedAt = (stocks: any) => [...stocks].sort((a: any, b: any) => b?.Volume - a?.Volume);
    //     const output = sortByUpdatedAt(stockToday);
    // };
    // useEffect(() => {
    //     getData();
    // }, []);

    return (
        <SafeAreaView style={styles.contScreen}>
            <Header />
            <View>
                <StyledText i18nText={'stock.highestVolume'} customStyle={styles.highestVolume} />
            </View>
            <View style={{ paddingTop: 10, height: 70 }}>
                <TopVolumeItem />
            </View>
            <View>
                <StyledText i18nText={'stock.stockToday'} customStyle={styles.stockToday} />
            </View>
            <View style={{ paddingTop: 10 }}>
                <StockList data={pagingStockToday} />
            </View>
        </SafeAreaView>
    );
};

const styles = ScaledSheet.create({
    contScreen: {
        flex: 1,
        backgroundColor: ThemesDark.colors.background,
    },
    highestVolume: {
        top: 5,
        fontSize: '20@ms0.3',
        // fontWeight: 'bold',
        color: Themes.COLORS.white,
        left: 10,
    },
    stockToday: {
        fontSize: '20@ms0.3',
        // fontWeight: 'bold',
        color: Themes.COLORS.white,
        left: 10,
    },
});

export default HomeScreen;
