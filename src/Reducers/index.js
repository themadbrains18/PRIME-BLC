import { combineReducers } from 'redux';

import users  from './authReducers';
import coins from './marketReducers';
import deposittokens from './tokenReducers';
import assets from './assetsReducers';
import deposittrxs from './depositReducers';
import assetoverview from './overviewReducers';
import withdraws from './withdrawReducers';
import withdrawlist from './withdrawListReducers';
import pmlist from './pmList';



import kycs from './kycReducers';
import intervals from './intervalReducers';
import userpmlist from './getSavedPmList';
import orders from './orderReducers';
import chats from './orderChatReducers';
import sells from './sellReducers';
import notifications from './notificationReducers';
import orderbooks from './marketOrderReducers';
import withdrawhistory from './withdrawHistoryReducers';
import transferhistory from './transferReducers';
import buyOrder from './buyOrderReducer';
import secret from './secretReducer';

export default combineReducers({
    users,
    coins,
    deposittokens,
    assets,
    deposittrxs,
    assetoverview,
    withdraws,
    kycs,
    withdrawlist,
    pmlist,
    userpmlist,
    intervals,
    orders,
    chats,
    sells,
    notifications,
    orderbooks,
    withdrawhistory,
    buyOrder,
    secret,
    transferhistory
});