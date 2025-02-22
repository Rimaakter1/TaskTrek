import { Outlet } from 'react-router-dom';
import { useContext } from "react";
import { User, Settings, StickyNote, BookUp2, List, CalendarPlus, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../providers/AuthProvider';
import { NavItem } from '../Components/NavItem';

const MainLayout = () => {
    const { logOut, user } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logOut().then(() => {
            navigate('/login');
        });
    };

    return (
        <div className="flex lg:flex-row flex-col h-screen bg-gray-100">
            <div className=" w-screen lg:w-1/6 bg-blue-600 text-white flex flex-col">
                <div className="flex items-center justify-between p-4">
                    <div className="flex items-center space-x-4">
                        <img
                            src={user?.photoURL}
                            alt="User Avatar"
                            className="w-10 h-10 rounded-full"
                        />
                        <h2 className="text-white">{user?.displayName}</h2>
                    </div>
                </div>
                <nav className="flex-1 mt-4 space-y-4">
                    <NavItem to="/" icon={<CalendarPlus />} label="Home" />
                    <NavItem to="/profile" icon={<User />} label="Profile" />
                    <NavItem to="/tasks-board" icon={<List />} label="Task Board" />
                    <NavItem to="/add-task" icon={<StickyNote />} label="Add Task" />

                    <h4 className="mt-8 mb-2 ml-5">TASKS</h4>

                    <NavItem to="/upcoming-tasks" icon={<BookUp2 />} label="Upcoming" />
                    <NavItem to="/today-tasks" icon={<List />} label="Today" />
                </nav>
                <div className="mt-auto mb-4 space-y-4">
                    <NavItem to="/settings" icon={<Settings />} label="Settings" />
                    <div className='flex items-center gap-4 ml-4'>
                        <LogOut /> <button onClick={handleLogout}>Logout</button>
                    </div>
                </div>
            </div>
            <div className="flex-1 flex flex-col">
                <main className="flex-1 p-6 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default MainLayout;


