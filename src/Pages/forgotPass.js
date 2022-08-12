import './style.css'
import { useNavigate } from 'react-router-dom';
import { TbMailForward } from 'react-icons/tb';
import { useFormik } from "formik";
import { API } from '../utils/api.js';


export default function ForgotPass() {

    // navigation hook
    const navigate = useNavigate();

    // formik hook
    const formik = useFormik({

        // initial values
        initialValues: {
            email: "",
        },

        // on submit
        onSubmit: (value, { resetForm }) => {

            try {
                fetch(`${API}/forgotPassword`, {
                    method: "POST",
                    body: JSON.stringify(value),
                    headers: { "Content-Type": "application/json" }
                })
                    .then(resetForm(value))
                    .then(res => res.json())
                    .then((res) => {
                        alert(res.msg);
                        res.status === 200 && navigate('/login')
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
                        <TbMailForward />
                    </div>

                    {/* title & description */}
                    <h2 className="fw-bold text-white text-center">Password Reset Email</h2>
                    <p className="text-white text-center">enter registered email id to receive password reset mail</p>

                    {/* email */}
                    <label htmlFor="email" className="form-label fw-bold text-white">Email</label>
                    <input type="email" id="email" className="form-control" name="email" placeholder="example@mail.com"
                        required value={formik.values.email} onChange={formik.handleChange}></input>

                    {/* submit buton */}
                    <div className="d-flex justify-content-center pt-5">
                        <button type="submit" id="submit" className="btn btn-light btn-sm">Send Mail</button>
                    </div>

                    {/* back buton */}
                    <div>
                        <button onClick={() => navigate('/login')} type="button" id="link" className="btn btn-light pb-0">back</button>
                    </div>

                </div>
            </form>
        </div>
    )
}