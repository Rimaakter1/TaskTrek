import { Calendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import axios from 'axios';
import { Card } from '../Components/Card';
import Loading from '../Components/Loading';

const Home = () => {
    const [date, setDate] = useState(new Date());
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);

    const [totalTasks, setTotalTasks] = useState(0);
    const [inProgressTasks, setInProgressTasks] = useState(0);
    const [completedTasks, setCompletedTasks] = useState(0);

    useEffect(() => {
        if (user?.email) {
            setLoading(true);

            axios.get(`https://task-trek-server-eight.vercel.app/tasks/${user.email}`)
                .then(response => {
                    const fetchedTasks = response.data;
                    setTotalTasks(fetchedTasks.length);
                    setInProgressTasks(fetchedTasks.filter(task => task.category === 'In Progress').length);
                    setCompletedTasks(fetchedTasks.filter(task => task.category === 'Done').length);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching tasks:', error);
                    setLoading(false);
                });
        }
    }, [user?.email]);

    return (
        <div className='p-6'>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:col-span-3">
                    {loading ? (
                        <div className="col-span-3 text-center">
                            <Loading></Loading>
                        </div>
                    ) : (
                        <>
                            <Card title="Tasks" count={totalTasks} bgColor="bg-blue-100" icon="📋" />
                            <Card title="In Progress" count={inProgressTasks} bgColor="bg-yellow-100" icon="⚡" />
                            <Card title="Completed" count={completedTasks} bgColor="bg-green-100" icon="✅" />
                        </>
                    )}
                </div>
            </div>

            <div className="mt-8 p-6 flex items-center justify-center">
                <Calendar
                    onChange={setDate}
                    value={date}
                    className="rounded-lg shadow-md"
                    tileClassName={({ date: currentDate, view }) =>
                        view === 'month' && currentDate.toDateString() === new Date().toDateString()
                            ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-bold rounded-lg'
                            : currentDate.toDateString() === date.toDateString()
                                ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold rounded-lg'
                                : 'hover:bg-blue-100 hover:text-blue-600 rounded-lg transition-all duration-200'
                    }
                    tileContent={({ date: currentDate, view }) =>
                        view === 'month' && currentDate.toDateString() === new Date().toDateString() ? (
                            <div className="flex justify-center items-center mt-1 text-xs text-red-500">Today</div>
                        ) : null
                    }
                />
            </div>
        </div>
    );
};

export default Home;
