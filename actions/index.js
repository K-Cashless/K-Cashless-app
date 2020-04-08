import * as actionType from '../constants/action-const';

export const User = {
    setId: (id) => ({type: actionType.SET_USER_ID, payload: id}),
    setPic: (uri) => ({type: actionType.SET_USER_PIC, payload: uri}),
    setName: (name) => ({type: actionType.SET_USER_NAME, payload: name}),
    setBalance: (balance) => ({type: actionType.SET_USER_BALANCE, payload: balance}),
    setKpoints: (kpoints) => ({type: actionType.SET_USER_KPOINTS, payload: kpoints}),
    setNotificationsUnread: (notificationsRead) => ({
        type: actionType.SET_USER_NOTIFICATIONS_READ,
        payload: notificationsRead
    }),
    setNotificationsList: (list) => ({type: actionType.SET_USER_NOTIFICATIONS_LIST, payload: list}),
    pushNotificationsList: (list) => ({type: actionType.PUSH_USER_NOTIFICATIONS_LIST, payload: list}),
    setHistoryList: (list) => ({type: actionType.SET_USER_HISTORY_LIST, payload: list})
};

