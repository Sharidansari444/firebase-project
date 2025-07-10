import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db, auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import { signOut } from "firebase/auth";

function Dashboard() {
  const [entries, setEntries] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    const snapshot = await getDocs(collection(db, "entries"));
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setEntries(data);
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "entries", id));
    fetchData();
  };

  const handleLogout = () => {
    signOut(auth).then(() => navigate("/"));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div>
          <Link to="/form" className="mr-4 bg-green-600 text-white px-4 py-2 rounded">+ Add Entry</Link>
          <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
        </div>
      </div>

      <table className="w-full bg-white shadow-md rounded">
        <thead className="bg-gray-200 text-left">
          <tr>
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {entries.map(entry => (
            <tr key={entry.id} className="border-t">
              <td className="p-3">{entry.name}</td>
              <td className="p-3">{entry.email}</td>
              <td className="p-3">
                <Link to={`/form?id=${entry.id}`} className="text-blue-500 mr-4">Edit</Link>
                <button onClick={() => handleDelete(entry.id)} className="text-red-500">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
