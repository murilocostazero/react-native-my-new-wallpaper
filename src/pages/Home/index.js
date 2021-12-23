import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableHighlight, ActivityIndicator, FlatList, Image, Keyboard, Modal } from 'react-native';
import { fetchGetImages, fetchGetImagesByQuery } from '../../handlers/handleImages';
import { generalStyles, colors } from '../../styles';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Home({ navigation }) {
    const [query, setQuery] = useState('');
    const [tempQuery, setTempQuery] = useState('');
    const [images, setImages] = useState([]);
    const [loadingImages, setLoadingImages] = useState(false);

    useEffect(() => {
        getImages();
    }, []);

    async function getImages() {
        setTempQuery('');

        setLoadingImages(true);
        const fetchedImages = await fetchGetImages();
        // console.log(fetchedImages);
        setImages(fetchedImages.photos);
        setLoadingImages(false);
    }

    async function getImagesByQuery() {
        Keyboard.dismiss();

        setTempQuery(query);
        setLoadingImages(true);
        const fetchedImages = await fetchGetImagesByQuery(query);
        // console.log(fetchedImages);
        setImages(fetchedImages.photos);

        setQuery('');
        setLoadingImages(false);
    }

    function onSelectingImage(image) {
        navigation.navigate('ImageView', { image: image })
    }

    function renderImages({ item }) {
        return (
            <TouchableHighlight
                underlayColor='transparent'
                onPress={() => onSelectingImage(item)} >
                <View style={[{
                    backgroundColor: colors.background,
                    width: 140,
                    margin: 4,
                    borderTopRightRadius: 8,
                    borderTopLeftRadius: 8
                }, generalStyles.shadow]}>
                    <Image
                        source={{ uri: item.src.medium }}
                        resizeMode='cover'
                        style={{
                            width: 140,
                            height: 130,
                            borderTopRightRadius: 8,
                            borderTopLeftRadius: 8
                        }} />
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: 4
                    }}>
                        <Ionicons name='camera-outline' size={22} color={colors.icon} />
                        <Text
                            numberOfLines={1}
                            style={[
                                generalStyles.primaryLabel, {
                                    width: 80,
                                    fontWeight: 'bold'
                                }
                            ]}>
                            {item.photographer}
                        </Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }

    return (
        <View style={generalStyles.container}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: 4
            }}>
                <TextInput
                    placeholder='House, Brasil, Frutas...'
                    placeholderTextColor={colors.icon}
                    value={query}
                    onChangeText={(text) => setQuery(text)}
                    onSubmitEditing={() => getImagesByQuery()}
                    style={[
                        generalStyles.primaryTextInput,
                        generalStyles.shadow
                    ]}
                />
                <TouchableHighlight
                    underlayColor={colors.accent}
                    onPress={() => getImagesByQuery()}
                    style={[
                        generalStyles.searchButton, {
                            marginLeft: 8
                        }
                    ]} >
                    <Ionicons
                        name='search-outline'
                        color={colors.icon}
                        size={26}
                    />
                </TouchableHighlight>
            </View>

            <View style={generalStyles.container}>
                {
                    tempQuery == '' ?
                        <Text
                            style={[
                                generalStyles.primaryLabel, {
                                    textAlign: 'center',
                                    fontStyle: 'italic',
                                    marginVertical: 8
                                }
                            ]}>
                            Busque por um termo e clique na imagem
                        </Text> :
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: 8
                        }}>
                            <Text
                                style={[
                                    generalStyles.primaryLabel, {
                                        textAlign: 'center',
                                        fontStyle: 'italic',
                                        marginRight: 4
                                    }
                                ]}>
                                Exibindo resultados para {tempQuery}
                            </Text>
                            <TouchableHighlight
                                onPress={() => getImages()}
                                underlayColor='transparent'>
                                <Ionicons name='trash-bin-outline' size={22} color={colors.icon} />
                            </TouchableHighlight>
                        </View>
                }
                {
                    loadingImages ?
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <ActivityIndicator size='large' color={colors.accent} />
                        </View> :
                        <FlatList
                            data={images}
                            keyExtractor={item => item.id}
                            renderItem={renderImages}
                            numColumns={2}
                            contentContainerStyle={{ alignItems: 'center' }}
                            ListFooterComponent={
                                tempQuery == '' ?
                                    <TouchableHighlight
                                        onPress={() => getImages()}
                                        style={[generalStyles.primaryButton, {
                                            marginTop: 16
                                        }]}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Text style={[generalStyles.primaryLabel, {
                                                color: colors.text.primaryLight,
                                                fontWeight: 'bold',
                                                marginRight: 4
                                            }]}>Mais imagens</Text>
                                            <Ionicons name='refresh-outline' size={22} color={colors.icon} />
                                        </View>
                                    </TouchableHighlight> :
                                    <View />
                            } />
                }
            </View>

        </View>
    )
}
