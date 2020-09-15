import * as firebase from 'firebase';
import '@firebase/firestore';
import FIREBASE_CONFIG from './config';

class Firestore {
  constructor() {
    if (!firebase.apps.length) {
      //firebase.initializeApp(FIREBASE_CONFIG);
      firebase.initializeApp({ projectId: 'xxxxxxxxxxx' });
    } else {
      console.log('firebase apps already running...');
    }
    this.db = firebase.firestore();
  }


  addFriend(friends,addSuccess,addUnsuccess){
    friends.createddate = firebase.firestore.FieldValue.serverTimestamp();
    this.db
      .collection('Friends')
      .add(friends)
      .then(function (docRef) {
        addSuccess(docRef);
      })
      .catch(function (error) {
        addUnsuccess(error);
      });
  }

  getFriend(id,getSuccess,getUnsuccess){
    let docRef = this.db.collection("Friends");
    docRef
      .where('friend', 'array-contains', id)
      .get()
      .then(function (querySnapshot) {
        getSuccess(querySnapshot);
      })
      .catch(function (error) {
        getUnsuccess(error);
      });
  }

  addAccount(account, addSuccess, addUnsuccess) {
    account.createddate = firebase.firestore.FieldValue.serverTimestamp();
    this.db
      .collection('Account')
      .add(account)
      .then(function (docRef) {
        addSuccess(docRef);
      })
      .catch(function (error) {
        addUnsuccess(error);
      });
  }

  addAccountWithID(account, addSuccess, addUnsuccess) {
    account.CreatedDate = firebase.firestore.FieldValue.serverTimestamp();
    this.db
      .collection('Account')
      .doc('5230300650')
      .set(account)
      .then(function (docRef) {
        addSuccess(docRef);
      })
      .catch(function (error) {
        addUnsuccess(error);
      });
  }

  updateAccount(account,updateSuccess, updateUnsuccess){
    var docRef = this.db.collection("Account").doc(account.id);
    docRef.update({
      firstname:account.firstname,
      lastname:account.lastname,
      studentid:account.studentid,
      userName:account.username
    })
    .then(function(){
      updateSuccess();
    })
    .catch(function(){
      updateUnsuccess();
    });
  }

   getAccount(userName, getSuccess, getUnsuccess) {
    let docRef = this.db.collection('Account');
    docRef
      .where('username', '==', userName)
      .get()
      .then(function (querySnapshot) {
        getSuccess(querySnapshot);
      })
      .catch(function (error) {
        getUnsuccess(error);
      });
  }

  getAccountWithID(id, getSuccess, getUnsuccess) {
    let docRef = this.db.collection('Account').doc(id);
    docRef.get()
      .then(function (doc) {
        getSuccess(doc);
      })
      .catch(function (error) {
        getUnsuccess(error);
      });
  }

  deleteAccout(userName, deleteSuccess, deleteUnSuccess) {
    let docRef = this.db.collection('Account');
    docRef
      .where('UserName', '==', userName)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.docs.forEach((doc) => {
          doc.ref
            .delete()
            .then(function () {
              deleteSuccess();
            })
            .catch(function (error) {
              deleteUnSuccess(error);
            });
        });
      })
      .catch(function (error) {
        deleteUnSuccess(error);
      });
  }
}

const firestore = new Firestore();
export default firestore;
