import React, { useState } from "react";
import Head from "next/head";
import styles from "./login.module.css";
import { useRef } from "react";
import { nanoid } from "nanoid";
import { firebaseAuth, firestore } from "../../../firebase";
import { useRouter } from "next/router";
export default function SignUpComponent() {
  const [passwordFieldHidden, setPasswordFieldHidden] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const nameRef = useRef<HTMLInputElement>();
  const emailRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();
  const router = useRouter();
  const loginSubmit = (event): void => {
    event.preventDefault();
    const email = emailRef.current
      ? emailRef.current.value.toLowerCase().trim()
      : undefined;
    const password = passwordRef.current
      ? passwordRef.current.value.trim()
      : undefined;

    const splitted = nameRef.current.value.split(" ");
    const lastName = splitted[splitted.length - 1];
    splitted.pop();
    const firstName = splitted.join();
    firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then((value) => {
        firestore
          .collection("users")
          .add({
            email: value.user.providerData[0].email,
            first_name: firstName,
            last_name: lastName,
            uid: nanoid(49),
          })
          .then(() => {
            setAuthenticated(true);
          });
      });
  };
  if (authenticated) {
    router.push("/");
    return null;
  }
  return (
    <>
      <Head>
        <title>SignUp - KeySafe.io</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.logoContainer}>
          <img src="/images/KeySafeIO-logo.png" className={styles.logo} />
        </div>
        <form action="/" className={styles.form} onSubmit={loginSubmit}>
          <div className={styles.inputContainer}>
            <input
              ref={nameRef}
              type="text"
              className={styles.inputField}
              placeholder="Full Name"
              spellCheck="false"
              autoCorrect="false"
            />
          </div>
          <div className={styles.inputContainer}>
            <input
              ref={emailRef}
              type="email"
              className={styles.inputField}
              placeholder="Email"
              spellCheck="false"
              autoCorrect="false"
            />
          </div>
          <div className={styles.inputContainer}>
            <input
              ref={passwordRef}
              type={passwordFieldHidden ? "password" : "text"}
              className={styles.inputField}
              placeholder="Password"
              spellCheck="false"
              autoCorrect="false"
            />
            <div className={styles.showHideField}>
              <button
                type="button"
                className={styles.passwordBtn}
                onClick={() => {
                  setPasswordFieldHidden(!passwordFieldHidden);
                }}
              >
                {passwordFieldHidden ? (
                  <svg
                    width="14"
                    height="11"
                    viewBox="0 0 14 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.9996 5.09375C4.9996 5.55788 5.18398 6.003 5.51217 6.33119C5.84035 6.65938 6.28547 6.84375 6.7496 6.84375C7.21373 6.84375 7.65885 6.65938 7.98704 6.33119C8.31523 6.003 8.4996 5.55788 8.4996 5.09375C8.4996 4.62962 8.31523 4.1845 7.98704 3.85631C7.65885 3.52812 7.21373 3.34375 6.7496 3.34375C6.28547 3.34375 5.84035 3.52812 5.51217 3.85631C5.18398 4.1845 4.9996 4.62962 4.9996 5.09375V5.09375ZM13.534 4.69063C12.0527 1.57031 9.81366 0 6.8121 0C3.80898 0 1.57148 1.57031 0.090227 4.69219C0.0308135 4.818 0 4.9554 0 5.09453C0 5.23366 0.0308135 5.37107 0.090227 5.49687C1.57148 8.61719 3.81054 10.1875 6.8121 10.1875C9.81523 10.1875 12.0527 8.61719 13.534 5.49531C13.6543 5.24219 13.6543 4.94844 13.534 4.69063V4.69063ZM6.7496 7.84375C5.23085 7.84375 3.9996 6.6125 3.9996 5.09375C3.9996 3.575 5.23085 2.34375 6.7496 2.34375C8.26835 2.34375 9.4996 3.575 9.4996 5.09375C9.4996 6.6125 8.26835 7.84375 6.7496 7.84375Z"
                      fill="#808080"
                    />
                  </svg>
                ) : (
                  <svg
                    width="14"
                    height="13"
                    viewBox="0 0 14 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.93759 8.74988C7.40172 8.74988 7.84684 8.56551 8.17503 8.23732C8.50322 7.90913 8.68759 7.46401 8.68759 6.99988C8.68759 6.94863 8.68525 6.89785 8.68087 6.8477L6.7854 8.74317C6.83556 8.74754 6.88618 8.74988 6.93759 8.74988ZM12.7301 1.58676L12.0626 0.919883C12.0392 0.896459 12.0074 0.883301 11.9742 0.883301C11.9411 0.883301 11.9093 0.896459 11.8859 0.919883L10.1777 2.62848C9.23546 2.14691 8.17624 1.90613 7.00009 1.90613C3.99697 1.90613 1.75634 3.4702 0.278215 6.59832C0.218802 6.72413 0.187988 6.86153 0.187988 7.00066C0.187988 7.1398 0.218802 7.2772 0.278215 7.40301C0.86884 8.64707 1.58004 9.64421 2.41181 10.3944L0.75884 12.0468C0.735416 12.0702 0.722257 12.102 0.722257 12.1351C0.722257 12.1683 0.735416 12.2 0.75884 12.2235L1.42587 12.8905C1.44931 12.9139 1.48109 12.9271 1.51423 12.9271C1.54737 12.9271 1.57915 12.9139 1.60259 12.8905L12.7301 1.76363C12.7417 1.75202 12.7509 1.73824 12.7572 1.72306C12.7635 1.70789 12.7668 1.69162 12.7668 1.6752C12.7668 1.65877 12.7635 1.6425 12.7572 1.62733C12.7509 1.61215 12.7417 1.59837 12.7301 1.58676ZM4.18759 6.99988C4.18755 6.52489 4.31053 6.05799 4.54457 5.64466C4.77861 5.23133 5.11571 4.88566 5.52305 4.64133C5.93038 4.39701 6.39406 4.26236 6.8689 4.25049C7.34374 4.23863 7.81356 4.34996 8.23259 4.57363L7.4729 5.33332C7.16653 5.23522 6.83905 5.22341 6.5264 5.29917C6.21376 5.37494 5.92802 5.53536 5.70054 5.76284C5.47307 5.99031 5.31265 6.27605 5.23688 6.5887C5.16111 6.90134 5.17293 7.22882 5.27103 7.5352L4.51134 8.29488C4.29815 7.89657 4.18693 7.45166 4.18759 6.99988V6.99988Z"
                      fill="#808080"
                    />
                    <path
                      d="M13.722 6.59678C13.172 5.43844 12.5174 4.49391 11.7581 3.76318L9.50594 6.01553C9.69579 6.5118 9.73787 7.05243 9.6271 7.5721C9.51633 8.09177 9.25744 8.56825 8.88172 8.94397C8.506 9.31969 8.02953 9.57857 7.50986 9.68934C6.99018 9.80011 6.44955 9.75803 5.95328 9.56818L4.04297 11.4785C4.92922 11.8886 5.91495 12.0937 7.00016 12.0937C10.0033 12.0937 12.2439 10.5296 13.722 7.40146C13.7815 7.27566 13.8123 7.13825 13.8123 6.99912C13.8123 6.85999 13.7815 6.72258 13.722 6.59678V6.59678Z"
                      fill="#808080"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
          <button type="submit" className={styles.loginBtn}>
            Register
          </button>
        </form>
      </div>
    </>
  );
}
