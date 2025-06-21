import React, { useState, useEffect } from "react";
import axios from "axios";

const statusOptions = ["pending", "in progress", "completed"];

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ title: "", description: "", assignedTo: "", status: "pending" });

  const fetchTasks = async () => {
    const res = await axios.get("http://localhost:5000/api/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreate = async () => {
    if (!form.title || !form.description || !form.assignedTo) return;
    await axios.post("http://localhost:5000/api/tasks", form);
    setForm({ title: "", description: "", assignedTo: "", status: "pending" });
    fetchTasks();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/tasks/${id}`);
    fetchTasks();
  };

  const handleUpdate = async (id, data) => {
    await axios.put(`http://localhost:5000/api/tasks/${id}`, data);
    fetchTasks();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-4">Task Manager</h1>

        {/* Form */}
        <div className="grid grid-cols-1 gap-3 mb-4">
          <input className="p-2 border rounded" placeholder="Title" value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <textarea className="p-2 border rounded" placeholder="Description" value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <input className="p-2 border rounded" placeholder="Assigned To" value={form.assignedTo}
            onChange={(e) => setForm({ ...form, assignedTo: e.target.value })} />
          <select className="p-2 border rounded" value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}>
            {statusOptions.map(status => <option key={status}>{status}</option>)}
          </select>
          <button onClick={handleCreate} className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
            Add Task
          </button>
        </div>

        {/* Tasks List */}
        <div className="grid gap-4">
          {tasks.map(task => (
            <div key={task._id} className="p-4 border rounded bg-gray-50">
              <h2 className="text-xl font-semibold">{task.title}</h2>
              <p>{task.description}</p>
              <p className="text-sm text-gray-600">Assigned to: {task.assignedTo}</p>

              <div className="flex items-center gap-3 mt-2">
                <select value={task.status} onChange={(e) => handleUpdate(task._id, { status: e.target.value })}
                  className="border p-1 rounded">
                  {statusOptions.map(status => <option key={status}>{status}</option>)}
                </select>
                <button onClick={() => handleDelete(task._id)} className="text-red-500 hover:underline">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
