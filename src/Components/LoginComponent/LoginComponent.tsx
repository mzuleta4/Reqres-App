import React, {useState} from 'react';
import {Navbar, NavbarBrand} from "reactstrap";
import {login, signUp} from "../../Services";
import {checkMail, toast} from "../../Util/Utils";
import {useDispatch} from "react-redux";
import {initLogin} from "../../Redux/Actions/AuthActions";
import history from "../../Util/History";

const LoginComponent = () => {

    const [emailLogin, setEmailLogin] = useState('');
    const [passwordLogin, setPasswordLogin] = useState('');

    const [emailRegister, setEmailRegister] = useState('');
    const [passwordRegister, setPasswordRegister] = useState('');

    const [loadingRegister, setLoadingRegister] = useState(false);
    const [loadingLogin, setLoadingLogin] = useState(false);

    const dispatch = useDispatch();

    const signIn = async (e: any) => {
        e.preventDefault();
        setLoadingLogin(true);
        if (emailLogin.length === 0 || passwordLogin.length === 0) {
            toast("Verificar campos vacios.", "error");
            setLoadingLogin(false);
        } else {
            if (checkMail(emailLogin)) {
                try {
                    const res = await login({email: emailLogin, password: passwordLogin});
                    console.log(res);
                    dispatch(initLogin(emailLogin, res.token));
                    setLoadingLogin(false);
                    history.push("/list")
                }catch (e) {
                    toast("Credenciales invalidas.", "error");
                    setLoadingLogin(false);
                }
            } else {
                toast("Ingrese un email valido.", "error");
                setLoadingLogin(false);
            }

        }
    };

    const sign_up = async (e: any) => {
        e.preventDefault();
        setLoadingRegister(true);

        if (emailRegister.length === 0 && passwordRegister.length === 0) {
            toast("Verificar campos vacios.", "error");
            setLoadingRegister(false);

        } else {
            if (checkMail(emailRegister)) {
                const res = await signUp({email: emailRegister, password: passwordRegister});
                dispatch(initLogin(emailRegister, res.token));
                setLoadingRegister(false);
            } else {
                toast("Ingrese un email valido.", "error");
                setLoadingLogin(false);
            }

        }
    };


    return <div>

        <Navbar light className='navbar-color' expand="md">
            <NavbarBrand href="#/list">Reqres App</NavbarBrand>
        </Navbar>

        <div className="row justify-content-center pt-5">
            <div className="col-8 col-md-4 col-lg-3">
                <div className="card card-custom-login">
                    <div className="card-body">
                        <h4 className="card-title">Sign In</h4>

                        <div className="form-group row pt-3 m-2">
                            <label htmlFor="inputEmailLogin">Email</label>
                            <input type="text" className="form-control" onChange={e => setEmailLogin(e.target.value)}
                                   value={emailLogin} id="inputEmailLogin"/>
                        </div>

                        <div className="form-group row pt-2 m-2">
                            <label htmlFor="inputPasswordLogin">Password</label>
                            <input type="password" className="form-control"
                                   onChange={e => setPasswordLogin(e.target.value)} value={passwordLogin}
                                   id="inputPasswordLogin"/>
                        </div>

                        {loadingLogin ? <div className="spinner-border text-primary" role="status"/> :
                            <div className="text-center">
                                <button type="submit" onClick={e => signIn(e)} className="btn btn-success mt-3 custom-button-login">Sign In
                                </button>
                            </div>
                        }
                    </div>
                </div>
            </div>
            <div className="col-8 col-md-4 mt-5 mt-sm-0 col-lg-3">
                <div className="card card-custom-login">
                    <div className="card-body">
                        <h5 className="card-title">Sign Up</h5>
                        <div className="form-group row pt-3 m-2">
                            <label htmlFor="inputEmailRegister">Email</label>
                            <input type="text" className="form-control" onChange={e => setEmailRegister(e.target.value)}
                                   value={emailRegister} id="inputEmailRegister"/>
                        </div>

                        <div className="form-group row pt-2 m-2">
                            <label htmlFor="inputPasswordRegister">Password</label>
                            <input type="password" className="form-control"
                                   onChange={e => setPasswordRegister(e.target.value)} value={passwordRegister}
                                   id="inputPasswordRegister"/>
                        </div>
                        {loadingRegister ? <div className="spinner-border text-primary" role="status"/> :
                            <div className="text-center">
                                <button type="submit" onClick={(e: any) => sign_up(e)}
                                        className="btn btn-primary mt-3 custom-button-login">Sign Up
                                </button>
                            </div>
                        }

                    </div>
                </div>
            </div>
        </div>
    </div>
};

export default LoginComponent;