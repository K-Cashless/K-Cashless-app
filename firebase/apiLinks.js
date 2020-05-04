const API_URL = {
    SIGN_UP: 'https://asia-east2-k-cash-less.cloudfunctions.net/api/signup',
    SIGN_IN: 'https://asia-east2-k-cash-less.cloudfunctions.net/api/login',
    SIGN_OUT: 'https://asia-east2-k-cash-less.cloudfunctions.net/api/logout',
    FORGET_PASSWORD: 'https://asia-east2-k-cash-less.cloudfunctions.net/api/resetPass',
    GET_USER_DATA: 'https://asia-east2-k-cash-less.cloudfunctions.net/api/getUserData',
    TOP_UP: 'https://asia-east2-k-cash-less.cloudfunctions.net/api/prepaidCard', //append with top-up code
    UPLOAD_IMAGE: 'https://asia-east2-k-cash-less.cloudfunctions.net/api/user/image',
    UPDATE_USER_DATA: 'https://asia-east2-k-cash-less.cloudfunctions.net/api/user/updateData',
    GET_MERCHANT_DATA: 'https://asia-east2-k-cash-less.cloudfunctions.net/api/user/getMerchant', //append with merchant id
    TRANSFER_TO_MERCHANT: 'https://asia-east2-k-cash-less.cloudfunctions.net/api/paid', // append with merchant id
    REDEEM_POINT: 'https://asia-east2-k-cash-less.cloudfunctions.net/api/user/redeemPoint', // TOKEN
    GET_TRANSACTIONS: 'https://asia-east2-k-cash-less.cloudfunctions.net/api/getOneUserTransaction', // TOKEN
    PUSH_NOTIFICATION_TOKEN: 'https://asia-east2-k-cash-less.cloudfunctions.net/api/user/pushUserDeviceToken',
};

export default API_URL;