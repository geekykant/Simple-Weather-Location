// Initialize Firebase
var config = {
  apiKey: "######",
  authDomain: "####.firebaseapp.com",
  databaseURL: "https://####.firebaseio.com",
  projectId: "#####",
  storageBucket: "",
  messagingSenderId: "1231235817236"
};

firebase.initializeApp(config);
// Initialize Cloud Firestore through Firebase
const db = firebase.firestore();

// Disable deprecated features
db.settings({
  timestampsInSnapshots: true
});
