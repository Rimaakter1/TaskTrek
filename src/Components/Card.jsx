export const Card = ({ title, count, bgColor, icon }) => (
    <div className={`p-6 rounded-lg shadow-md ${bgColor} hover:shadow-lg transition-shadow`}>
        <div className="flex items-center justify-between">
            <div>
                <h2 className="text-lg font-semibold">{title}</h2>
                <p className="text-3xl font-bold">{count}</p>
            </div>
            <span className="text-4xl">{icon}</span>
        </div>
        <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">View Details</button>
    </div>
);