import { Outlet } from 'react-router-dom';
import { useContext, useState } from "react";
import { Menu, User, Settings, StickyNote, BookUp2, List, CalendarPlus } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from '../providers/AuthProvider';
const MainLayout = () => {
    const { logOut, user } = useContext(AuthContext);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const navigate = useNavigate();

    const handleLogout = () => {
        logOut().then(() => {
            navigate('/login');
        });
    };
    return (
        <div>
            <div className="flex h-screen bg-gray-100">
                <div className={`bg-blue-600 text-white ${isSidebarOpen ? 'w-64' : 'w-16'} transition-all`}>
                    <div className="flex items-center justify-between p-4">
                        <span className="text-xl font-bold">{isSidebarOpen && "Dashboard"}</span>
                        <Menu onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="cursor-pointer" />
                    </div>
                    <nav className="mt-4 space-y-4">
                        <div>
                            <NavItem to="/" icon={<CalendarPlus />} label="Home" isSidebarOpen={isSidebarOpen} />
                            <NavItem to="/profile" icon={<User />} label="Profile" isSidebarOpen={isSidebarOpen} />
                            <NavItem to="/tasks-board" icon={<List />} label="Task Board" isSidebarOpen={isSidebarOpen} />
                            <NavItem to="/add-task" icon={<StickyNote />} label="Add Task" isSidebarOpen={isSidebarOpen} />

                            {isSidebarOpen && <h4 className="mt-8 mb-2 ml-5">TASKS</h4>}

                            <NavItem to="/upcoming" icon={<BookUp2 />} label="Upcoming" isSidebarOpen={isSidebarOpen} />
                            <NavItem to="/today" icon={<List />} label="Today" isSidebarOpen={isSidebarOpen} />
                            <NavItem to="/sticky-wall" icon={<StickyNote />} label="Sticky Wall" isSidebarOpen={isSidebarOpen} />
                        </div>
                        <NavItem to="/settings" icon={<Settings />} label="Settings" isSidebarOpen={isSidebarOpen} />
                        <button onClick={handleLogout}>Logout</button>
                    </nav>
                </div>
                <div className="flex-1 flex flex-col">
                    <header className="bg-white shadow p-4 flex justify-between items-center">
                        <h1 className="text-2xl font-bold">Dashboard</h1>
                        <div className="flex items-center space-x-4">
                            <span className="text-gray-600">Hello, {user?.displayName}</span>
                            <img
                                src={user?.photoURL}
                                alt="User Avatar"
                                className="w-10 h-10 rounded-full"
                            />
                        </div>
                    </header>

                    <main className="flex-1 p-6 overflow-y-auto">
                        <Outlet></Outlet>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default MainLayout;


const NavItem = ({ to, icon, label, isSidebarOpen }) => (
    <Link to={to} className="flex items-center px-4 py-2 hover:bg-blue-500 cursor-pointer">
        {icon}
        {isSidebarOpen && <span className="ml-4">{label}</span>}
    </Link>
);
