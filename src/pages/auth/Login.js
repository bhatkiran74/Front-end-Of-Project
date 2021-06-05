import React, { useState, useEffect } from "react";
import "./Register";
import { auth, googleAuthProvider } from "../../firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";
import { Button } from "antd";
import { MailOutlined, GoogleOutlined } from "@ant-design/icons";
//state
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { createOrUpdateUser } from '../../functions/auth';






const Login = () => {

    const dispatch = useDispatch();
    let history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const user = useSelector(state => ({ ...state }))

    useEffect(() => {
        let intended = history.location.state;
        if (intended) {
            return;
        } else {
            if (user && user.token) history.push("/");
        }
    }, [user, history]);


    const roleBasedRedirect = (res) => {
        // check if intended
        let intended = history.location.state;
        if (intended) {
            history.push(intended.from);
        } else {
            if (res.data.role === "admin") {
                history.push("/admin/dashboard");
            } else {
                history.push("/user/history");
            }
        }
    };



    //login through email and password
    const handleSubmit = async (e) => {
        e.preventDefault(); //to prevent to load
        setLoading(true);
        //login with email and password inside firbase

        try {
            const result = await auth.signInWithEmailAndPassword(email, password);

            console.log(result);
            const { user } = result;
            const idTokenResult = await user.getIdTokenResult();

            createOrUpdateUser(idTokenResult.token)
                .then((res) => {
                    dispatch({
                        type: "LOGGED_IN_USER",
                        payload: {
                            name: res.data.name,
                            email: res.data.email,
                            token: idTokenResult.token,
                            role: res.data.role,
                            _id: res.data._id,

                        },
                    })
                    roleBasedRedirect(res);

                }

                )
                .catch((err) => console.log(err))

            console.log(result);
        } catch (error) {
            console.log(error);
            toast.error(error.message);
            setLoading(false);
        }
    };

    //login with gmail
    const googleLogin = async () => {
        auth
            .signInWithPopup(googleAuthProvider)
            .then(async (result) => {
                const { user } = result;
                const idTokenResult = await user.getIdTokenResult();

                createOrUpdateUser(idTokenResult.token)
                    .then((res) => {
                        dispatch({
                            type: "LOGGED_IN_USER",
                            payload: {
                                name: res.data.name,
                                email: res.data.email,
                                token: idTokenResult.token,
                                role: res.data.role,
                                _id: res.data._id,

                            }
                        })
                        roleBasedRedirect(res);
                    }

                    )
                    .catch((err) => console.log(err))
            })
            .catch((err) => {
                console.log(err);
                toast.error(err.message);
            });
    };

    const loginFrom = () => (
        <form onSubmit={handleSubmit}>
            <div className="from-group">
                <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your Email"
                    autoFocus
                />
            </div>
            <div className="from-group">
                <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Your Password"
                />
            </div>

            <br />

            <Button
                type="primary"
                className="mb-3"
                block
                shape="round"
                size="large"
                icon={<MailOutlined />}
                onClick={handleSubmit}
                disabled={!email || password.length < 6}
            >
                Login with Email & Password
      </Button>
        </form>
    );

    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    {loading ? (
                        <h4 className="text-danger">Loading...</h4>
                    ) : (
                        <h4>Login</h4>
                    )}
                    {loginFrom()}

                    <Button
                        type="danger"
                        className="mb-3"
                        block
                        shape="round"
                        size="large"
                        icon={<GoogleOutlined />}
                        onClick={googleLogin}
                    >
                        Login With Google
          </Button>


                    <Link to='/forget/password' className="float-right text-danger">Forgot Password</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
