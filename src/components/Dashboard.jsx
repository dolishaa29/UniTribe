import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

const Dashboard = () => {
  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl mb-4">Dashboard</h2>
      <p>Welcome, {auth.currentUser?.email}</p>
      <p>{auth.currentUser?.displayName}</p>
      <button onClick={handleSignOut} className="bg-red-500 text-white px-4 py-2 rounded">
        Sign Out
      </button>
    </div>
  );
};

export default Dashboard;