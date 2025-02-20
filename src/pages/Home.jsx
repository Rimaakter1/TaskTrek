
const Home = () => {
    return (
        
        
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card title="Tasks" count="24" />
                <Card title="In Progress" count="8" />
                <Card title="Completed" count="16" />
            </div>


    );
};

export default Home;

const Card = ({ title, count }) => (
    <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-3xl font-bold">{count}</p>
    </div>
);