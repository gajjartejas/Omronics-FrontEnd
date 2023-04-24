// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDtrKPCgd3UVViRH5NZsRSRf4PaVkte9PQ',
  authDomain: 'omronics-frontend.firebaseapp.com',
  projectId: 'omronics-frontend',
  storageBucket: 'omronics-frontend.appspot.com',
  messagingSenderId: '974844314772',
  appId: '1:974844314772:web:c158f0f6ce400143c9a081',
  measurementId: 'G-6XD2L0WV0Y',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const AppFirebase = { analytics };

export default AppFirebase;
