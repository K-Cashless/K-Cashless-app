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

const msg = "🍲 Kagonoya Buffet Delivery 15 ถาดเริ่มต้นที่ 699.- สไตล์โอซาก้าแท้ๆ";

const PromotionLoader = (list, setList) => {
    // TODO - firebase
    return new Promise((resolve, reject) => {
        let tempList = [];
        for (let i = 0; i < 5; ++i) {
            tempList.push({
                key: i.toString(),
                pic: 'https://scontent.fcnx2-1.fna.fbcdn.net/v/t1.0-9/92392559_3225470824155915_4525602040453267456_o.jpg?_nc_cat=1&_nc_sid=8024bb&_nc_ohc=JFIrHP1jFeMAX-xIcYP&_nc_ht=scontent.fcnx2-1.fna&oh=2f3a801cd263dc40dd8a704d1111dad2&oe=5EB454FD',
                time: '1/2/2020 10:00 AM',
                shopName: 'Shop ' + i,
                shopPic: 'https://scontent.fcnx2-1.fna.fbcdn.net/v/t1.0-9/64642155_2447997465236592_9186722105960431616_n.jpg?_nc_cat=1&_nc_sid=85a577&_nc_ohc=J76Ok3XRLbMAX9z3dSe&_nc_ht=scontent.fcnx2-1.fna&oh=c0991a6489f5cb7e80de36e7fe7d148b&oe=5EB689E4',
                description: msg
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