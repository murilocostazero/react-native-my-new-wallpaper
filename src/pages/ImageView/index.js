import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableHighlight, ActivityIndicator } from 'react-native';
import { colors, generalStyles } from '../../styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fetchGetSingleImage } from '../../handlers/handleImages';
import ManageWallpaper, { TYPE } from 'react-native-manage-wallpaper';

export default function ImageView({ navigation, route }) {
    const [imageReceived, setImageReceived] = useState(null);
    const [imagePath, setImagePath] = useState(null);
    const [loadingImages, setLoadingImages] = useState(false);

    const [settingWallpaper, setSettingWallpaper] = useState(false);
    const [settingLockscreen, setSettingLockscreen] = useState(false);

    const [showStatusBar, setShowStatusBar] = useState(false);
    const [statusBarMessage, setStatusBarMessage] = useState('');

    useEffect(() => {
        getImage(route.params.image.id)
    }, []);

    async function getImage(imageId) {
        setLoadingImages(true);
        const fetchedImage = await fetchGetSingleImage(imageId);
        setImageReceived(fetchedImage);

        setLoadingImages(false);
    }

    function setWallpaper() {
        setSettingWallpaper(true);

        ManageWallpaper.setWallpaper(
            {
                uri: imageReceived.src.original
            },
            (res) => {
                res.status == 'success' ? handleWallpaperSetted() : handleStatusBar('Erro ao definir wallpaper');
            },
            TYPE.HOME,
        );
    }

    function handleWallpaperSetted() {
        setSettingWallpaper('ok');

        setTimeout(() => {
            setSettingWallpaper(false);
        }, 1500);
    }

    function setLockscreen() {
        setSettingLockscreen(true);

        ManageWallpaper.setWallpaper(
            {
                uri: imageReceived.src.original
            },
            (res) => {
                res.status == 'success' ? handleLockscreenSetted() : handleStatusBar('Erro ao definir tela de bloqueio');
            },
            TYPE.LOCK,
        );
    }

    function handleLockscreenSetted() {
        setSettingLockscreen('ok');

        setTimeout(() => {
            setSettingLockscreen(false);
        }, 1500);
    }

    function handleStatusBar(message) {
        setStatusBarMessage(message);
        setShowStatusBar(true);

        setTimeout(() => {
            setShowStatusBar(false);
        }, 1500);
    }

    //COMPONENTS

    function Header() {
        return (
            <View style={{
                backgroundColor: colors.backgroundColor,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <TouchableHighlight
                    underlayColor='transparent'
                    onPress={() => navigation.goBack()} >
                    <Ionicons name='chevron-back-outline' size={32} color={colors.icon} />
                </TouchableHighlight>
            </View>
        );
    }

    function ImageContainer() {
        return (
            <View style={[generalStyles.container, {
                justifyContent: 'center'
            }]}>

                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Ionicons
                        style={{ marginRight: 8 }}
                        name='person-circle-outline'
                        size={32}
                        color={colors.icon} />
                    <Text style={[generalStyles.primaryLabel, {
                        fontWeight: '700',
                        fontSize: 14
                    }]}>
                        Fotógrafo: {imageReceived.photographer}
                    </Text>
                </View>

                <Image
                    source={{ uri: imageReceived.src.large }}
                    style={{
                        width: '100%',
                        height: '60%',
                        marginVertical: 16,
                        borderRadius: 8
                    }}
                    resizeMode='cover' />

                <View>
                    <TouchableHighlight
                        onPress={() => setWallpaper()}
                        style={[generalStyles.primaryButton, {
                            marginTop: 8
                        }]}>

                        {
                            settingWallpaper == 'ok' ?
                                <Ionicons name='checkmark-outline' color='#FFF' size={32} /> :
                                settingWallpaper == true ?
                                    <ActivityIndicator size='large' color='#FFF' /> :
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Text style={[
                                            generalStyles.primaryLabel, {
                                                color: colors.text.primaryLight,
                                                fontWeight: 'bold',
                                                marginRight: 4
                                            }
                                        ]}>Usar como papel de parede</Text>
                                        <Ionicons
                                            name='image-outline'
                                            color={colors.icon}
                                            size={22} />
                                    </View>

                        }

                    </TouchableHighlight>

                    <TouchableHighlight
                        onPress={() => setLockscreen()}
                        style={[generalStyles.primaryButton, {
                            marginTop: 8
                        }]}>
                        {
                            settingLockscreen == 'ok' ?
                                <Ionicons name='checkmark-outline' color='#FFF' size={32} /> :
                                settingLockscreen == true ?
                                    <ActivityIndicator size='large' color='#FFF' /> :
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Text style={[
                                            generalStyles.primaryLabel, {
                                                color: colors.text.primaryLight,
                                                fontWeight: 'bold',
                                                marginRight: 4
                                            }
                                        ]}>Usar como tela de bloqueio</Text>
                                        <Ionicons name='lock-closed-outline' color={colors.icon} size={22} />
                                    </View>
                        }
                    </TouchableHighlight>
                </View>
            </View>
        );
    }

    function StatusBar() {
        return (
            <View style={{
                width: '100%',
                height: 48,
                backgroundColor: '#f44336',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 16
            }}>
                <Text style={[
                    generalStyles.primaryLabel, {
                        color: colors.text.primaryLight,
                        fontWeight: 'bold'
                    }
                ]}>
                    {statusBarMessage}
                </Text>
            </View>
        );
    }

    return (
        <View style={generalStyles.container}>
            <Header />

            {
                loadingImages || imageReceived == null ?
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <ActivityIndicator size='large' color={colors.accent} />
                    </View> :
                    <ImageContainer />
            }

            {
                showStatusBar ?
                    <StatusBar /> :
                    <View />
            }

        </View>
    )
}
