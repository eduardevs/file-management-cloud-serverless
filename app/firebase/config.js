import { initializeApp, getApps, getApp } from "firebase/app";
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDlzFCgjzfa2_4CHLxFVtmA53SDlMyAhA8",
    authDomain: "fir-serverless-cloud.firebaseapp.com",
    projectId: "fir-serverless-cloud",
    storageBucket: "fir-serverless-cloud.appspot.com",
    messagingSenderId: "830300681298",
    appId: "1:830300681298:web:21702cba0f53fb43f89b8b"
  };
  
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()

const auth = getAuth(app)

export {app, auth}