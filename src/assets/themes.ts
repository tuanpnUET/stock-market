const common = {
    white: '#fff',
    transparent: 'transparent',
    black: '#000',
    placeHolderGray: 'rgba(216, 216, 216, 0.6)',
    borderInputError: '#ff0000',
    green: 'green',
    blue: '#33CCFF',
    dark: '#141829',
    coral: '#FF7F50',
    tomato: '#FF6347',
    darkOrange: '#FFB900',
    baseOrange: '#EAB838',
    moreDark: '#1C1E30',
    yellow: '#FBFF26',
    strongGray: '#353A50',
    strongDark: '#23253C',
    strongBlue: '#4E2AC3',
    red: '#ff0000',
    orange: '#ff9431',
    gray: '#858688',
    borderGray: '#7A757A',
    backgroundTestScreen: '#f0f0f0',
    backgroundQuickTest: '#E0E3FF',
    headerColor: '#A600FE',
    backgroundAnswerColor: '#E7E7FB',
};
const Light = {
    COLORS: {
        ...common,
        primary: '#4287f5',
        secondary: '#E9ECEF',
        textPrimary: '#000000',
    },
    FONTS: {
        defaultFont: 'Montserrat-Regular',
        boldFont: 'Montserrat-SemiBold',
        thinFont: 'Montserrat-Light',
    },
};

const Dark = {
    colors: {
        ...common,
        primary: '#607d8b',
    },
    fonts: {
        defaultFont: 'Montserrat-Regular',
        boldFont: 'Montserrat-SemiBold',
        thinFont: 'Montserrat-Light',
    },
};

export const Themes = Light;

export const ThemesDark = Dark;
