import * as actionType from '../constants/action-const';

export const User = {
    setId: (id) => ({type: actionType.SET_USER_ID, payload: id}),
    setName: (name) => ({type: actionType.SET_USER_NAME, payload: name}),
    setBalance: (balance) => ({type: actionType.SET_USER_BALANCE, payload: balance}),
    setKpoints: (kpoints) => ({type: actionType.SET_USER_KPOINTS, payload: kpoints}),
    setNotificationsRead: (notificationsRead) => ({
        type: actionType.SET_USER_NOTIFICATIONS_READ,
        payload: notificationsRead
    }),
    setNotificationsList: (list) => ({type: actionType.SET_USER_NOTIFICATIONS_LIST, payload: list}),
    setHistoryList: (list) => ({type: actionType.SET_USER_HISTORY_LIST, payload: list})
};

