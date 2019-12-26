import { createStore, combineReducers, compose } from "redux";
import firebase from "firebase";
import "firebase/firestore";

import { firebaseReducer } from "react-redux-firebase";
import { createFirestoreInstance, firestoreReducer } from "redux-firestore";
//Reducers
import notifyReducer from "./reducers/notifyReducer";
import settingsReducer from "./reducers/settingsReducer";

const firebaseConfig = {
  apiKey: "AIzaSyAbBh5j396AddUWwRB_iVkiG3S5CNiQr4I",
  authDomain: "clientpanel-4be3e.firebaseapp.com",
  databaseURL: "https://clientpanel-4be3e.firebaseio.com",
  projectId: "clientpanel-4be3e",
  storageBucket: "clientpanel-4be3e.appspot.com",
  messagingSenderId: "12068411891",
  appId: "1:12068411891:web:904316222b8afb42"
};

// react-redux-firebase config
const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true
};

// Initialize firebase instance
firebase.initializeApp(firebaseConfig);

// Initialize other services on firebase instance
firebase.firestore();

// Add reactReduxFirebase enhancer when making store creator
// const createStoreWithFirebase = compose(
//   reactReduxFirebase(firebase, rrfConfig),
//   reduxFirestore(firebase)
// )(createStore);

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  notify: notifyReducer,
  settings: settingsReducer
});

if(localStorage.getItem('settings')== null){
  const defaultSettings = {
    disableBalanceOnAdd: true,
    disableBalanceOnEdit: false,
    allowRegistration: false
  }

  localStorage.setItem('settings', JSON.stringify(defaultSettings));
}

//Create Initial state
const initialState = {settings: JSON.parse(localStorage.getItem('settings'))};

//Create store
export const store = createStore(
  rootReducer,
  initialState,
  compose(
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance
};
