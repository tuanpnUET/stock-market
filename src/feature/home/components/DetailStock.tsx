/* eslint-disable no-unused-expressions */
/* eslint-disable no-return-await */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useNavigation } from '@react-navigation/native';
import Images from 'assets/images';
import Metrics from 'assets/metrics';
import Size from 'assets/sizes';
import { Themes, ThemesDark } from 'assets/themes';
import { StyledIcon, StyledText, StyledTouchable } from 'components/base';
import useLoading from 'components/base/modal/useLoading';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { SafeAreaView, View, ScrollView, Text } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import Carousel from 'react-native-snap-carousel';
import { Calendar } from 'react-native-calendars';
import AlertMessage from 'components/base/AlertMessage';
import { LineChart } from 'react-native-gifted-charts';
import testIDs from './testIDs';

const INITIAL_DATE = '2022-03-28';
const bigData = require('assets/data/stock_data_21_22.json');
const companyData = require('assets/data/company.json');

const sliderWidth = Metrics.screenWidth;

const slideWidth = Metrics.screenWidth;
const itemWidth = Metrics.screenWidth;

const DetailStock = ({ route }: any) => {
    const [stockData, setStockData] = useState<any[]>([]);
    const [detailStock, setDetailStock] = useState() as any;
    const loading = useLoading();
    const navigation = useNavigation();
    const [selected, setSelected] = useState(INITIAL_DATE) as any;
    const [showCalendar, setShowCalendar] = useState<boolean>(false);
    const [carousel, setCarousel] = useState<any>();
    const [closeList, setCloseList] = useState<any[]>([]);

    const onDayPress = useCallback(
        (day: any) => {
            const index = checkIndexItem(day.dateString);
            setSelected(day.dateString);
            if (index >= 0) {
                carousel?.snapToItem(index, true, true);
                // setShowCalendar(false);
            } else {
                AlertMessage('Chưa có dữ liệu.');
            }
        },
        [selected],
    );

    const marked = useMemo(() => {
        return {
            [selected]: {
                selected: true,
                disableTouchEvent: true,
                selectedColor: 'orange',
                selectedTextColor: 'red',
            },
        };
    }, [selected]);

    const loadData = async () => {
        const result = await bigData.filter((stock: any) => stock?.Symbol === route?.params);
        setCloseList(closeListFunc(result));
        setStockData(result.reverse());
        const detail = await companyData.filter((company: any) => company?.ticker === route?.params);
        setDetailStock(detail[0]);
    };
    useEffect(() => {
        loading.show();
        loadData();
    }, []);

    useEffect(() => {
        if (stockData && closeList) {
            loading.dismiss();
        }
    }, [stockData, closeList]);

    function checkIndexItem(date: string) {
        return stockData.findIndex((stock: any) => stock?.Date?.substring(0, 10).includes(date));
    }
    function checkDate(index: number) {
        return stockData[index].Date?.substring(0, 10);
    }

    function closeListFunc(obj: any) {
        const result = [] as any[];
        obj.forEach((stock: any) => {
            const value = {
                value: stock?.Close?.substring(0, 7),
                date: new Date(stock?.Date).toDateString(),
            };
            result.push(value);
        });
        return result;
    }
    const renderItem = ({ item, index }: any) => {
        const beforeDate = stockData[index === 0 ? index : index - 1];
        const change = (
            ((parseFloat(item?.Close) - parseFloat(beforeDate?.Close)) / parseFloat(beforeDate?.Close)) *
            100
        ).toFixed(2);
        return (
            <StyledTouchable
                onPress={() => {
                    //
                }}
                customStyle={styles.slide}
            >
                <View style={{ alignSelf: 'center', margin: 10, width: itemWidth - 20 }}>
                    <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                        <StyledText
                            customStyle={[styles.symbol, { color: Themes.COLORS.black }]}
                            i18nText={'common.symbol'}
                        />
                        <StyledText
                            customStyle={[styles.symbol, { fontWeight: 'bold' }]}
                            originValue={` ${item?.Symbol}`}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <StyledText customStyle={styles.prize} i18nText={'common.open'} />
                            <StyledText customStyle={styles.prize} originValue={` ${item?.Open?.substring(0, 7)}`} />
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <StyledText customStyle={styles.prize} i18nText={'common.closeStock'} />
                            <StyledText
                                customStyle={
                                    (styles.prize,
                                    parseInt(item.Close, 10) >= parseInt(item.Open, 10)
                                        ? { color: 'green', fontSize: Size.FONTSIZE.large }
                                        : { color: 'red', fontSize: Size.FONTSIZE.large })
                                }
                                originValue={` ${item?.Close?.substring(0, 7)}`}
                            />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <StyledText customStyle={styles.prize} i18nText={'common.high'} />
                            <StyledText
                                customStyle={
                                    (styles.prize,
                                    parseInt(item.High, 10) >= parseInt(item.Open, 10)
                                        ? { color: 'green', fontSize: Size.FONTSIZE.large }
                                        : { color: 'red', fontSize: Size.FONTSIZE.large })
                                }
                                originValue={` ${item?.High?.substring(0, 7)}`}
                            />
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <StyledText customStyle={styles.prize} i18nText={'common.low'} />
                            <StyledText
                                customStyle={
                                    (styles.prize,
                                    parseInt(item.Low, 10) >= parseInt(item.Open, 10)
                                        ? { color: 'green', fontSize: Size.FONTSIZE.large }
                                        : { color: 'red', fontSize: Size.FONTSIZE.large })
                                }
                                originValue={` ${item?.Low?.substring(0, 7)}`}
                            />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <StyledText customStyle={styles.volume} i18nText={'common.volume'} />
                            <StyledText
                                customStyle={[styles.volume, { fontWeight: 'bold' }]}
                                originValue={` ${item?.Volume}`}
                            />
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <StyledText customStyle={styles.prize} i18nText={'common.change'} />
                            <StyledText
                                customStyle={
                                    (styles.prize,
                                    parseFloat(change) >= 0
                                        ? { color: 'green', fontSize: Size.FONTSIZE.large }
                                        : { color: 'red', fontSize: Size.FONTSIZE.large })
                                }
                                originValue={` ${change}%`}
                            />
                        </View>
                    </View>
                </View>
            </StyledTouchable>
        );
    };
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <StyledTouchable onPress={() => navigation.goBack()}>
                    <StyledIcon
                        size={50}
                        source={Images.icons.close}
                        customStyle={{ tintColor: Themes.COLORS.white }}
                    />
                </StyledTouchable>
                <StyledText i18nText={'detailStock.title'} customStyle={styles.title} />
                <View style={styles.right} />
            </View>
            <ScrollView>
                <View style={styles.companyContainer}>
                    <StyledText originValue={detailStock?.organName} customStyle={styles.companyName} />
                    <View style={{ flexDirection: 'row' }}>
                        <StyledText originValue={'Mã chứng khoán: '} customStyle={styles.sb} />
                        <StyledText originValue={detailStock?.ticker} customStyle={styles.sb} />
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <StyledText originValue={'Thị trường chứng khoán: '} customStyle={styles.sb} />
                        <StyledText originValue={detailStock?.comGroupCode} customStyle={styles.sb} />
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <StyledText
                        originValue={`Cập nhật: ${selected}`}
                        customStyle={{ fontSize: 16, color: 'white', margin: 5 }}
                    />
                    <StyledTouchable onPress={() => setShowCalendar(!showCalendar)} customStyle={{ margin: 5 }}>
                        <StyledIcon
                            size={25}
                            source={Images.icons.calender}
                            customStyle={{ tintColor: Themes.COLORS.yellow }}
                        />
                    </StyledTouchable>
                </View>

                {showCalendar && (
                    <Calendar
                        testID={testIDs.calendars.FIRST}
                        enableSwipeMonths
                        current={INITIAL_DATE}
                        style={styles.calendar}
                        onDayPress={onDayPress}
                        markedDates={marked}
                    />
                )}

                <Carousel
                    ref={(c: any) => {
                        setCarousel(c);
                    }}
                    data={stockData}
                    renderItem={renderItem}
                    sliderWidth={sliderWidth}
                    itemWidth={slideWidth}
                    containerCustomStyle={styles.containerCustomStyle}
                    inactiveSlideOpacity={1}
                    inactiveSlideScale={1}
                    onSnapToItem={(index) => setSelected(checkDate(index))}
                />
                <StyledText
                    customStyle={[styles.symbol, { color: Themes.COLORS.white, margin: 5, bottom: -20 }]}
                    i18nText={'Biểu đồ cập nhật giá đóng phiên 2021 - 2022'}
                />
                <View
                    style={{
                        paddingVertical: 10,
                        // paddingLeft: 10,
                        margin: 5,
                        paddingBottom: 50,
                        // backgroundColor: 'white',
                    }}
                >
                    <LineChart
                        areaChart
                        data={closeList}
                        width={Metrics.screenWidth - 60}
                        spacing={2}
                        thickness={2}
                        dataPointsColor={Themes.COLORS.white}
                        hideDataPoints={false}
                        startFillColor={Themes.COLORS.white}
                        endFillColor={Themes.COLORS.blue}
                        startOpacity={0.9}
                        endOpacity={0.2}
                        initialSpacing={0}
                        noOfSections={8}
                        stepHeight={50}
                        height={400}
                        maxValue={40000}
                        yAxisColor="black"
                        yAxisThickness={0}
                        rulesType="solid"
                        rulesColor="gray"
                        yAxisTextStyle={{ color: 'gray', fontSize: 10 }}
                        yAxisTextNumberOfLines={1}
                        showXAxisIndices={true}
                        dataPointsRadius={0.5}
                        dataPointsShape={'circular'}
                        isAnimated={true}
                        showScrollIndicator={true}
                        pointerConfig={{
                            pointerStripHeight: 100,
                            pointerStripColor: 'white',
                            pointerStripWidth: 2,
                            pointerColor: Themes.COLORS.red,
                            radius: 6,
                            pointerLabelWidth: 100,
                            pointerLabelHeight: 90,
                            showPointerStrip: true,
                            pointerStripUptoDataPoint: true,
                            activatePointersOnLongPress: true,
                            autoAdjustPointerLabelPosition: true,
                            pointerLabelComponent: (items: any) => {
                                return (
                                    <View
                                        style={{
                                            height: 80,
                                            width: 100,
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <Text
                                            style={{
                                                color: 'white',
                                                fontSize: 14,
                                                marginBottom: 6,
                                                textAlign: 'center',
                                            }}
                                        >
                                            {items[0].date}
                                        </Text>

                                        <View
                                            style={{
                                                paddingHorizontal: 7,
                                                paddingVertical: 3,
                                                borderRadius: 16,
                                                backgroundColor: 'white',
                                            }}
                                        >
                                            <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>
                                                {`${items[0].value} VND`}
                                            </Text>
                                        </View>
                                    </View>
                                );
                            },
                        }}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: ThemesDark.colors.dark,
    },
    header: {
        height: '50@vs',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: ThemesDark.colors.dark,
        borderBottomWidth: 0.5,
        borderColor: Themes.COLORS.white,
    },
    companyContainer: {
        paddingTop: 10,
        alignItems: 'center',
        margin: 0,
    },
    companyName: {
        fontSize: Size.FONTSIZE.normal,
        color: Themes.COLORS.white,
        margin: 5,
        fontWeight: 'bold',
    },
    sb: {
        fontSize: Size.FONTSIZE.normal,
        color: Themes.COLORS.white,
    },
    right: {
        width: '50@s',
    },
    title: {
        fontSize: '22@ms0.3',
        alignSelf: 'center',
        fontWeight: 'bold',
        color: 'white',
    },
    slide: {
        flexDirection: 'row',
        width: itemWidth,
        height: '120@vs',
        borderWidth: 1,
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor: '#eeeeee',
    },
    containerCustomStyle: {
        position: 'relative',
        // backgroundColor: 'red',
    },
    symbol: {
        fontSize: Size.FONTSIZE.large,
        color: Themes.COLORS.red,
    },
    prize: {
        fontSize: Size.FONTSIZE.large,
        color: Themes.COLORS.black,
    },
    volume: {
        fontSize: Size.FONTSIZE.large,
        color: Themes.COLORS.black,
    },
    calendar: {
        marginBottom: 10,
        borderRadius: 10,
    },
});
export default DetailStock;
