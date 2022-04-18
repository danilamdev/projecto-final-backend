
import admin from 'firebase-admin'

// const serviceAccount = require("./firebase-admin-config.json");
import serviceAccount from './configFirebase.js'

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


export const db = admin.firestore()