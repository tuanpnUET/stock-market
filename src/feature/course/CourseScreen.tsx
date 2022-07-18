/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, FunctionComponent } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Text } from 'native-base';
import { Searchbar } from 'react-native-paper';

import { StyledIcon, StyledImage, StyledList, StyledText, StyledTouchable } from 'components/base';
import { ScaledSheet } from 'react-native-size-matters';
import metrics from 'assets/metrics';
import Images from 'assets/images';
import { useTranslation } from 'react-i18next';
import { navigate } from 'navigation/NavigationService';
import { TAB_NAVIGATION_ROOT } from 'navigation/config/routes';
import { Themes } from 'assets/themes';
import sizes from 'assets/sizes';
import { removeVietnameseTones } from 'utilities/validate';
import useModal from 'components/base/modal/useModal';
import CategoryFilter from './components/CategoryFilter';
import DetailCourseModal from './components/DetailCourseModal';

const coursesList = require('assets/data/courses.json');
const categoriesList = require('assets/data/category_courses.json');

export const Course = (props: any) => {
    const detailCourseModal = useModal();
    const { item } = props;

    const openDetailCourseModal = () => {
        detailCourseModal.show({
            children: <DetailCourseModal item={item} modal={detailCourseModal} />,
            onBackdropPress: () => {
                detailCourseModal.dismiss();
            },
        });
    };

    return (
        <TouchableOpacity style={styles.containerCourse} onPress={openDetailCourseModal}>
            {item?.urlBanner && <StyledImage source={{ uri: item?.urlBanner }} customStyle={styles.img} />}
            <View style={styles.footer}>
                <Text style={styles.title}>{item?.title}</Text>
                <Text style={styles.date}>{item?.createdAt}</Text>
            </View>
        </TouchableOpacity>
    );
};

const CourseScreen: FunctionComponent = () => {
    const { t } = useTranslation();
    const [courses, setCourses] = useState(coursesList);
    const [initialState, setInitialState] = useState(coursesList);
    const [categories, setCategories] = useState(categoriesList);
    const [active, setActive] = useState<number>(-1);
    const [txtSearch, setTxtSearch] = useState('');

    useEffect(() => {
        searchCourse(txtSearch);
        if (txtSearch === '') setCourses(initialState);
    }, [txtSearch]);

    const updateSearch = (search: string) => {
        setTxtSearch(search);
    };

    // search
    const searchCourse = (txt: string) => {
        if (txt !== '') {
            setCourses(
                courses.filter(
                    (course: any) =>
                        removeVietnameseTones(course?.title.toLowerCase()).search(
                            removeVietnameseTones(txt.toLowerCase()),
                        ) !== -1,
                ),
            );
        } else setCourses(initialState);
    };

    // set course by category
    const changeCtg = (ctg: string) => {
        if (ctg === 'All') setCourses(initialState);
        else setCourses(initialState.filter((course: any) => course?.category === ctg));
    };
    return (
        <>
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
            <Searchbar
                value={txtSearch}
                inputStyle={{ backgroundColor: '#EEEEEE', marginLeft: 12, borderRadius: 25 }}
                style={styles.searchBar}
                onChangeText={updateSearch}
                icon={Images.icons.search}
                clearIcon={Images.icons.close}
                placeholder={t('common.search')}
                onIconPress={() => updateSearch}
            />
            <CategoryFilter
                categories={categories}
                categoryFilter={changeCtg}
                courses={courses}
                active={active}
                setActive={setActive}
            />
            {courses.length > 0 ? (
                <View style={{ flex: 1, position: 'relative' }}>
                    <StyledList
                        data={courses}
                        renderItem={({ item, index }: any) => <Course item={item} index={index} />}
                        keyExtractor={(item: any) => item?.id}
                    />
                </View>
            ) : (
                <View>
                    <StyledText i18nText={t('courseScreen.noCourse')} customStyle={styles.noCourse} />
                </View>
            )}
        </>
    );
};

const styles = ScaledSheet.create({
    container: {
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
    listContainer: {
        width: '100%',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        backgroundColor: 'gainsboro',
    },
    searchBar: {
        paddingLeft: 10,
    },
    imgBg: {
        width: metrics.screenWidth * 0.9,
    },
    noCourse: {
        fontSize: sizes.FONTSIZE.normal,
        opacity: 0.5,
        alignSelf: 'center',
        top: 20,
    },
    containerCourse: {
        height: '220@vs',
        backgroundColor: 'gainsboro',
        width: metrics.screenWidth - 10,
        borderRadius: 10,
        margin: 5,
    },
    img: {
        width: metrics.screenWidth - 10,
        height: '150@vs',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    footer: {
        height: '50@vs',
    },
    title: {
        fontSize: sizes.FONTSIZE.large,
        fontWeight: 'bold',
        margin: 3,
        left: 5,
    },
    date: {
        fontSize: sizes.FONTSIZE.normal,
        opacity: 0.5,
        top: -5,
        left: 5,
    },
});
export default CourseScreen;
