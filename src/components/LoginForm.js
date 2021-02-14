import React, { useState, useEffect, useRef } from "react";
import { useFormik, FieldArray } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { isLogin } from "../utils/Auth";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

const LoginForm = (props) => {
  const [formEmail, setFormEmail] = useState("");
  const [isExistUser, setExistUser] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    "Please create an account to login in to this"
  );
  let history = useHistory();

  const handleEmail = (e) => {
    setFormEmail(e.target.value);
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: formEmail,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email Required"),
    }),
    onSubmit: (values, { resetForm }) => {
      localStorage.setItem("loginUserEmail", values.email);
      if (isLogin()) {
        Swal.fire({
          icon: "success",
          title: "Successfully Login into Account",
          text: "",
          timer: 1000,
          onOpen: function () {
            Swal.showLoading();
          },
        });
        setTimeout(() => {
          setExistUser(false);
          history.push("/dashboard");
        }, 1000);
      } else {
        setExistUser(true);
      }
    },
  });

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="panel panel-primary">
            <div className="panel-body">
              <h1> Login By Email </h1>
              {isExistUser ? (
                <h4 style={{ color: "red" }}>Note:-{errorMessage}</h4>
              ) : null}
              <form onSubmit={formik.handleSubmit}>
                <div className="form-group">
                  <label>
                    Email<span>*</span>
                  </label>
                  <input
                    id="email"
                    type="text"
                    maxLength="50"
                    className={
                      "form-control" +
                      (formik.errors.email && formik.touched.email
                        ? " is-invalid"
                        : "")
                    }
                    placeholder="Email"
                    name="email"
                    onChange={(e) => handleEmail(e)}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="invalid-feedback">
                      {formik.errors.email}
                    </div>
                  ) : null}
                </div>

                <div className="form-group">
                  <button
                    id="add"
                    type="submit"
                    className="btn btn-info btn-block"
                  >
                    Login
                  </button>
                </div>

                <hr />

                <Link to="/signup">Create Account to login</Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
