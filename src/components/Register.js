import React, {useState, useEffect} from 'react';
import {
    Link,
    useHistory
} from "react-router-dom";
import {connect} from 'react-redux';
import {signUp} from './Redux/Actions/FBauthActions';

import Navigation from './Navigation/Navigation';


function Register(props) {

    const {fbauth} = props;

    const history = useHistory();

    const [emailVal, setEmailVal] = useState("");
    const [passwordVal, setPasswordVal] = useState("");
    const [password2Val, setPassword2Val] = useState("");
    const [nameVal, setNameVal] = useState("");
    const [surnameVal, setSurnameVal] = useState("");

    const [emailErr, setEmailErr] = useState("");
    const [passwordErr, setPasswordErr] = useState("");
    const [password2Err, setPassword2Err] = useState("");
    const [nameErr, setNameErr] = useState("");
    const [surnameErr, setSurnameErr] = useState("");
    const [fbResponseErr, setfbResponseErr] = useState();
    const [err, setErr] = useState(false);

    //style states
    const [emailBorder, setEmailBorder] = useState();
    const [passwordBorder, setPasswordBorder] = useState();
    const [password2Border, setPassword2Border] = useState();
    const [nameBorder, setNameBorder] = useState();
    const [surnameBorder, setSurnameBorder] = useState();

    const errStyle = {color: "red"};
    const errBorder = {borderColor: "red"};

    useEffect(()=> {

        if(emailVal.indexOf("@") === -1 ||
        emailVal.indexOf(".") === -1 ||
        passwordVal.length < 6 ||
        password2Val !== passwordVal
        ){
            setErr(true);
        } else {
            setErr(false);
        } 

        if(props.authError){
            if(props.authError === "The email address is badly formatted."){
                setfbResponseErr("Email ma niepoprawny format.")
            } 
        } else {
            setfbResponseErr(null)
        }

        if(fbauth.uid){
            history.push('/')
        }

    }, [emailVal, passwordVal, password2Val, err, history, fbauth.uid]);

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

        if(password2Val !== passwordVal){
            setPassword2Err("Hasła powinny być takie same!")
            setPassword2Border(errBorder);
        } else {
            setPassword2Err("");
            setPassword2Border();
        }

        if(nameVal.length < 3){
            setNameErr("Imię musi mieć conajmniej 3 znaki!")
            setNameBorder(errBorder);
        } else {
            setNameErr("");
            setNameBorder();
        }

        if(surnameVal.length < 3){
            setSurnameErr("Nazwisko musi mieć conajmniej 3 znaki!")
            setSurnameBorder(errBorder);
        } else {
            setSurnameErr("");
            setSurnameBorder();
        }

        if((emailVal.length > 0 && 
            passwordVal.length > 0 && 
            password2Val.length > 0) && 
            err === false){
            
            props.signUp({emailVal, passwordVal, nameVal, surnameVal}); 
        }
    }

    return (
        <>
            <Navigation/>
            <div className="register_container">
                <h1>Wspaniale, że do nas dołączasz.</h1>
                <div className="register_form_container">
                    <form className="register_form">
                        <h1>Załóż konto</h1>
                        <h3 style={errStyle}>{fbResponseErr}</h3>
                        <div className="register_form_inputs">
                            <label className="register_form_label">
                                Email:
                                <div>
                                    <input type="email" onChange={e=> setEmailVal(e.target.value)} 
                                        style={emailBorder} className="register_form_input"/>
                                    <p style={errStyle}>{emailErr}</p>
                                </div>
                            </label>
                            <label className="register_form_label">
                                Hasło:
                                <div>
                                    <input type="text" onChange={e=> setPasswordVal(e.target.value)} 
                                        style={passwordBorder} className="register_form_input"/>
                                    <p style={errStyle}>{passwordErr}</p>
                                </div>
                            </label>
                            <label className="register_form_label">
                                Powtórz hasło:
                                <div>
                                    <input type="text" onChange={e=> setPassword2Val(e.target.value)} 
                                        style={password2Border} className="register_form_input"/>
                                    <p style={errStyle}>{password2Err}</p>
                                </div>
                            </label>
                            <label className="register_form_label">
                                Imię:
                                <div>
                                    <input type="text" onChange={e=> setNameVal(e.target.value)} 
                                        style={nameBorder} className="register_form_input"/>
                                    <p style={errStyle}>{nameErr}</p>
                                </div>
                            </label>
                            <label className="register_form_label">
                                Nazwisko:
                                <div>
                                    <input type="text" onChange={e=> setSurnameVal(e.target.value)} 
                                        style={surnameBorder} className="register_form_input"/>
                                    <p style={errStyle}>{surnameErr}</p>
                                </div>
                            </label>
                        </div>
                        <div className="register_form_buttons">
                            <input type="submit" value="Załóż konto" onClick={handleClick} className="register_form_registerbtn"/>
                            <Link to="/login" className="register_form_loginbtn">Masz już konto?</Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}


const mapStateToProps = state => {
    return {
      fbauth: state.firebase.auth,
      authError: state.FBauthReducer.authError
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signUp: creds => dispatch(signUp(creds))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)