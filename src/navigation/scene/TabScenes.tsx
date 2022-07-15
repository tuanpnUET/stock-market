import React from 'react';
import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Images from 'assets/images';
import { Themes } from 'assets/themes';
import { TAB_NAVIGATION_ROOT } from 'navigation/config/routes';
import { useTranslation } from 'react-i18next';
import { isIos } from 'utilities/helper';
// Screen
import HomeScreen from 'feature/home/HomeScreen';
import NotificationScreen from 'feature/notification/NotificationScreen';

import StyledTabBar from 'navigation/components/StyledTabBar';
import navigationConfigs from 'navigation/config/options';
import SettingScreen from 'feature/setting/SettingScreen';
import UpdateProfileScreen from 'feature/setting/components/UpdateProfileScreen';
import DetailStock from 'feature/home/components/DetailStock';

const MainStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

const HomeStack = () => (
    <MainStack.Navigator headerMode={'none'} screenOptions={navigationConfigs} keyboardHandlingEnabled={isIos}>
        <MainStack.Screen name={TAB_NAVIGATION_ROOT.HOME_ROUTE.HOME} component={HomeScreen} />
        <MainStack.Screen name={TAB_NAVIGATION_ROOT.HOME_ROUTE.DETAIL_STOCK} component={DetailStock} />
    </MainStack.Navigator>
);

const SettingStack = () => (
    <MainStack.Navigator headerMode={'none'} screenOptions={navigationConfigs} keyboardHandlingEnabled={isIos}>
        <MainStack.Screen name={TAB_NAVIGATION_ROOT.SETTING_ROUTE.ROOT} component={SettingScreen} />
        <MainStack.Screen name={TAB_NAVIGATION_ROOT.SETTING_ROUTE.UPDATE_PROFILE} component={UpdateProfileScreen} />
    </MainStack.Navigator>
);

const MainTabContainer = () => {
    const { t } = useTranslation();
    const ArrayTabs = [
        {
            name: TAB_NAVIGATION_ROOT.HOME_ROUTE.ROOT,
            title: t('tab.home'),
            component: HomeStack,
            icon: Images.icons.tab.home_border,
        },
        {
            name: TAB_NAVIGATION_ROOT.WATCHLIST_ROUTE.ROOT,
            title: t('tab.market'),
            component: NotificationScreen,
            icon: Images.icons.market,
        },
        {
            name: TAB_NAVIGATION_ROOT.NEWS_ROUTE.ROOT,
            title: t('tab.news'),
            component: NotificationScreen,
            icon: Images.icons.news,
        },
        {
            name: TAB_NAVIGATION_ROOT.SETTING_ROUTE.ROOT,
            title: t('tab.setting'),
            component: SettingStack,
            icon: Images.icons.setting,
        },
    ];
    return (
        <MainTab.Navigator
            tabBar={(props: BottomTabBarProps) => <StyledTabBar {...props} />}
            tabBarOptions={{
                labelStyle: { fontSize: 10 },
                style: { backgroundColor: Themes.COLORS.dark },
                activeTintColor: Themes.COLORS.yellow,
                inactiveTintColor: Themes.COLORS.white,
            }}
        >
            {ArrayTabs.map((item, index) => (
                <MainTab.Screen key={`${index}`} options={{ ...item }} {...item} />
            ))}
        </MainTab.Navigator>
    );
};

export default MainTabContainer;
