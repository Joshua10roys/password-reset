import './style.css'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { RiLockPasswordFill } from 'react-icons/ri';
import { useFormik } from "formik";
import { API } from '../utils/api.js';

export default function Reset() {

    // navigation hook
    const navigate = useNavigate();

    // params hook
    const { string } = useParams();

    // formik hook
    const formik = useFormik({

        initialValues: {
            password: "",
        },

        onSubmit: (value, { resetForm }) => {

            try {
                fetch(`${API}/resetPassword`, {
                    method: "POST",
                    body: JSON.stringify({ ...value, token: string }),
                    headers: { "Content-Type": "application/json" }
                })
                    .then(resetForm(value))
                    .then(res => res.json())
                    .then((res) => {
                        alert(res.msg);
                        if (res.status === 200 || 410) { navigate('/login') };
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
                        <RiLockPasswordFill />
                    </div>

                    {/* title & description */}
                    <h2 className="fw-bold text-white px-3">Reset Password</h2>
                    <p className="text-white text-center">enter your new password</p>


                    {/* password */}
                    <label htmlFor="password" className="form-label fw-bold text-white">New Password</label>
                    <input type="password" id="password" className="form-control" placeholder="password"
                        required value={formik.values.password} onChange={formik.handleChange}></input>

                    {/* submit buton */}
                    <div className="d-flex justify-content-center pt-5">
                        <button type="submit" id="submit" className="btn btn-light btn-sm">Submit</button>
                    </div>

                </div>
            </form>
        </div>
    )

}