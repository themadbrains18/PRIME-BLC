import { createStore, applyMiddleware,compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage'
import rootReducer from '../Reducers';

const persistConfig = {
  key: 'STA',
  storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

// export default function configureStore() {
//  return createStore(
//    rootReducer,
//    initialState,
//    applyMiddleware(thunk)
//  );
// }

export default function configureStore() {
  let store = createStore(persistedReducer,undefined,compose(applyMiddleware(thunk)))
  let persistor = persistStore(store)
  return { store, persistor }
}