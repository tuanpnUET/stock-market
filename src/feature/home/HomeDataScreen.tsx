/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-shadow */
import React, { FunctionComponent } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Themes } from 'assets/themes';
import { ScaledSheet } from 'react-native-size-matters';
import StyledTouchable from 'components/base/StyledTouchable';
import StyledIcon from 'components/base/StyledIcon';
import StyledText from 'components/base/StyledText';
import Images from 'assets/images';
import TreeView from 'react-native-final-tree-view';
import sizes from 'assets/sizes';
import Svg, { Line } from 'react-native-svg';

const amela = [
    {
        id: 'amela',
        name: 'AMELA',
        des: 'AG',
        children: [
            {
                id: 'amela vn',
                name: 'AMELA VN',
                year: 2019,
                children: [
                    {
                        id: 'solution',
                        name: 'Solution',
                        year: 2019,
                        children: [
                            {
                                id: 'design',
                                name: 'Design',
                            },
                            {
                                id: 'ba',
                                name: 'BA',
                            },
                        ],
                    },
                    {
                        id: 'hades',
                        name: 'Hades',
                        year: 2019,
                    },
                    {
                        id: 'hulk',
                        name: 'Hulk',
                        year: 2019,
                    },
                    {
                        id: 'hulk2',
                        name: 'Hulk',
                        year: 2019,
                    },
                    {
                        id: 'hulk3',
                        name: 'Hulk',
                        year: 2019,
                    },
                    {
                        id: 'hulk4',
                        name: 'Hulk',
                        year: 2019,
                    },
                    {
                        id: 'hulk5',
                        name: 'Hulk',
                        year: 2019,
                    },
                ],
            },
            {
                id: 'amela jp',
                name: 'AMELA JP',
                year: 2019,
            },
        ],
    },
];
export const WrapperItem = ({ name, year, des, childrenCount, level }: any) => {
    return (
        <View
            style={[
                styles.wrapper,
                level === 0 && { borderColor: 'orange' },
                level === 1 && { borderColor: '#33CC33' },
                level === 2 && { borderColor: '#33CC33' },
                level === 3 && { borderColor: '#66CCFF' },
            ]}
        >
            {year && (
                <View style={styles.wrapperYear}>
                    <Text style={styles.txtYear}>{year || 2022}</Text>
                </View>
            )}
            <View style={{ flexDirection: 'row' }}>
                <View
                    style={[
                        styles.des,
                        level === 0 && { borderColor: 'orange', backgroundColor: '#FFCC99' },
                        level === 1 && { borderColor: '#33CC33', backgroundColor: '#99FFCC' },
                        level === 2 && { borderColor: '#33CC33', backgroundColor: '#99FFCC' },
                        level === 3 && { borderColor: '#66CCFF', backgroundColor: '#CCFFFF' },
                    ]}
                >
                    <Text
                        style={[
                            styles.desTxt,
                            level === 0 && { color: 'orange' },
                            level === 1 && { color: '#33CC33' },
                            level === 2 && { color: '#33CC33' },
                            level === 3 && { color: '#66CCFF' },
                        ]}
                    >
                        {des || childrenCount || 0}
                    </Text>
                </View>
                <View style={styles.name}>
                    <Text style={styles.txtName}>{name || 'abc'}</Text>
                </View>
            </View>
        </View>
    );
};
const HomeDataScreen: FunctionComponent = ({ navigation }: any) => {
    const [isExpanded, setIsExpanded] = React.useState<boolean>();
    const [hasChildrenNodes, setHasChidlrenNodes] = React.useState<boolean>();
    const [specialNode, setSpecialNode] = React.useState<boolean>();
    const treeReft = React.useRef<boolean>(false);
    const [activeOpacityNode, setActiveOpacityNode] = React.useState<number>();
    const [idKey, setIdKey] = React.useState<number>(0);
    const [childrenKey, setChildrenKey] = React.useState<number>(0);
    const [initialExpanded, setInitialExpanded] = React.useState<boolean>(true);
    const onNodePress = () => {
        //
    };
    const onNodeLongPress = () => {
        //
    };
    const getIndicator = (isExpanded: boolean, hasChildrenNodes: boolean, node: any, level: any) => {
        if (!hasChildrenNodes) {
            return (
                <WrapperItem
                    name={node?.name}
                    year={node?.year}
                    des={node?.des}
                    childrenCount={node?.children?.length}
                    level={level}
                />
            );
        }
        if (isExpanded) {
            return (
                <WrapperItem
                    name={node?.name}
                    year={node?.year}
                    des={node?.des}
                    childrenCount={node?.children?.length}
                    level={level}
                />
            );
        }
        return (
            <WrapperItem
                name={node?.name}
                year={node?.year}
                des={node?.des}
                childrenCount={node?.children?.length}
                level={level}
            />
        );
    };
    const isNodeExpanded = (idKey: any) => {
        //
        return true;
    };
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <StyledTouchable
                    onPress={() => {
                        navigation.goBack();
                    }}
                    customStyle={styles.iconClose}
                >
                    <StyledIcon source={Images.icons.back} size={40} customStyle={{ tintColor: Themes.COLORS.white }} />
                </StyledTouchable>
                <StyledText i18nText={'Sơ đồ phòng ban'} customStyle={styles.defaultHeader} />
            </View>
            <ScrollView style={styles.content}>
                <TreeView
                    initialExpanded={initialExpanded}
                    data={amela}
                    onNodePress={onNodePress}
                    activeOpacityNode={activeOpacityNode}
                    renderNode={({ node, level, isExpanded, hasChildrenNodes }: any) => {
                        console.log('level - node', level, node);
                        if (level === 0) {
                            return (
                                <View style={{ alignItems: 'center', marginVertical: 8 }}>
                                    <WrapperItem
                                        name={node?.name}
                                        year={node?.year}
                                        des={node?.des}
                                        childrenCount={node?.children?.length}
                                        level={level}
                                    />
                                    {hasChildrenNodes && (
                                        <Svg height="20" width="20">
                                            <Line
                                                x1="50%"
                                                y1="0"
                                                x2="50%"
                                                y2="100%"
                                                stroke={'orange'}
                                                strokeWidth={1}
                                            />
                                        </Svg>
                                    )}
                                    <Svg height="10" width="50%">
                                        <Line x1="0%" y1="0%" x2="100%" y2="0%" stroke={'orange'} strokeWidth={2} />
                                        {hasChildrenNodes && node?.children.length !== 1 && (
                                            <Line
                                                x1="0%"
                                                y1={'0%'}
                                                x2="0%"
                                                y2={'100%'}
                                                stroke={'orange'}
                                                strokeWidth={2}
                                            />
                                        )}
                                        {/* Left side horizontal line */}
                                        {hasChildrenNodes && node?.children.length !== 1 && (
                                            <Line
                                                x1="100%"
                                                y1={'0%'}
                                                x2="100%"
                                                y2={'100%'}
                                                stroke={'orange'}
                                                strokeWidth={2}
                                            />
                                        )}
                                    </Svg>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                        }}
                                    >
                                        {node.children.map((nodeLevel1: any) => {
                                            return (
                                                <WrapperItem
                                                    key={`${nodeLevel1?.name}${nodeLevel1?.year}`}
                                                    name={nodeLevel1?.name}
                                                    year={nodeLevel1?.year}
                                                    des={nodeLevel1?.des}
                                                    childrenCount={nodeLevel1?.children?.length}
                                                    level={level + 1}
                                                />
                                            );
                                        })}
                                    </View>
                                </View>
                            );
                        }

                        if (level === 2)
                            return (
                                <View
                                    style={{
                                        marginLeft: 50,
                                    }}
                                >
                                    {getIndicator(isExpanded, hasChildrenNodes, node, level)}
                                </View>
                            );
                        if (level === 3)
                            return (
                                <View
                                    style={{
                                        marginLeft: 70,
                                    }}
                                >
                                    {getIndicator(isExpanded, hasChildrenNodes, node, level)}
                                </View>
                            );
                        return <View />;
                    }}
                />
            </ScrollView>
        </View>
    );
};

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    header: {
        height: '70@vs',
        padding: '10@s',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
    },
    wrapper: {
        width: '150@s',
        height: '40@vs',
        borderRadius: '20@s',
        borderWidth: 1,
        margin: 5,
    },
    des: {
        width: '34@vs',
        height: '34@vs',
        borderRadius: '18@vs',
        borderWidth: 1,
        position: 'absolute',
        borderColor: 'black',
        margin: 1,
        color: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: '#CCFFFF',
    },
    desTxt: {
        color: 'black',
        fontSize: '10@ms0.3',
    },
    wrapperYear: {
        position: 'absolute',
        right: 10,
        top: -5,
        backgroundColor: '#33CC33',
        borderRadius: '5@s',
        paddingHorizontal: 4,
    },
    txtYear: {
        fontSize: '10@ms0.3',
        color: 'white',
    },
    name: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 2,
    },
    txtName: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: '12@ms0.3',
    },
    iconClose: {
        left: '10@s',
        position: 'absolute',
        zIndex: 100,
    },
    defaultHeader: {
        fontSize: '20@ms0.3',
        alignSelf: 'center',
        textAlign: 'center',
        color: 'white',
        width: '100%',
        fontWeight: 'bold',
    },
    content: {
        flex: 1,
        backgroundColor: 'white',
        borderTopRightRadius: '40@vs',
        borderTopLeftRadius: '40@vs',
        paddingTop: '20@vs',
    },
    scene: {
        paddingHorizontal: 5,
        flexGrow: 1,
    },
    itemContainer: {
        height: 100,
        backgroundColor: Themes.COLORS.green,
    },
});

export default HomeDataScreen;
