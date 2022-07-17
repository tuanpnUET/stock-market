/* eslint-disable no-underscore-dangle */
import { RootState } from 'app-redux/rootReducer';
import Images from 'assets/images';
import metrics from 'assets/metrics';
import sizes from 'assets/sizes';
import { Themes } from 'assets/themes';
import { StyledIcon, StyledImage, StyledInput, StyledText, StyledTouchable } from 'components/base';
import React from 'react';
import { View, Text } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { useSelector } from 'react-redux';
import { checkCamera, checkPhoto, showRequestPermission } from 'utilities/permissions';
import ImageUploader from 'utilities/upload/ImageUploader';

const AddNewsModal = (addModal: any) => {
    const { userInfo } = useSelector((state: RootState) => state);

    const onPickImage = async () => {
        const permission = await checkPhoto();
        if (permission) {
            let image: any = '';
            image = await ImageUploader.pickImageFromGallery();
            if (image) {
                // setImage(image?.path);
            }
        } else {
            addModal.dismiss();
            showRequestPermission('photo');
        }
    };
    const takePicture = async () => {
        const permission = await checkCamera();
        if (permission) {
            let image: any = '';
            image = await ImageUploader.chooseImageFromCamera();
            if (image) {
                // setImage(image?.path);
            }
        } else {
            addModal.dismiss();
            showRequestPermission('camera');
        }
    };
    return (
        <View style={styles.news}>
            <View style={styles.headerNews}>
                <StyledImage
                    source={userInfo?.user?.avatar ? userInfo?.user?.avatar : Images.icons.noAvatar}
                    customStyle={styles.avatar}
                />
                <Text style={styles.nameOwner}>{userInfo?.user?.name}</Text>
            </View>
            <Text style={styles.date}>{new Date().toUTCString()}</Text>
            <View style={styles.bodyNews}>
                <View style={[styles.labelInput, { flexDirection: 'row' }]}>
                    <StyledText i18nText={'addNews.title'} customStyle={styles.fontSize} />
                    <StyledText originValue={'*'} customStyle={{ color: Themes.COLORS.red }} />
                </View>
                <View style={styles.inputView}>
                    <StyledInput
                        multiline={true}
                        numberOfLines={2}
                        maxLength={100}
                        customStyle={styles.inputContent}
                        onChangeText={() => {
                            //
                        }}
                    />
                </View>
                <View style={[styles.labelInput, { flexDirection: 'row' }]}>
                    <StyledText i18nText={'addNews.content'} customStyle={styles.fontSize} />
                    <StyledText originValue={'*'} customStyle={{ color: Themes.COLORS.red }} />
                </View>
                <View style={styles.inputView}>
                    <StyledInput
                        multiline={true}
                        numberOfLines={8}
                        maxLength={1000}
                        customStyle={styles.inputContent}
                        onChangeText={() => {
                            //
                        }}
                        blurOnSubmit={false}
                    />
                </View>
            </View>
            <View style={styles.content}>
                <StyledText customStyle={styles.header} i18nText={'addNews.takePictureHeader'} />
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: '80%',
                        alignSelf: 'center',
                        marginBottom: 10,
                    }}
                >
                    <View style={styles.imageView}>
                        <StyledTouchable onPress={takePicture}>
                            <StyledIcon source={Images.icons.icSmallCamera} size={25} customStyle={styles.camera} />
                            <StyledText customStyle={styles.feature} i18nText={'addNews.takePicture'} />
                        </StyledTouchable>
                    </View>
                    <View style={styles.imageView}>
                        <StyledTouchable onPress={onPickImage}>
                            <StyledIcon source={Images.icons.icSmallLibrary} size={25} customStyle={styles.camera} />
                            <StyledText customStyle={styles.feature} i18nText={'addNews.chooseFromAlbum'} />
                        </StyledTouchable>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default AddNewsModal;

const styles = ScaledSheet.create({
    news: {
        width: metrics.screenWidth - 20,
        borderRadius: 5,
        backgroundColor: 'white',
        alignSelf: 'center',
    },
    headerNews: {
        flexDirection: 'row',
        // alignItems: 'center',
        margin: 5,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    nameOwner: {
        fontSize: sizes.FONTSIZE.large,
        fontWeight: 'bold',
        left: 5,
    },
    date: {
        fontSize: sizes.FONTSIZE.small,
        opacity: 0.5,
        left: 45,
        top: -20,
    },
    bodyNews: {
        flexDirection: 'column',
        margin: 5,
    },
    title: {
        fontSize: sizes.FONTSIZE.normal,
        fontWeight: 'bold',
        margin: 5,
    },
    content: {
        fontSize: sizes.FONTSIZE.normal,
        margin: 5,
    },
    feature: {
        textAlign: 'center',
        fontSize: '16@ms0.3',
    },
    button: {
        width: '100@s',
        alignSelf: 'center',
        marginTop: '20@s',
        marginBottom: '20@s',
        fontSize: '20@ms0.3',
    },
    camera: {
        alignSelf: 'center',
    },
    imageView: {
        marginTop: '5@vs',
        height: '60@vs',
        width: '30%',
        borderWidth: 1,
        borderColor: Themes.COLORS.black,
        borderRadius: '10@vs',
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        // backgroundColor: Themes.COLORS.baseOrange,
    },
    header: {
        textAlign: 'center',
        paddingVertical: '10@vs',
        fontSize: '20@ms0.3',
    },
    inputTitle: {
        margin: 0,
        borderWidth: 0,
        paddingVertical: 0,
        borderColor: Themes.COLORS.black,
        borderRadius: 5,
        fontSize: '18@ms0.3',
    },
    inputContent: {
        textAlign: 'justify',
        textAlignVertical: 'top',
        justifyContent: 'center',
        alignSelf: 'center',
        width: metrics.screenWidth - 30,
        margin: 3,
        borderWidth: 0,
        paddingVertical: 0,
        maxHeight: 200,
        fontSize: '18@ms0.3',
    },
    labelInput: {
        width: metrics.screenWidth - 20,
        fontSize: '18@ms0.3',
        left: 5,
    },
    inputView: {
        width: metrics.screenWidth - 40,
        flexDirection: 'column',
        alignItems: 'center',
        margin: '5@vs',
        backgroundColor: '#eeeeee',
        borderRadius: 5,
    },
    fontSize: {
        fontSize: '18@ms0.3',
        marginRight: 2,
    },
    input: {
        // width: Metrics.screenWidth * 0.7,
        margin: 0,
        borderWidth: 0,
        paddingVertical: 0,
        borderColor: Themes.COLORS.black,
        borderRadius: 5,
        fontSize: '18@ms0.3',
    },
});
