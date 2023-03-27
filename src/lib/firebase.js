const { initializeApp } = require ("firebase/app");
const { getFirestore } =  require ('firebase/firestore');

const firebaseConfig = {
    apiKey:             process.env.apiKey,
    authDomain:         process.env.authDomain,
    projectId:          process.env.projectId,
    storageBucket:      process.env.storageBucket,
    messagingSenderId:  process.env.messagingSenderId,
    appId:              process.env.appId,
    measurementId:      process.env.measurementId
};

const firebaseApp = initializeApp (firebaseConfig);
const firebaseStore = getFirestore (firebaseApp);

module.exports = {
    firebaseApp,
    firebaseStore
};





