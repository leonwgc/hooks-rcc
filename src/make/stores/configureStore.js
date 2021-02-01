import { applyMiddleware, compose, createStore } from 'redux';
import createRootReducer from './reducers';
import thunk from 'redux-thunk';

let composeEnhancers = compose;

if (__dev__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
  composeEnhancers = __REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true });
}

export default function configureStore(preloadedState) {
  const store = createStore(
    createRootReducer(),
    preloadedState,
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
}
