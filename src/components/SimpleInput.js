import { useState, useRef, useEffect } from "react";

const SimpleInput = (props) => {
  const [enteredName, setEnteredName] = useState("");
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);

  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredEmailTouched, setEnteredEmailTouched] = useState(false);

  const [formIsValid, setFormIsValid] = useState(false);
  const enteredNameIsValid = enteredName.trim() !== "";
  const enteredEmailIsValid = enteredEmail.includes('@');

  const validName = !enteredNameIsValid && enteredNameTouched;
  const validEmail = !enteredEmailIsValid && enteredEmailTouched;

  useEffect(() => {
    if (enteredNameIsValid && enteredEmailIsValid) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
  }, [enteredNameIsValid, enteredEmailIsValid]);

  const enteredNameChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };
  const enteredNameBlurHandler = () => {
    setEnteredNameTouched(true);
  };

  const enteredEmailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };
  const enteredEmailBlurHandler = () => {
    setEnteredEmailTouched(true);
  };

  const formSubmissionEventhandler = (event) => {
    event.preventDefault();
    setEnteredNameTouched(true);
    setEnteredEmailTouched(true);

    if (!enteredNameIsValid || !enteredEmailIsValid) {
      return;
    }
    console.log(enteredName);
    // console.log(nameRef.current.value);
    setEnteredName("");
    setEnteredNameTouched(false);
    setEnteredEmail("");
    setEnteredEmailTouched(false);
  };

  const nameInputClasses = !validName
    ? "form-control"
    : "form-control  invalid";
    const emailInputClasses = !validEmail
    ? "form-control"
    : "form-control  invalid";
  return (
    <form onSubmit={formSubmissionEventhandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          // ref={nameRef}
          type="text"
          id="name"
          value={enteredName}
          onChange={enteredNameChangeHandler}
          onBlur={enteredNameBlurHandler}
        />
        {validName && <p className="error-text">Name must not be empty</p>}
      </div>
      <div className={emailInputClasses}>
        <label htmlFor="name">Email</label>
        <input
          type="text"
          id="email"
          value={enteredEmail}
          onChange={enteredEmailChangeHandler}
          onBlur={enteredEmailBlurHandler}
        />
        {validEmail && <p className="error-text">email must not be empty</p>}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
