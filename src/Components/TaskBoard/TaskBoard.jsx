import { useState } from "react";
import { Menu, Home, User, Settings } from "lucide-react";

const TaskBoard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <div className="flex h-screen bg-gray-100">
            <div className={`bg-blue-600 text-white ${isSidebarOpen ? 'w-64' : 'w-16'} transition-all`}>
                <div className="flex items-center justify-between p-4">
                    <span className="text-xl font-bold">{isSidebarOpen && "Dashboard"}</span>
                    <Menu onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="cursor-pointer" />
                </div>
                <nav className="mt-4 space-y-4">
                    <NavItem icon={<Home />} label="Home" isSidebarOpen={isSidebarOpen} />
                    <NavItem icon={<User />} label="Profile" isSidebarOpen={isSidebarOpen} />
                    <NavItem icon={<Settings />} label="Settings" isSidebarOpen={isSidebarOpen} />
                </nav>
            </div>
            <div className="flex-1 flex flex-col">
                <header className="bg-white shadow p-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Dashboard</h1>
                    <div className="flex items-center space-x-4">
                        <span className="text-gray-600">Hello, User</span>
                        <img
                            src="https://via.placeholder.com/40"
                            alt="User Avatar"
                            className="w-10 h-10 rounded-full"
                        />
                    </div>
                </header>

                <main className="flex-1 p-6 overflow-y-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <Card title="Tasks" count="24" />
                        <Card title="In Progress" count="8" />
                        <Card title="Completed" count="16" />
                    </div>
                </main>
            </div>
        </div>
    );
}
export default TaskBoard;

const NavItem = ({ icon, label, isSidebarOpen }) => (
    <div className="flex items-center px-4 py-2 hover:bg-blue-500 cursor-pointer">
        {icon}
        {isSidebarOpen && <span className="ml-4">{label}</span>}
    </div>
);

const Card = ({ title, count }) => (
    <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-3xl font-bold">{count}</p>
    </div>
);