import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { addSubscription } from "../../api";

import "./style.scss";

const subscribeSchema = Yup.object().shape({
  email: Yup.string()
    .email("Enter a valid Email address")
    .required("Email is required"),
  topic: Yup.string().required("Topic is required"),
});

const SubscribePage = () => {
  const handleSubscribe = async (values, { resetForm }) => {
    try {
      const res = await addSubscription(values);

      if (res.status === 201) {
        resetForm();
        alert("Successfully subscribed!");
      } else {
        throw new Error(res.data.message);
      }
    } catch (err) {
      alert(err || "Something went wrong");
    }
  };

  return (
    <div className="subscribe-page-wrapper">
      <div className="subscribe-page">
        <div className="form-wrapper">
          <Formik
            initialValues={{ email: "", topic: "" }}
            validationSchema={subscribeSchema}
            onSubmit={handleSubscribe}
          >
            <Form>
              <div className="subscribe-form">
                <fieldset>
                  <div className="form-row">
                    <label className="form-label">Email</label>
                    <Field
                      className="form-input"
                      name="email"
                      placeholder="email address"
                    />
                    <ErrorMessage
                      component="div"
                      name="email"
                      className="has-error"
                    />
                  </div>

                  <div className="form-row">
                    <label className="form-label">Topic</label>
                    <Field
                      className="form-input"
                      name="topic"
                      placeholder="toipc"
                    />
                    <ErrorMessage
                      component="div"
                      name="topic"
                      className="has-error"
                    />
                  </div>
                </fieldset>
              </div>
              <button type="submit" className="btn btn-add">
                Subscribe
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default SubscribePage;
