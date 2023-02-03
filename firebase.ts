import {initializeApp} from 'firebase/app';
import {getAnalytics} from 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyBtMRW9VtJ7sRtNWNYzea7B5_SENqEBK6w',
  authDomain: 'catstagram-6dffb.firebaseapp.com',
  projectId: 'catstagram-6dffb',
  storageBucket: 'catstagram-6dffb.appspot.com',
  messagingSenderId: '48019064151',
  appId: '1:48019064151:web:b51fe343c61b64ffefea12',
  measurementId: 'G-Y5EJR93NNF',
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
