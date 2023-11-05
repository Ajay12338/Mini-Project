import { useState, useRef, useEffect } from "react";
import verify from "../utils/Verification";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase_init";
import { useNavigate } from "react-router-dom";
const Body = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [errorText, setErrorText] = useState(null);
  const navigate = useNavigate();
  const emailId = useRef(null);
  const passwd = useRef(null);
  const medicalId = useRef(null);
  const name_u = useRef(null);
  const changeStatus = () => {
    setIsSignIn(!isSignIn);
  };
  useEffect(() => {
    document.body.classList.add("home");

    return () => {
      document.body.classList.remove("home");
    };
  }, []);
  return (
    <div className="login-container">
      <h2>{isSignIn ? "Login" : "Sign up"} </h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (isSignIn) {
            if (
              !verify(isSignIn, emailId.current.value, passwd.current.value)
            ) {
              setErrorText("Not Valid!");
            } else {
              signInWithEmailAndPassword(
                auth,
                emailId.current.value,
                passwd.current.value
              )
                .then((userCredential) => {
                  navigate("/mainpage", {
                    state: {
                      username: userCredential.user.displayName,
                      userId: userCredential.user.uid,
                    },   
                  });
                })
                .catch((error) => {
                  const errorCode = error.code;
                  const errorMessage = error.message;
                  alert(`${errorCode}: ${errorMessage}`);
                });
              setErrorText(null);
            }
          } else {
            if (
              !verify(
                isSignIn,
                medicalId.current.value,
                emailId.current.value,
                passwd.current.value
              )
            ) {
              setErrorText("Not Valid!");
            } else {
              createUserWithEmailAndPassword(
                auth,
                emailId.current.value,
                passwd.current.value
              )
                .then((userCredential) => {
                  updateProfile(auth.currentUser, {
                    displayName: name_u.current.value,
                  })
                    .then(() => {
                      alert(
                        `${userCredential.user.displayName} is created successfully`
                      );
                    })
                    .catch((error) => {
                      console.error("Error updating user profile:", error);
                    });
                })
                .catch((error) => {
                  console.error("Error creating user:", error);
                });
              setErrorText(null);
            }
          }
        }}
      >
        {isSignIn ? (
          <></>
        ) : (
          <>
            <label htmlFor="med-id">Medical Id</label>
            <input
              type="text"
              placeholder="medical id"
              ref={medicalId}
              id="med-id"
            />
            <label htmlFor="name-u">Name</label>
            <input type="text" placeholder="name" ref={name_u} id="name-u" />
          </>
        )}
        <label htmlFor="email-id">Email</label>
        <input type="text" placeholder="email" ref={emailId} id="email-id" />
        <label htmlFor="pswd">Password</label>
        <input
          type="password"
          name="password"
          id="pswd"
          placeholder="password"
          ref={passwd}
        />
        {<span id="err-txt">{errorText}</span>}
        <div className="btn">
          <button type="submit" className="btn-submit">
            {isSignIn ? "Login" : "Sign Up"}
          </button>
        </div>
      </form>

      {isSignIn ? (
        <p>
          New to this platfom?{" "}
          <span id="signup-txt" onClick={changeStatus}>
            Sign up
          </span>
        </p>
      ) : (
        <p>
          Already a user?{" "}
          <span id="signup-txt" onClick={changeStatus}>
            Login
          </span>
        </p>
      )}
    </div>
  );
};

export default Body;
