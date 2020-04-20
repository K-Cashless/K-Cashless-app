import React, {useState} from 'react';
import {Text, TouchableHighlight, View} from 'react-native';
import {BallIndicator} from "react-native-indicators";

const TransparentButton = ({onPress, text, style}) => {
    const [isLoading, setIsLoading] = useState(false);

    function onPressAction() {
        setIsLoading(true);
        onPress()
            .then(() => setIsLoading(false))
            .catch(() => setIsLoading(false));
    }

    return (
        <View style={{marginTop: 20, alignItems: 'flex-end'}}>
            <TouchableHighlight
                underlayColor='rgba(150,150,150,0.5)'
                onPress={onPressAction}
                style={[{
                    width: 100,
                    height: 40,
                    borderRadius: 80,
                    alignItems: 'center',
                    justifyContent: 'center'
                }, style]}
            >
                {
                    isLoading ? (
                        <BallIndicator color={'white'} size={20}/>
                    ) : (
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Text style={{
                                fontFamily: 'proxima-bold',
                                fontSize: 20,
                                color: 'white'
                            }}>{text}</Text>
                        </View>
                    )
                }
            </TouchableHighlight>
        </View>
    )
};

export default TransparentButton;