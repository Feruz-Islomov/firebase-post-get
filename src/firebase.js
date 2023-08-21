import { initializeApp } from "firebase/app";

import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyBlkvP4XExsXBVb83yOXdywrTs87JV2AUQ",
  authDomain: "ninja-firegram-e9b65.firebaseapp.com",
  projectId: "ninja-firegram-e9b65",
  storageBucket: "ninja-firegram-e9b65.appspot.com",
  messagingSenderId: "16996784998",
  appId: "1:16996784998:web:2ba66e82aaea08fa4686a7",
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
