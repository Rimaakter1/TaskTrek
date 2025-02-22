import { Link } from "react-router-dom";

export const NavItem = ({ to, icon, label }) => (
    <Link to={to} className="flex items-center px-4 py-1 hover:bg-blue-500 cursor-pointer">
        {icon}
        <span className="ml-4">{label}</span>
    </Link>
);