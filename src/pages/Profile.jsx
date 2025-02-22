import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../providers/AuthProvider';
import { Trash2 } from 'lucide-react';

const Profile = () => {
    const { user } = useContext(AuthContext);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        if (user) {
            axios.get(`https://task-trek-server-eight.vercel.app/tasks/${user?.email}`)
                .then(response => {
                    setTasks(response.data);
                })
                .catch(error => alert('Error fetching tasks:', error));
        }
    }, [user]);



    if (!user) return <p className="text-center text-xl mt-10">Loading...</p>;

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 py-10 px-4">
            <div className="max-w-7xl mx-auto p-8 bg-white rounded-xl shadow-2xl">
                <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
                    <img
                        src={user?.photoURL}
                        alt="User Avatar"
                        className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-lg"
                    />
                    <div className="text-center md:text-left">
                        <h1 className="text-4xl font-bold text-gray-800">{user?.displayName}</h1>
                        <p className="text-lg text-gray-600 mt-1">{user?.email}</p>
                        <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-transform transform hover:scale-105">Edit Profile</button>
                    </div>
                </div>

                <div className="mt-10">
                    <h2 className="text-3xl font-semibold text-gray-800 text-center md:text-left">Your Tasks</h2>
                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {tasks.length > 0 ? tasks.map((task) => (
                            <div key={task._id} className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                                <h3 className="font-bold text-xl text-gray-800 truncate">{task.title}</h3>
                                <p className="text-sm text-gray-700 mt-2 line-clamp-3">{task.description}</p>
                                <div className="flex justify-between items-center mt-4">
                                    <span className={`px-4 py-1 text-xs font-semibold rounded-full ${task.category === 'Done' ? 'bg-green-200 text-green-800' : task.category === 'In Progress' ? 'bg-yellow-200 text-yellow-800' : 'bg-blue-200 text-blue-800'}`}>
                                        {task.category}
                                    </span>
                                    <button className="px-3 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 transition-transform transform hover:scale-105"><Trash2 /></button>
                                </div>
                            </div>
                        )) : (
                            <p className="text-center text-gray-500 col-span-3">No tasks available.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
