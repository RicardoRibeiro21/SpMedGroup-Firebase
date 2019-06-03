import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDcIUgGIiXHATKsXNm4q7UQhmaJ3cOeQr0",
    authDomain: "spmedgroup-3b842.firebaseapp.com",
    databaseURL: "https://spmedgroup-3b842.firebaseio.com",
    projectId: "spmedgroup-3b842",
    storageBucket: "spmedgroup-3b842.appspot.com",
    messagingSenderId: "882469368053",
    appId: "1:882469368053:web:24ef54ad1990bb2e"
  };

firebase.initializeApp(firebaseConfig);

export default firebase;
