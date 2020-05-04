import React, {useEffect, useState} from 'react';
import {Alert, Dimensions, FlatList, Image, RefreshControl, SafeAreaView, Text, View} from 'react-native';
import MainStyles from '../styles/MainStyles';
import {BallIndicator} from "react-native-indicators";
import API_URL from '../firebase/apiLinks';
import axios from 'axios';

const PromotionLoader = (list, setList) => {
    // TODO - firebase
    return new Promise((resolve) => {
        axios.get(API_URL.GET_PROMOTIONS)
            .then((res) => {
                console.log(res.data);
                const temp = (res.data);
                temp.push({createdAt: '-1', end: true});
                setList(temp);

            })
            .catch(error => {
                console.log(error.response);
                Alert.alert('Error Trying to Fetch Promotions', 'Please Try Again');
            });

        return resolve();
    });
};

const PromotionsList = ({topBarLayout}) => {
    const [refreshing, setRefreshing] = useState(false);
    const [list, setList] = useState([]);

    const ListEmptyComponent = () => {
        return (
            <View style={{height: Dimensions.get('window').height / 4, justifyContent: 'flex-end'}}>
                <Text
                    style={{
                        textAlign: 'center',
                        color: 'rgb(150,150,150)',
                        fontFamily: 'proxima-regular',
                        fontSize: 25
                    }}>
                    No Promotions
                </Text>
            </View>
        )
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await PromotionLoader(list, setList).then(() => setRefreshing(false));
    };

    useEffect(() => {
        setRefreshing(true);
        PromotionLoader(list, setList).then(() => setRefreshing(false));
    }, []);

    const windowHeight = Dimensions.get('screen').height;
    const topBarHeight = (topBarLayout.height === undefined) ? 0 : topBarLayout.height;
    const viewHeight = windowHeight - 60 - (windowHeight * 0.05) - 10 - topBarHeight;
    return (
        <SafeAreaView style={{height: viewHeight, width: '100%'}}>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={list}
                renderItem={({item}) => {
                    return (
                        <PromotionCard end={item.end} pic={null} shopPic={null} title={item.header}
                                       description={item.description}/>
                    );
                }}
                keyExtractor={item => item.createdAt}
                refreshControl={
                    <RefreshControl
                        tintColor='white'
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
                ListEmptyComponent={ListEmptyComponent}
            />
        </SafeAreaView>
    )

};

const PromotionCard = ({end, pic, shopPic, title, description}) => {
    const windowDimension = Dimensions.get('window').width;
    if (end) {
        return (
            <View style={{
                height: Dimensions.get('window').height / 4,
                width: '100%',
                alignItems: 'center',
                justifyContent: 'flex-start'
            }}>
                <View style={{
                    marginTop: 20,
                    width: 15,
                    height: 15,
                    borderRadius: 30,
                    backgroundColor: 'rgb(100,100,100)'
                }}/>
            </View>
        )
    }

    return (
        <View style={{
            flex: 1,
            width: '100%',
            paddingVertical: 10,
            borderColor: 'rgb(100,100,100)',
            borderBottomWidth: 1,
            justifyContent: 'center'
        }}>
            <View>
                <View style={{marginHorizontal: 20, flexDirection: 'row', paddingBottom: 10}}>
                    {
                        shopPic &&
                        <View>
                            <Image source={{uri: shopPic}}
                                   style={{width: 30, height: 30, borderRadius: 50}}
                                   resizeMode='cover'/>
                        </View>
                    }

                    <View style={{marginLeft: shopPic && 10, justifyContent: 'center'}}>
                        <Text style={[MainStyles.bodyText, {fontFamily: 'proxima-bold'}]}>
                            {title}
                        </Text>
                    </View>
                </View>

                {
                    pic && (
                        <View style={{
                            flexWrap: 'wrap',
                            width: windowDimension,
                            height: windowDimension,
                            alignItems: 'flex-end',
                            justifyContent: 'center'
                        }}>
                            <View style={{position: 'absolute', width: windowDimension}}>
                                <BallIndicator size={25} color={'white'}/>
                            </View>
                            <Image source={{uri: pic}}
                                   style={{width: windowDimension, height: windowDimension}}
                                   resizeMode='cover'/>
                        </View>
                    )
                }
                <Text style={[MainStyles.bodyText, {marginHorizontal: 20, marginTop: 10}]}>
                    {description}
                </Text>
            </View>
        </View>
    );
};

export default PromotionsList;