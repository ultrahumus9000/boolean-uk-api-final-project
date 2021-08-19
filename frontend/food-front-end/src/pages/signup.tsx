import "../styles/signup.css";

import React from "react";
import SignUpForm from "../components/SignUpForm";
import Headline from "../components/Headline";

function Signup() {
  return (
    <>
      <Headline />
      <section className="signup">
        <SignUpForm />
      </section>
    </>
  );
}

export default Signup;
