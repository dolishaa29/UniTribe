import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { signOut } from 'firebase/auth';
import { collection, addDoc, getDocs } from 'firebase/firestore';

const Dashboard = () => {
  const [data, setData] = useState([]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const addData = async () => {
    const user = auth.currentUser;
    if (!user) return;
    try {
      await addDoc(collection(db, 'testCollection'), {
        text: 'Hello from Firebase!',
        userId: user.uid,
        timestamp: new Date(),
      });
      fetchData();
    } catch (error) {
      console.error('Error adding document:', error);
    }
  };

  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'testCollection'));
      const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setData(items);
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-4">
      <p>Welcome, {auth.currentUser?.displayName || auth.currentUser?.email}!</p>
      <button onClick={handleSignOut} className="bg-red-500 text-white px-4 py-2 rounded">Sign Out</button>
      <button onClick={addData} className="bg-blue-500 text-white px-4 py-2 rounded ml-2">Add Data</button>
      <div className="mt-4">
        <h3>Data from Firestore:</h3>
        <ul>
          {data.map(item => (
            <li key={item.id}>{item.text} - {item.timestamp.toDate().toString()}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;