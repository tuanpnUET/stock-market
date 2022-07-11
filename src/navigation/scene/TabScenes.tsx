import React from 'react';
import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Images from 'assets/images';
import { Themes } from 'assets/themes';
import { TAB_NAVIGATION_ROOT } from 'navigation/config/routes';
import { useTranslation } from 'react-i18next';
import { isIos } from 'utilities/helper';
// Screen
import HomeDataScreen from 'feature/home/HomeDataScreen';
import HomeDetailScreen from 'feature/home/HomeDetailScreen';
import HomeScreen from 'feature/home/HomeScreen';
import HomeUserListScreen from 'feature/home/HomeUserListScreen';
import NotificationScreen from 'feature/notification/NotificationScreen';
import UpdateMessengerScreen from 'feature/home/UpdateMessengerScreen';

import SettingView from 'feature/setting/SettingScreen';
import StyledTabBar from 'navigation/components/StyledTabBar';
import navigationConfigs from 'navigation/config/options';

const MainStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

const HomeStack = () => (
    <MainStack.Navigator headerMode={'none'} screenOptions={navigationConfigs} keyboardHandlingEnabled={isIos}>
        <MainStack.Screen name={TAB_NAVIGATION_ROOT.HOME_ROUTE.HOME} component={HomeScreen} />
        <MainStack.Screen name={TAB_NAVIGATION_ROOT.HOME_ROUTE.HOME_DETAIL} component={HomeDetailScreen} />
        <MainStack.Screen name={TAB_NAVIGATION_ROOT.HOME_ROUTE.WEB_VIEW} component={HomeDetailScreen} />
        <MainStack.Screen name={TAB_NAVIGATION_ROOT.HOME_ROUTE.HOME_DATA} component={HomeDataScreen} />
        <MainStack.Screen name={TAB_NAVIGATION_ROOT.HOME_ROUTE.HOME_USER_LIST} component={HomeUserListScreen} />
        <MainStack.Screen name={TAB_NAVIGATION_ROOT.HOME_ROUTE.UPDATE_MESSENGER} component={UpdateMessengerScreen} />
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
            name: TAB_NAVIGATION_ROOT.NOTIFICATION_ROUTE.ROOT,
            title: t('tab.news'),
            component: NotificationScreen,
            icon: Images.icons.news,
        },
        {
            name: TAB_NAVIGATION_ROOT.SETTING_ROUTE.ROOT,
            title: t('tab.market'),
            component: SettingView,
            icon: Images.icons.market,
        },
        {
            name: TAB_NAVIGATION_ROOT.ACCOUNT_ROUTE.ROOT,
            title: t('tab.setting'),
            component: SettingView,
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
