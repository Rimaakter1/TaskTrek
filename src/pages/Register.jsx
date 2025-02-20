import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import registerImg from '../assets/background.jpg'
import { AuthContext } from '../providers/AuthProvider';

const Register = () => {


    const { createUser, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const photo = e.target.photoUrl.value;
        const password = e.target.password.value;


        if (!/[A-Z]/.test(password)) {
            toast.error("Password must contain at least one uppercase letter")
            return;
        }
        if (!/[a-z]/.test(password)) {
            toast.error("Password must contain at least one lowercase letter")
            return;
        }

        if (password.length < 6) {
            toast.error("Password must contain at least 6 characters")
            return;
        }

        createUser(email, password)
            .then(result => {
                updateUserProfile(name, photo);
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "You have registered successfully!",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/');
            })
            .catch(err => {
                toast.error(err.message);
            });
    };


    return (
        <div className='bg-gray-200 p-2'>
            <div className="flex flex-col-reverse lg:flex-row w-full md:w-10/12 mx-auto  pt-0 lg:py-14">
                <div className="md:w-1/2 w-full lg:h-screen p-8 bg-white  rounded-l-lg shadow-md">
                    <h2 className="text-2xl font-bold text-center text-gray-700  font-Exo">Registration</h2>
                    <form onSubmit={handleSubmit} className="lg:space-y-2">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text  text-lg font-bold font-Exo">Name</span>
                            </label>
                            <input
                                type="text"
                                name='name'
                                placeholder="Enter your name"
                                className="input input-bordered w-full"
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text  text-lg font-bold font-Exo">Email</span>
                            </label>
                            <input
                                type="email"
                                name='email'
                                placeholder="Enter your email"
                                className="input input-bordered w-full"
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text  text-lg font-bold font-Exo">Photo URL</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter photo URL"
                                name='photoUrl'
                                className="input input-bordered w-full"
                            />
                        </div>
                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text  text-lg font-bold font-Exo">Password</span>
                            </label>
                            <input
                                type="password"
                                name='password'
                                placeholder="Enter your password"
                                className="input input-bordered w-full"
                                required
                            />
                        </div>
                        <button  type="submit" className="btn border-none bg-blue-600 hover:bg-blue-800 text-white font-bold font-Exo text-lg w-full">
                            Register
                        </button>
                        <p className=" text-center   text-lg font-bold">
                            Already have an account?
                            <a href="/login" className="text-primary hover:underline">
                                Login
                            </a>
                        </p>
                    </form>
                </div>
                <div className='w-full md:w-1/2  lg:h-screen'>
                    <img src={registerImg} className='lg:h-screen object-cover w-full rounded-r-lg' alt="" />
                </div>
            </div>
        </div>
    );
};

export default Register;