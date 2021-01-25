// Import database
const knex = require("../../db");

const create = async (req, res) => {
  if (Object.keys(req.body).length === 0 && req.bodu.constructor === Object) {
    return res.json({
      status: 400,
      message: "Content can not be empty!",
    });
  }

  const { email, topic } = req.body;
  // email validatoin
  if (!email) {
    return res.json({
      status: 400,
      message: "Email is required",
    });
  }
  const emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
  if (!emailRegex.test(email)) {
    return res.json({
      status: 400,
      message: "Please enter a valid email",
    });
  }

  // topic validation
  if (!topic) {
    return res.json({
      status: 400,
      message: "Topic is required",
    });
  }

  if (topic.includes(" ")) {
    return res.json({
      status: 400,
      message: "Topic can be only one word",
    });
  }

  const newTopic = topic.toLowerCase();
  const newEmail = email.toLowerCase();

  try {
    let topicID = await knex("topics")
      .where({ title: newTopic })
      .select("id")
      .first();

    if (!topicID) {
      topicID = await knex("topics").insert({
        title: newTopic,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
      topicID = topicID[0];
    } else {
      topicID = topicID.id;
    }

    const subscribed = await knex("subscriptions")
      .where({ email: newEmail, topic_id: topicID })
      .select();

    if (subscribed.length > 0) {
      return res.json({
        status: 409,
        message: "Email is already subscribed to topic",
      });
    }

    await knex("subscriptions").insert({
      email: newEmail,
      topic_id: topicID,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });

    return res.status(201).send();
  } catch (err) {
    return res.json({ status: 500, message: "Something went wrong" });
  }
};

module.exports = {
  create,
};
