import React, {useState} from 'react';
import {
    View,
    Image,
    Text,
    SafeAreaView,
    Dimensions,
    RefreshControl,
    TouchableHighlight,
    FlatList
} from 'react-native';
import MainStyles from '../styles/MainStyles';
import {BallIndicator} from "react-native-indicators";

const PromotionLoader = (list, setList) => {
    return new Promise((resolve, reject) => {
        let tempList = [];
        for (let i = 0; i < 5; ++i) {
            tempList.push({
                key: i.toString(),
                pic: 'https://www.camerastuffreview.com/wp-content/uploads/2019/06/DSC0420-HDRv2.jpg',
                time: '1/2/2020 10:00 AM',
                shopName: 'Shop ' + i,
                shopPic: 'https://scontent.fcnx2-1.fna.fbcdn.net/v/t31.0-8/17547096_861275837346018_5283542374338266044_o.jpg?_nc_cat=107&_nc_sid=85a577&_nc_ohc=tJbF2NxVsKEAX_QuTpz&_nc_ht=scontent.fcnx2-1.fna&oh=96324e77938f7684f10be6879c907ff0&oe=5EB5832E',
                description: 'This is Description'
            });
        }
        setList(tempList);
        return resolve();
    })
}

function wait(timeout) {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

const PromotionsList = () => {
    const [refreshing, setRefreshing] = useState(false);
    const [list, setList] = useState({});
    const [dataPulled, setDataPulled] = useState(false);
    if (!dataPulled) {
        PromotionLoader(list, setList).then(setDataPulled(true));
    }

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
        PromotionLoader(list, setList).then(() => setRefreshing(false));
    };

    return (
        <SafeAreaView style={{height: '90%', width: '100%'}}>
            <FlatList
                data={list}
                renderItem={({item}) => {
                    return (
                        <PromotionCard pic={item.pic} shopPic={item.shopPic} title={item.shopName}
                                       description={item.description}/>
                    );
                }}
                keyExtractor={item => item.id}
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

const PromotionCard = ({pic, shopPic, title, description}) => {
    return (
        <TouchableHighlight>
            <View style={{
                flex: 1,
                width: '100%',
                paddingVertical: 10,
                borderColor: 'rgb(100,100,100)',
                borderBottomWidth: 1,
                justifyContent: 'center'
            }}>
                <View style={{marginHorizontal: 20}}>
                    <View style={{flexDirection: 'row', paddingBottom: 10}}>
                        <View>
                            <Image source={{uri: shopPic}}
                                   style={{width: 30, height: 30, borderRadius: 50}}
                                   resizeMode='cover'/>
                        </View>
                        <View style={{marginLeft: 10, justifyContent: 'center'}}>
                            <Text style={[MainStyles.bodyText, {fontFamily: 'proxima-bold'}]}>
                                {title}
                            </Text>
                        </View>
                    </View>

                    {
                        pic.length !== 0 ? (
                            <View style={{flexWrap: 'wrap', alignItems: 'right', justifyContent: 'center'}}>
                                <View style={{position: 'absolute',width: '100%',height: 300}}>
                                    <BallIndicator size={25} color={'white'}/>
                                </View>
                                <Image source={{uri: pic}}
                                       style={{width: '100%', height: 300, borderRadius: 3}}
                                       resizeMode='cover'/>
                            </View>
                        ) : null
                    }
                    <Text style={[MainStyles.bodyText, {marginTop: 10}]}>
                        {description}
                    </Text>
                </View>
            </View>
        </TouchableHighlight>
    );
};

export default PromotionsList;