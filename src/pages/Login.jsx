import { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { AuthContext } from '../providers/AuthProvider';
import backgroundImg from '../assets/loginBackground.avif'
import axios from 'axios';

const Login = () => {
    const { signInWithGoogle, handleLogin } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const googleLogin = async () => {
        try {
            const data = await signInWithGoogle();
            const response = await axios.post(`https://task-trek-server-eight.vercel.app/users/${data?.user?.email}`, {
                name: data?.user?.displayName,
                image: data?.user?.photoURL,
                email: data?.user?.email,
                userID: data?.user?.uid,
                withCredential: true,
            });
            if (response.status === 200) {
                Swal.fire({
                    title: "Welcome back!",
                    icon: "success",
                    draggable: true,
                });
                navigate('/')
            } else if (response.status === 201) {
                Swal.fire({
                    title: response.data.message || "Google login successful!",
                    icon: "success",
                    draggable: true,
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response?.data?.message || "Google login failed. Please try again.",
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        handleLogin(email, password)
            .then(res => {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Logged in successfully!",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate(location?.state ? location.state : "/");
            })
            .catch(err => {
                toast.error(err.message);
            });
    };

    return (
        <div className="relative h-screen bg-cover bg-center px-2"
            style={{ backgroundImage: `url(${backgroundImg})` }}
        >
            <div className="absolute inset-0 bg-gradient-to-l from-black via-transparent to-gray-500"></div>

            <div className="relative z-10 flex items-center justify-center  md:gap-12 h-full">
                <div className="w-full  max-w-md p-2 md:p-6 lg:p-8  bg-white bg-opacity-80 rounded-lg shadow-md">
                    <h2 className="text-3xl font-bold text-center text-gray-800  md:mb-2 lg:mb-6">Login</h2>
                    <form onSubmit={handleSubmit} className="space-y-2 md:space-y-4 lg:space-y-6">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text  text-black text-lg font-bold">Email</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                className="input input-bordered w-full"
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text  text-black text-lg font-bold">Password</span>
                            </label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                className="input input-bordered w-full"
                                required
                            />
                        </div>
                        <button type="submit" className="btn border-none hover:bg-blue-800 bg-blue-600 w-full text-white text-lg font-Exo mt-4">
                            Login
                        </button>
                    </form>
                    <button
                        onClick={googleLogin}
                        className=" w-full   text-lg font-bold text-gray-700 hover:bg-primary border py-2 border-blue-900 rounded-xl hover:text-white mt-4"
                    >
                        Login with Google
                    </button>

                    <p className="text-lg text-center  mt-1 md:mt-4 lg:mt-6  text-blackfont-bold">
                        Don't have an account?{" "}
                        <Link to="/register" className="text-blue-700 font-semibold hover:underline">
                            Register
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
