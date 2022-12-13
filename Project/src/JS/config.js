//config.js => firebase의 초기설정을 지정하는 스크립트

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js";

// 파이어베이스 구성
export const firebaseConfig = {
  apiKey: "AIzaSyB3xDw_sny1zqGFK15c6KuKwFmUmt3rMy0",
  authDomain: "mohazzi-db.firebaseapp.com",
  projectId: "mohazzi-db",
  storageBucket: "mohazzi-db.appspot.com",
  messagingSenderId: "185879253640",
  appId: "1:185879253640:web:d00832b6b0fc5ec08ec53d",
  measurementId: "G-8PWT64X1VM",
  storageBucket: "gs://mohazzi-db.appspot.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);


