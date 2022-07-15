/* eslint-disable @typescript-eslint/no-unused-vars */
import StockList from 'feature/home/components/StockList';
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { getAllWatchlist } from 'app-redux/symbol/actions';
import { StyledText } from 'components/base';

const WatchList = (props: any) => {
    const [watchList, setWatchList] = React.useState(getAllWatchlist()) as any;
    const [stockWatchList, setStockWatchList] = React.useState([{}]) as any;

    function getData() {
        const stockToday = require('assets/data/stock_today.json');
        const symbolList: Array<any> = [];
        stockToday.forEach((stock: any) => symbolList.push(stock.Symbol));
        const newR = [{}];
        stockToday.forEach((stock: any) => {
            if (watchList.includes(stock?.Symbol)) newR.push(stock);
        });
        return newR;
    }
    React.useEffect(() => {
        setStockWatchList(getData());
    }, []);

    return (
        <View style={styles.contModalContent}>
            <Text>Watch List Screen</Text>
            <View style={{ paddingTop: 10 }}>
                {stockWatchList ? <StockList {...stockWatchList} /> : <StyledText i18nText={'watchlist.noData'} />}
            </View>
        </View>
    );
};

export default WatchList;

const styles = StyleSheet.create({
    contModalContent: {
        flex: 1, // Must have flex: 1 in here
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
