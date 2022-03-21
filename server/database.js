const admin = require("firebase-admin");

const serviceAccount = require("./kates-sweets-firebase-adminsdk-t53bb-f474ec9280.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const firestore = admin.firestore();
const storage = admin.storage().bucket("gs://kates-sweets.appspot.com");
module.exports = {
  firestore,
  storage,
};
