// Import database
const knex = require("../../db");

const read = async (req, res) => {
  try {
    const data = await knex("topics").select();
    return res.status(200).send({ data: data });
  } catch (err) {
    return res.json({ status: 500, message: "Something went wrong" });
  }
};

module.exports = {
  read,
};
