import './style.css'
import { useNavigate } from 'react-router-dom';
import { RiUserAddFill } from 'react-icons/ri';
import { useFormik } from "formik";
import { API } from '../utils/api.js';

export default function Register() {

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
                fetch(`${API}/register`, {
                    method: "POST",
                    body: JSON.stringify(value),
                    headers: { "Content-Type": "application/json" }
                })
                    .then(resetForm(value))
                    .then(res => res.json())
                    .then((res) => {
                        alert(res.msg);
                        res.status === 201 && navigate('/login')
                    })

            } catch (error) { throw (error) }
        }
    })

    return (
        <div className="container">
            <form id="form" onSubmit={formik.handleSubmit}>
                <div className="d-flex flex-column align-items-center">

                    {/* icon */}
                    <div className="d-flex flex-column align-items-center" id="icon">
                        <RiUserAddFill />
                    </div>

                    {/* title & description */}
                    <h2 className="fw-bold text-white">Register</h2>
                    <p className="text-white text-center">register with valid email id and password</p>

                    {/* email */}
                    <label htmlFor="email" className="form-label fw-bold text-white">Email</label>
                    <input type="email" id="email" className="form-control" name="email" placeholder="example@mail.com"
                        required value={formik.values.email} onChange={formik.handleChange}></input>

                    {/* password */}
                    <label htmlFor="password" className="form-label fw-bold text-white">Password</label>
                    <input type="password" id="password" className="form-control" placeholder="password"
                        required value={formik.values.password} onChange={formik.handleChange}></input>

                    {/* submit buton */}
                    <div className="pt-5">
                        <button type="submit" id="submit" className="btn btn-light btn-sm">Register</button>
                    </div>

                    {/* back button */}
                    <button onClick={() => navigate('/login')} type="button" id="link" className="btn btn-light pb-0">back</button>

                </div>
            </form>
        </div>
    )
}