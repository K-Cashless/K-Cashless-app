import store from '../store';
import axios from 'axios';
import API_URL from '../firebase/apiLinks';
import * as actions from '../actions';

export const getAllUserData = () => {
    return new Promise(async (resolve, reject) => {
        await axios.get(API_URL.GET_USER_DATA, {'headers': {'Authorization': 'Bearer ' + store.getState().User.token}})
            .then(res => {
                console.log(res.data[0]);
                store.dispatch(actions.User.setId(res.data[0].userId));
                store.dispatch(actions.User.setFirstName(res.data[0].firstName));
                store.dispatch(actions.User.setLastName(res.data[0].lastName));
                store.dispatch(actions.User.setBalance(res.data[0].deposit));
                store.dispatch(actions.User.setKpoints(res.data[0].point));
                store.dispatch(actions.User.setEmail(res.data[0].email));
                store.dispatch(actions.User.setPhone(res.data[0].phone));
                store.dispatch(actions.User.setPic(res.data[0].imageUrl));
            })
            .catch(error => {
                reject(error);
            });
        await axios.get(API_URL.GET_TRANSACTIONS, {'headers': {'Authorization': 'Bearer ' + store.getState().User.token}})
            .then(res => {
                let arr = res.data;
                for (let i = 0; i < arr.length; ++i) {
                    arr[i] = {
                        ...arr[i],
                        key: i.toString(),
                    }
                }
                console.log(arr);
                store.dispatch(actions.User.setHistoryList(arr));
                resolve('success');
            })
            .catch(error => reject(error))
    });
};