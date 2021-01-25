// Import database
const knex = require("../../db");
const mailer = require("../services/node-mailer");

const create = async (req, res) => {
  if (Object.keys(req.body).length === 0 && req.body.constructor === Object) {
    return res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const { message, topic } = req.body;

  if (!message) {
    return res.json({
      status: 400,
      message: "Message is required",
    });
  }
  if (!topic) {
    return res.json({
      status: 400,
      message: "Topic is required",
    });
  }

  try {
    let emails = await knex("subscriptions")
      .where({ topic_id: topic })
      .select("email");

    emails = emails.map((item) => item.email).join(",");
    mailer
      .sendMail(emails, message)
      .catch((err) =>
        res.json({ status: 500, message: "Email failed to send" })
      );

    const newData = {
      topic_id: topic,
      message: message,
      emails: emails,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    await knex("messages").insert(newData);

    return res.status(201).send({ data: newData });
  } catch (err) {
    return res.json({ status: 500, message: "Something went wrong" });
  }
};

const read = async (req, res) => {
  const { id } = req.params;
  try {
    let query =
      "select messages.*, topics.title from messages, topics where messages.topic_id = topics.id";
    if (id) {
      query += ` and messages.id = ${id}`;
    }
    const data = await knex.raw(query);
    return res.status(200).send({ data: data });
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};

module.exports = {
  create,
  read,
};
