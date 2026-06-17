require('dotenv').config({ path: '.env.local' });
const { initializeApp } = require('firebase/app');
const { getAuth, signInWithEmailAndPassword } = require('firebase/auth');

const app = initializeApp({
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
});

const auth = getAuth(app);
signInWithEmailAndPassword(auth, 'cmozunap@gmail.com', 'c@2094op/##$')
  .then(() => console.log('LOGIN SUCCESSFUL WITH SLASH PASSWORD'))
  .catch(e => {
    console.log('SLASH PASSWORD FAILED:', e.code);
    signInWithEmailAndPassword(auth, 'cmozunap@gmail.com', 'c@2094Op##$')
      .then(() => console.log('LOGIN SUCCESSFUL WITH ORIGINAL PASSWORD'))
      .catch(e2 => console.log('ORIGINAL PASSWORD FAILED:', e2.code));
  });
