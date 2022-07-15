/* eslint-disable @typescript-eslint/no-unused-vars */
import sizes from 'assets/sizes';
import { Themes } from 'assets/themes';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { useDispatch } from 'react-redux';
import useModal from 'components/base/modal/useModal';
import ConfirmModal from 'components/base/modal/ConfirmModal';
import { addToWatchlist, getAllWatchlist, removeFromWatchlist } from 'app-redux/symbol/actions';
import { TAB_NAVIGATION_ROOT } from 'navigation/config/routes';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const StockItem = (props: any) => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const modal = useModal();
    const [symbolWatchlist] = useState(getAllWatchlist());
    console.log('symbolwatchlist', symbolWatchlist);

    const checkWatchListHas = (symbol: string) => {
        // if (symbolWatchlist?.includes(symbol)) {
        //     return true;
        // }
        return false;
    };

    return (
        <View>
            <TouchableOpacity
                onPress={() => navigation.navigate(TAB_NAVIGATION_ROOT.HOME_ROUTE.DETAIL_STOCK, props?.Symbol)}
                onLongPress={(stock: any) => {
                    // check watchlist to add or remove
                    if (checkWatchListHas(stock?.Symbol)) {
                        modal.show({
                            children: (
                                <ConfirmModal
                                    text={'confirmModal.addToWatchlist'}
                                    confirmText={'common.ok'}
                                    modal={modal}
                                    onConfirm={dispatch(addToWatchlist(stock?.Symbol))}
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
                                    text={'confirmModal.removeFromWatchlist'}
                                    confirmText={'common.ok'}
                                    modal={modal}
                                    onConfirm={dispatch(removeFromWatchlist(stock?.Symbol))}
                                />
                            ),
                            onBackdropPress: () => {
                                modal.dismiss();
                            },
                        });
                    }
                }}
            >
                <View
                    style={[
                        styles.row,
                        props?.index % 2 === 0 ? { backgroundColor: 'white' } : { backgroundColor: 'gainsboro' },
                    ]}
                >
                    <Text style={[styles.item, { color: Themes.COLORS.strongBlue, fontWeight: 'bold' }]}>
                        {props?.Symbol}
                    </Text>
                    <Text style={styles.item} numberOfLines={1} ellipsizeMode="tail">
                        {props?.Open}
                    </Text>
                    <Text
                        style={[
                            styles.item,
                            parseInt(props.High, 10) >= parseInt(props.Open, 10)
                                ? { color: 'green' }
                                : { color: 'red' },
                        ]}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                    >
                        {props?.High}
                    </Text>
                    <Text
                        style={[
                            styles.item,
                            parseInt(props.Low, 10) >= parseInt(props.Open, 10) ? { color: 'green' } : { color: 'red' },
                        ]}
                    >
                        {props.Low}
                    </Text>
                    <Text
                        style={[
                            styles.item,
                            parseInt(props.Close, 10) >= parseInt(props.Open, 10)
                                ? { color: 'green' }
                                : { color: 'red' },
                        ]}
                    >
                        {props.Close}
                    </Text>
                    <Text style={styles.item} numberOfLines={1} ellipsizeMode="tail">
                        {props.Volume}
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = ScaledSheet.create({
    row: {
        flexDirection: 'row',
        padding: 2,
        width,
        left: 2,
        height: '30@vs',
        justifyContent: 'center',
        alignItems: 'center',
    },
    item: {
        width: width / 6.2,
        fontSize: sizes.FONTSIZE.miniLarge,
    },
});

export default StockItem;
