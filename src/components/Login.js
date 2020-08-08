import React, {useState, useEffect} from 'react';
import {
    Link,
    useHistory
} from "react-router-dom";
import {connect} from 'react-redux';
import {signIn} from './Redux/Actions/FBauthActions';

import Navigation from './Navigation/Navigation';


function Login(props) {

    const {fbauth} = props;

    const history = useHistory();

    const [emailVal, setEmailVal] = useState("");
    const [passwordVal, setPasswordVal] = useState("");

    const [emailErr, setEmailErr] = useState("");
    const [passwordErr, setPasswordErr] = useState("");
    const [err, setErr] = useState(false);
    const [emailBorder, setEmailBorder] = useState();
    const [passwordBorder, setPasswordBorder] = useState();

    const errStyle = {color: "red"};
    const errBorder = {borderColor: "red"};

    useEffect(()=> {
        if( emailVal.indexOf("@") === -1 ||
            emailVal.indexOf(".") === -1 ||
            passwordVal.length < 6
        ){
            setErr(true);
        } else {
            setErr(false);
        }

        if(fbauth.uid){
            history.push('/')
        }

    }, [emailVal, passwordVal, err, history, fbauth.uid]);


    const handleClick = (e)=> {
        e.preventDefault();

        if (emailVal.includes("@") === false || emailVal.includes(".") === false || emailVal < 5){
            setEmailErr("Podano zły email!")
            setEmailBorder(errBorder);
        } else {
            setEmailErr("");
            setEmailBorder();
        }

        if(passwordVal.length < 6){
            setPasswordErr("Hasło musi zawierać conajmniej 6 znaków!")
            setPasswordBorder(errBorder);
        } else {
            setPasswordErr("");
            setPasswordBorder();
        }

        if((emailVal.length > 0 && 
            passwordVal.length > 0) && 
            err === false){
            
            props.signIn({emailVal, passwordVal});
        }
    }

    return (
        <div>
            <Navigation/>
            <div className="login_container">
                <h1>Witaj z powrotem.</h1>
                <div className="login_form_container">
                    <form className="login_form">
                        <h1>Zaloguj się</h1>
                        <div className="login_form_inputs">
                            <label className="login_form_label-email">
                                Email:
                                <div>
                                    <input type="email" onChange={e=> setEmailVal(e.target.value)} 
                                        style={emailBorder} className="login_form_input-email"/>
                                    <p style={errStyle}>{emailErr}</p>
                                </div>
                            </label>
                            <label className="login_form_label-password">
                                Hasło:
                                <div>
                                    <input type="text" onChange={e=> setPasswordVal(e.target.value)} 
                                        style={passwordBorder} className="login_form_input-password"/>
                                    <p style={errStyle}>{passwordErr}</p>
                                </div>
                            </label>
                        </div>
                        <div className="login_form_buttons">
                            <input type="submit" value="Zaloguj się" onClick={handleClick} className="login_form_loginbtn"/>
                            <Link to="/register" className="login_form_registerbtn">Nie masz jeszcze konta?</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
      fbauth: state.firebase.auth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signIn: creds => dispatch(signIn(creds)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)