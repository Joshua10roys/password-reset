import './style.css'
import { useNavigate } from 'react-router-dom';
import { IoEnter } from 'react-icons/io5';
import { useFormik } from "formik";
import { API } from '../utils/api.js';

export default function Login() {

    // navigation hook
    const navigate = useNavigate();

    // formik hook
    const formik = useFormik({

        // initial values
        initialValues: {
            email: "",
            password: "",
        },

        // on submit
        onSubmit: (value, { resetForm }) => {

            try {
                fetch(`${API}/login`, {
                    method: "POST",
                    body: JSON.stringify(value),
                    headers: { "Content-Type": "application/json" }
                })
                    .then(resetForm(value))
                    .then(res => res.json())
                    .then(res => alert(res.msg))
            } catch (error) { throw (error) }
        }
    })

    return (
        <div className="container">
            <form id="form" onSubmit={formik.handleSubmit}>
                <div className="d-flex flex-column align-items-center">

                    {/* icon */}
                    <div className="d-flex flex-column align-items-center" id="icon">
                        <IoEnter />
                    </div>

                    {/* title & description */}
                    <h2 className="fw-bold text-white">Login</h2>
                    <p className="text-white text-center">login with registered email id and password</p>

                    {/* email */}
                    <label htmlFor="email" className="form-label fw-bold text-white">Email</label>
                    <input type="email" id="email" className="form-control" name="email" placeholder="example@mail.com"
                        required value={formik.values.email} onChange={formik.handleChange}></input>

                    {/* password */}
                    <label htmlFor="password" className="form-label fw-bold text-white">Password</label>
                    <input type="password" id="password" className="form-control" placeholder="password"
                        required value={formik.values.password} onChange={formik.handleChange}></input>

                    {/* navigation buton */}
                    <div >
                        <button onClick={() => navigate('/register')} type="button" id="link" className="btn btn-light pe-sm-5">Register!</button>
                        <button onClick={() => navigate('/forgotPassword')} type="button" id="link" className="btn btn-light ps-5">Forgot Password?</button>
                    </div>

                    {/* submit buton */}
                    <div className="d-flex justify-content-center pt-2">
                        <button type="submit" id="submit" className="btn btn-light btn-sm">Login</button>
                    </div>

                </div>
            </form>
        </div>
    )
}