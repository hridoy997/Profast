import { useForm } from 'react-hook-form';
import UseAuth from '../../../Hooks/UseAuth';
import { Link } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';

const Register = () => {

    const {register, handleSubmit, formState: { errors }} = useForm();

    const {createUser} = UseAuth();

    const onSubmit = (data) => {
        console.log(data);
        createUser(data.email, data.password)
        .then((result) => {
            const user = result.user;
            console.log(user);
        })
        .catch((error) => {
            console.error(error);
        });
    }

    return (
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
                <h1 className="text-5xl font-bold">Register</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <fieldset className="fieldset">
                    <label className="label">Email</label>
                    <input type="email" {...register("email", { required: true })} className="input" placeholder="Email" />
                    {errors.email && <p className="text-red-600">Email is required</p>}

                    <label className="label">Password</label>
                    <input type="password" {...register("password", { required: true, minLength: 6 })} className="input" placeholder="Password" />
                    {errors.password?.type === 'required' && <p className="text-red-600">Password is required </p>}
                    {errors.password?.type === 'minLength' && <p className="text-red-600">Password must be at least 6 characters</p>}

                    <div><a className="link link-hover">Forgot password?</a></div>

                    <button className="btn btn-primary text-black mt-4">Register</button>
                </fieldset>
                <p><small>Already have an account? <Link to="/login" className='btn btn-link text-primary px-0'>Login</Link></small></p>
                </form>
                <SocialLogin />
            </div>
        </div>
    );
};

export default Register;