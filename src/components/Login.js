import React, {useState, useEffect} from 'react';
import {
    Link,
    useHistory
} from "react-router-dom";
import {connect} from 'react-redux';
import {signIn} from './Redux/Actions/FBauthActions';

import Navigation from './Navigation/Navigation';
import Footer from './Navigation/Footer';


function Login(props) {
    
    const {fbauth} = props;
    const history = useHistory();

    const [emailVal, setEmailVal] = useState("");
    const [passwordVal, setPasswordVal] = useState("");

    const [emailErr, setEmailErr] = useState("");
    const [passwordErr, setPasswordErr] = useState("");
    const [fbResponseErr, setfbResponseErr] = useState();
    const [err, setErr] = useState(false);

    //style states
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

        if(props.authError){
            if(props.authError === "There is no user record corresponding to this identifier. The user may have been deleted."){
                setfbResponseErr("Ten email nie jest przypisany do żadnego konta.")
            } else if(props.authError === "The password is invalid or the user does not have a password."){
                setfbResponseErr("Nie prawidłowe hasło.")
            }
        } else {
            setfbResponseErr(null)
        }

        if(fbauth.uid){
            history.push('/')
        }

    }, [emailVal, passwordVal, err, history, fbauth.uid, props.authError]);


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
        <>
            <Navigation/>
            <div className="login_container">
                <h1>Witaj z powrotem.</h1>
                <div className="login_form_container">
                    <form className="login_form">
                        <h1>Zaloguj się</h1>
                        <h3 style={errStyle}>{fbResponseErr}</h3>
                        <div>
                            <label className="login_form_label">
                                Email:
                                <div>
                                    <input type="email" onChange={e=> setEmailVal(e.target.value)} 
                                        style={emailBorder} className="login_form_input"/>
                                    <p style={errStyle}>{emailErr}</p>
                                </div>
                            </label>
                            <label className="login_form_label">
                                Hasło:
                                <div>
                                    <input type="text" onChange={e=> setPasswordVal(e.target.value)} 
                                        style={passwordBorder} className="login_form_input"/>
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
            <Footer/>
        </>
    )
}

const mapStateToProps = state => {
    return {
      fbauth: state.firebase.auth,
      authError: state.FBauthReducer.authError
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signIn: creds => dispatch(signIn(creds))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)