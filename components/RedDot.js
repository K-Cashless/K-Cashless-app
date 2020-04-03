import React from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';


const RedDot = ({haveUnread}) => {
    return (
        <View>
            {(haveUnread) ? (
                <View style={{
                    position: 'absolute',
                    width: 5,
                    height: 5,
                    borderRadius: 15,
                    backgroundColor: 'red',
                    alignSelf: 'center',
                }}/>
            ) : null}
        </View>
    )
};

function mapStateToProps(state) {
    return {
        haveUnread: state.User.notifications.haveUnread
    }
}

export default connect(mapStateToProps)(RedDot);