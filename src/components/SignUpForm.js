import React, { useState, useEffect, useRef } from "react";
import { useFormik, FieldArray } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";

import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
const SignUpForm = (props) => {
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formEducation, setFormEducation] = useState("");
  const [formMessage, setFormMessage] = useState("");

  let history = useHistory();

  //Used useState to set the form value so that data will not be erase on form reinitialization
  const handleEducation = (e) => {
    setFormEducation(e.target.value);
  };

  const handleMessage = (e) => {
    setFormMessage(e.target.value);
  };

  const handleName = (e) => {
    setFormName(e.target.value);
  };

  const handleEmail = (e) => {
    setFormEmail(e.target.value);
  };

  const handlePhone = (e) => {
    setFormPhone(e.target.value);
  };

  //Regex for phone number as well as name
  const phoneRegExp = /^[6-9]\d{9}$/;
  const nameRegExp = /^[a-zA-Z]+$/;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: formName,
      email: formEmail,
      phone: formPhone,
      education: formEducation,
      message: formMessage,
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .matches(nameRegExp, "Name should be in A-Z/a-z")
        .required("Name Required"),
      message: Yup.string().required("Required"),

      phone: Yup.string()
        .matches(phoneRegExp, "Phone number should be 0-9 of 10 digite")
        .required("Email Required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email Required"),
      education: Yup.string().required("Required"),
    }),
    onSubmit: (values, { resetForm }) => {
      Swal.fire({
        icon: "success",
        title: "",
        text: "Successfully Account Created",
        timer: 3000,
        onOpen: function () {
          Swal.showLoading();
        },
      });

      let obj = [];

      //Entry of single user
      localStorage.setItem("loginUserEmail", values.email);

      const userCount = localStorage.getItem("userCount");

      if (userCount && userCount != null) {
        let count = parseInt(userCount) + 1;
        localStorage.setItem("userCount", count);
      } else {
        localStorage.setItem("userCount", 1);
      }

      values.id = localStorage.getItem("userCount");

      const userItem = localStorage.getItem("userItem");
      const userItemParse = JSON.parse(userItem);

      if (userItemParse && userItemParse != null) {
        obj.push(...userItemParse, values);
        localStorage.setItem("userItem", JSON.stringify(obj));
      } else {
        obj.push(values);
        localStorage.setItem("userItem", JSON.stringify(obj));
      }

      setTimeout(() => {
        history.push("/dashboard");
      }, 3000);

      return false;
    },
  });

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="panel panel-primary">
            <div className="panel-body">
              <h1>Sign Up</h1>
              <form onSubmit={formik.handleSubmit}>
                <div className="form-group">
                  <label>
                    Name<span>*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    maxLength="50"
                    className={
                      "form-control" +
                      (formik.errors.name && formik.touched.name
                        ? " is-invalid"
                        : "")
                    }
                    placeholder="New Task"
                    name="name"
                    onChange={(e) => handleName(e)}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                  />
                  {formik.touched.name && formik.errors.name ? (
                    <div className="invalid-feedback">{formik.errors.name}</div>
                  ) : null}
                </div>

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
                  <label>
                    Phone<span>*</span>
                  </label>
                  <input
                    id="phone"
                    type="text"
                    maxLength="50"
                    className={
                      "form-control" +
                      (formik.errors.phone && formik.touched.phone
                        ? " is-invalid"
                        : "")
                    }
                    placeholder="phone"
                    name="phone"
                    onChange={(e) => handlePhone(e)}
                    onBlur={formik.handleBlur}
                    value={formik.values.phone}
                  />
                  {formik.touched.phone && formik.errors.phone ? (
                    <div className="invalid-feedback">
                      {formik.errors.phone}
                    </div>
                  ) : null}
                </div>

                <div className="form-group">
                  <label>
                    Education<span style={{ marginRight: "10px" }}>*</span>
                  </label>
                  <select
                    maxLength="50"
                    className={
                      "form-control" +
                      (formik.errors.education && formik.touched.education
                        ? " is-invalid"
                        : "")
                    }
                    placeholder="Education"
                    name="education"
                    onChange={(e) => handleEducation(e)}
                    onBlur={formik.handleBlur}
                    value={formik.values.education}
                  >
                    <option value="">----</option>
                    <option value="BE">BE</option>
                    <option value="MTECH">MTECH</option>
                  </select>

                  {formik.touched.education && formik.errors.education ? (
                    <div className="invalid-feedback">
                      {formik.errors.education}
                    </div>
                  ) : null}
                </div>

                <div className="form-group">
                  <label>
                    Message<span>*</span>
                  </label>
                  <textarea
                    rows="3"
                    className={
                      "form-control" +
                      (formik.errors.message && formik.touched.message
                        ? " is-invalid"
                        : "")
                    }
                    placeholder=""
                    name="message"
                    onChange={(e) => handleMessage(e)}
                    onBlur={formik.handleBlur}
                    value={formik.values.message}
                  ></textarea>
                  {formik.touched.message && formik.errors.message ? (
                    <div className="invalid-feedback">
                      {formik.errors.message}
                    </div>
                  ) : null}
                </div>

                <div className="form-group">
                  <button
                    id="add"
                    type="submit"
                    className="btn btn-info btn-block"
                  >
                    SignUp
                  </button>
                </div>

                <hr />

                <Link to="/">Login</Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpForm;
