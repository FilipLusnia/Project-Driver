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
            <div>
                <div>
                    <h1>Zaloguj się</h1>
                    <form>
                        <div >
                            <label>
                                Email:
                                <input type="email" onChange={e=> setEmailVal(e.target.value)} style={emailBorder}/>
                                <p style={errStyle}>{emailErr}</p>
                            </label>
                            <label>
                                Hasło:
                                <input type="text" onChange={e=> setPasswordVal(e.target.value)} style={passwordBorder}/>
                                <p style={errStyle}>{passwordErr}</p>
                            </label>
                        </div>
                        <div>
                            <Link to="/register">Załóż konto</Link>
                            <input type="submit" value="Zaloguj się" onClick={handleClick}/>
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