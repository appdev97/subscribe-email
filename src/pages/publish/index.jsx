import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import History from "../history";
import { getTopics, addMessage, getHistory } from "../../api";

import "./style.scss";

const broadcastSchema = Yup.object().shape({
  topic: Yup.string().required("Topic is required"),
  message: Yup.string().required("Message is required"),
});

const PublishPage = ({ history }) => {
  const [topicList, setTopicList] = useState([]);
  const [data, setData] = useState([]);

  const loadHistory = async () => {
    try {
      const res = await getHistory();
      setData(res.data.data);
    } catch (err) {
      alert("Error occured while getting message history");
    }
  };
  const loadTopics = async () => {
    try {
      const topics = await getTopics();
      setTopicList(topics.data.data);
    } catch (err) {
      alert("Error occured while getting topics");
    }
  };

  useEffect(() => {
    loadTopics();
    loadHistory();
  }, []);

  const handleBroadcast = async (values, { resetForm }) => {
    try {
      const res = await addMessage(values);

      if (res.status === 201) {
        resetForm();
        loadHistory();
        alert("Successfully broadcasted!");
      } else {
        throw new Error(res.data.message);
      }
    } catch (err) {
      alert(err || "Something went wrong");
    }
  };

  return (
    <div className="container">
      <div className="publish-page-wrapper">
        <div className="publish-page">
          <div className="form-wrapper">
            <Formik
              initialValues={{ topic: "", message: "" }}
              validationSchema={broadcastSchema}
              onSubmit={handleBroadcast}
            >
              <Form>
                <div className="publish-form">
                  <fieldset>
                    <div className="form-row">
                      <label className="form-label">Topic</label>
                      <Field
                        as="select"
                        placeholder="Topic"
                        className="form-select"
                        name="topic"
                      >
                        <option value="" disabled hidden>
                          Choose topic
                        </option>
                        {topicList.length > 0 &&
                          topicList.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.title}
                            </option>
                          ))}
                      </Field>
                      <ErrorMessage
                        component="div"
                        name="topic"
                        className="has-error"
                      />
                    </div>

                    <div className="form-row">
                      <label className="form-label">Broadcast Message</label>
                      <Field
                        as="textarea"
                        className="form-input"
                        name="message"
                        rows={10}
                        placeholder="input message here..."
                      />
                      <ErrorMessage
                        component="div"
                        name="message"
                        className="has-error"
                      />
                    </div>
                  </fieldset>
                </div>

                <button type="submit" className="btn btn-add">
                  Broadcast
                </button>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
      <History history={history} data={data} />
    </div>
  );
};

export default PublishPage;
