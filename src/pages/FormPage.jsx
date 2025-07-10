import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { db } from "../firebase";
import { addDoc, collection, getDoc, doc, updateDoc } from "firebase/firestore";

function FormPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const editId = params.get("id");

  useEffect(() => {
    if (editId) {
      const fetchData = async () => {
        try {
          const docSnap = await getDoc(doc(db, "entries", editId));
          if (docSnap.exists()) {
            const data = docSnap.data();
            setName(data.name || "");
            setEmail(data.email || "");
          } else {
            alert("Entry not found.");
            navigate("/dashboard");
          }
        } catch (err) {
          console.error("Failed to fetch document:", err);
        }
      };
      fetchData();
    }
  }, [editId, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email) return alert("All fields are required");

    const entry = { name, email };

    try {
  if (editId) {
    await updateDoc(doc(db, "entries", editId), entry);
  } else {
    await addDoc(collection(db, "entries"), entry);
  }
  console.log("Data saved successfully");
  navigate("/dashboard");
} catch (err) {
  console.error("Firestore Error:", err);
  alert("Failed to save data. Check your Firestore rules");
}
    setName("");
    setEmail("");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-xl font-semibold mb-4">
          {editId ? "Edit" : "Add"} Entry
        </h2>

        <div className="mb-4">
          <label className="block mb-1">Name</label>
          <input
            className="w-full border px-3 py-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input
            type="email"
            className="w-full border px-3 py-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <button className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600">
          {editId ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
}

export default FormPage;

