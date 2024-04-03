// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js'
import { getFirestore, collection, addDoc, deleteDoc, doc, updateDoc, onSnapshot, query, orderBy } from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBw7DYh1xWUjP9JfzUTV0Y1V2REOx8qK7Q",
  authDomain: "todo-list-df6b5.firebaseapp.com",
  projectId: "todo-list-df6b5",
  storageBucket: "todo-list-df6b5.appspot.com",
  messagingSenderId: "361271660050",
  appId: "1:361271660050:web:86b2eb1a1fea9bb5f292cb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const saveTask = async (taskData) => {
  const colRef = collection(db, 'TaskList');
  const docRef = await addDoc(colRef, {...taskData, createdAt: new Date(), checked: false});
  console.log("Document written with ID: ", docRef.id);
};

export async function deleteTask(taskId){
  await deleteDoc(doc(db, "TaskList", taskId));
}

export async function toggleCheck(taskId, checkedStatus){
  const taskRef = doc(db, "TaskList", taskId);
  await updateDoc(taskRef, {checked: checkedStatus});
}

export function listenForTasks(updateUI) {
  const q = query(collection(db, "TaskList"), orderBy("createdAt"));

  onSnapshot(q, (snapshot) => {
      const tasks = [];
      console.log(snapshot);
      snapshot.forEach((doc) => {
          const task = doc.data();
          task.id = doc.id; 
          tasks.push(task);
      });
      updateUI(tasks); 
  });
}