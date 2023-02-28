import axios from "axios";

const baseurl = 'https://blcexchange.net/api';
export const backend_image_url = 'https://blcexchange.net/api/document/';
export const websocket_url = 'wss://blcexchange.net:5000/'


// const baseurl = 'http://localhost:5000/api';
// export const backend_image_url = 'http://localhost:5000/document/';
// export const websocket_url = 'ws://localhost:5000/'


const API = axios.create(
    {
        baseURL: baseurl,
        headers: { 'Content-type': 'application/json' }
    })

const auth = `${sessionStorage.getItem('token')}`;
// console.log(auth)
API.defaults.headers.common['Authorization'] = auth;
// API.defaults.headers.common['Content-type'] = 'multipart/form-data'; 


export const apiBaseUrl = baseurl;
/** user Auth */

export const loginRequestApi = (formData) => API.post('/user/login', formData)
export const registerRequest = (formData) => API.post('/user/register', formData)
export const resetPasswordRequest = (formData) => API.post('/user/resetpassword', formData);
export const enabledisableTwoFA = (formData) => API.post('/user/enableTwoFA', formData);
export const getDepositAddress = (formData) => API.post('/user/deposit_address', formData);
export const getUserSession = (config) => API.get('/user/session', config);
export const updateUserWallet = (formData) => API.post('/user/wallet', formData);
export const updateUserProfile = (formData) => API.post('/user/update_user',formData);
export const verify2FA = (formData) => API.post('/user/verify2fa', formData);

/** OTP Routes */
export const otpRequest = (formData) => API.post('/user/otp', formData);

/** Trading Password Routes */
export const updateTradingPwdRequest = (formData) => API.post('/user/tradingpassword', formData);

/**
 * Market API Routes
 */
export const getMarketCoins = () => API.get('/market/coin')
export const cancelMarketOrder = (data) => API.post('/market/cancel', data)
export const marketTokenDatafeed =(symbol) => API.get('market/chartData?symbol='+symbol)

/**
 * Token API Routes
 */
export const getTokenList = () => API.get('/token/tokenlist');
export const getTokenNetwork = (formData) => API.post('/token/networklist', formData);
export const getTopGainerTokenList = () => API.get('/token/topgainer');
/**
 * user Assets Routs
 */

export const getUserAssets = () => {
    let sauth = sessionStorage.getItem('token');
    API.defaults.headers.common['Authorization'] = sauth;
    return API.get('assets/asset')
};
export const transferToWallet = (formData, config) => API.post('assets/transfer', formData, config);
export const getOverViewAssets = (currency) => API.get('assets/overview?currency=' + currency)

/**
 * Deposit transaction Routes
 */

export const saveDepositTransaction = (formData) => API.post('deposit/save', formData);
export const getDepositTransaction = (formData) => API.post('deposit/transaction', formData);
export const saveDepositTRXTransaction = (formData) => API.post('deposit/saveTrx', formData);
export const saveDepositTRC20Transaction = (formData) => API.post('deposit/saveTrc20', formData);

/**
 *  withdraw apis
 */

export const getTokenbalance = (token, userid) => API.get(`/withdraw/getTokenBalance/${token}/${userid}`)
export const withdrawNewRequest = (formData) => API.post('/withdraw/add-withdraw-request/', formData)
export const api_getSpecificTokenWithdraw = (token) => API.get(`/withdraw/add-withdraw-request/${token}`) // ${token}
export const getwithdrawhistory=()=>API.get('/withdraw/getwithdrawhistory');


/**
 * P2P KYC API Routes
 */

export const saveKyc = (formData) => API.post('kyc/save', formData);
export const getKyc = () => API.get('kyc/getKyc');
export const draftKyc = (formData) => API.post('kyc/draft', formData);

/**
* P2P Create Post API Routes
*/
export const savePost = (formData) => API.post('post/save', formData);
export const getPost = () => API.get('post/getPost');
export const cancelPost = (formData) => API.post('post/cancel', formData);
export const updatePost = (formData) => API.post('post/update', formData);
export const getAllPost = () => API.get('post/all');
export const getLowestPrice=(token)=> API.get('post/lowestPrice/'+token);

/**
 * order API Routes
 */

export const saveOrder = (formData) => API.post('order/save', formData);
export const updateOrder = (formData) => API.post('order/update', formData);
export const cancelOrder = (formData) => API.post('order/cancel', formData);
export const getUserOrderList = () => API.get('order/all');
export const getUserSellAssetsList = () => API.get('order/sell');
export const getOrderByID=(orderid) => API.get('order/order?orderid='+orderid);
export const releaseOrderCoin = (formData) =>API.post('order/release', formData);

/**
 * get payment method list
 */

export const pm_methods = () => API.get('/payment/pm_methods');
export const save_pm_method = (fromData) => API.post('/payment/save_user_pm', fromData)
export const saved_pm_list = () => API.get('/payment/saved_user_pm_list')
export const enabledAndDisabled = (formData) => API.patch('/payment/enabledanddisabled', formData)
export const deletePm = (id) => API.delete(`/payment/delete_payment_method/${id}`)

/**
 * Chat Routes
 */

export const getChatByOrder =(orderid)=>API.get('/chat/chat?orderid='+orderid);
export const saveChat = (formData)=>API.post('/chat/save', formData);
export const getNotification =()=>API.get('/chat/notification');
export const notificationUpdate =(formData)=>API.post('/chat/notification/update', formData);



/**
* Transfer Routes
*/

export const getTransferHistory=()=>API.get('transfer/all');