import axios from "axios";

const instance = axios.create({
  baseURL: `http://localhost:4001`,
});

const getTopics = () => instance.get("/topics");

const addSubscription = ({ email, topic }) =>
  instance.post("/subscriptions", { email, topic });

const addMessage = ({ topic, message }) =>
  instance.post("/messages", { topic, message });

const getHistory = (id) => instance.get(`/messages/${id ?? ""}`);

export { getTopics, addMessage, addSubscription, getHistory };
