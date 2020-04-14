import React, {useEffect, useState} from 'react';
import {Dimensions, FlatList, Image, RefreshControl, SafeAreaView, Text, View} from 'react-native';
import MainStyles from '../styles/MainStyles';
import {BallIndicator} from "react-native-indicators";

const msg = "Kagonoya Buffet Delivery 15 ถาดเริ่มต้นที่ 699.- สไตล์โอซาก้าแท้ๆ";

const PromotionLoader = (list, setList) => {
    // TODO - firebase
    return new Promise((resolve) => {
        let tempList = [];
        let i;
        for (i = 0; i < 5; ++i) {
            tempList.push({
                id: i.toString(),
                pic: 'https://scontent.fcnx2-1.fna.fbcdn.net/v/t1.0-9/92392559_3225470824155915_4525602040453267456_o.jpg?_nc_cat=1&_nc_sid=8024bb&_nc_ohc=JFIrHP1jFeMAX-xIcYP&_nc_ht=scontent.fcnx2-1.fna&oh=2f3a801cd263dc40dd8a704d1111dad2&oe=5EB454FD',
                time: '1/2/2020 10:00 AM',
                shopName: 'Shop ' + i,
                shopPic: 'https://scontent.fcnx2-1.fna.fbcdn.net/v/t1.0-9/64642155_2447997465236592_9186722105960431616_n.jpg?_nc_cat=1&_nc_sid=85a577&_nc_ohc=J76Ok3XRLbMAX9z3dSe&_nc_ht=scontent.fcnx2-1.fna&oh=c0991a6489f5cb7e80de36e7fe7d148b&oe=5EB689E4',
                description: msg,
                end: false
            });
        }
        tempList.push({
            id: i.toString(),
            pic: '',
            time: '',
            shopName: '',
            shopPic: '',
            description: '',
            end: true
        }); // add dummy for end space
        console.log(tempList);
        setList(tempList);
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
        PromotionLoader(list, setList).then(() => setRefreshing(false));
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
                        <PromotionCard end={item.end} pic={item.pic} shopPic={item.shopPic} title={item.shopName}
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
                            <View style={{position: 'absolute', width: windowDimension, height: windowDimension}}>
                                <BallIndicator size={25} color={'white'}/>
                            </View>
                            <Image source={{uri: pic}}
                                   style={{width: windowDimension, height: windowDimension}}
                                   resizeMode='cover'/>
                        </View>
                    ) : null
                }
                <Text style={[MainStyles.bodyText, {marginHorizontal: 20, marginTop: 10}]}>
                    {description}
                </Text>
            </View>
        </View>
    );
};

export default PromotionsList;