// Import path module
const path = require("path");

// Get the location of database.sqlite file
const dbPath = path.resolve(__dirname, "db/database.sqlite");

// Create connection to SQLite database
const knex = require("knex")({
  client: "sqlite3",
  connection: {
    filename: dbPath,
  },
  useNullAsDefault: true,
});

// Create a table in the database called "topics"
knex.schema
  // Make sure no "topics" table exists
  // before trying to create new
  .hasTable("topics")
  .then((exists) => {
    if (!exists) {
      // If no "topics" table exists
      // create new, with "id", "title"
      // and use "id" as a primary identification
      // and increment "id" with every new record (topics)
      return knex.schema
        .createTable("topics", (table) => {
          table.increments().primary();
          table.string("title");
          table.timestamp("created_at");
          table.timestamp("updated_at");
        })
        .then(() => {
          // Log success message
          console.log("Table 'topics' created");
        })
        .catch((error) => {
          console.error(`There was an error creating table: ${error}`);
        });
    }
  })
  .then(() => {
    // Log success message
    console.log("done");
  })
  .catch((error) => {
    console.error(`There was an error setting up the database: ${error}`);
  });

// Create a table in the database called "subscriptions"
knex.schema
  // Make sure no "subscriptions" table exists
  // before trying to create new
  .hasTable("subscriptions")
  .then((exists) => {
    if (!exists) {
      // If no "subscriptions" table exists
      // create new, with "id", "email", "topic_id"
      // and use "id" as a primary identification
      // and increment "id" with every new record (subscriptions)
      return knex.schema
        .createTable("subscriptions", (table) => {
          table.increments().primary();
          table.string("email");
          table.integer("topic_id");
          table.timestamp("created_at");
          table.timestamp("updated_at");
        })
        .then(() => {
          // Log success message
          console.log("Table 'Subscriptions' created");
        })
        .catch((error) => {
          console.error(`There was an error creating table: ${error}`);
        });
    }
  })
  .then(() => {
    // Log success message
    console.log("done");
  })
  .catch((error) => {
    console.error(`There was an error setting up the database: ${error}`);
  });

// Create a table in the database called "messages"
knex.schema
  // Make sure no "messages" table exists
  // before trying to create new
  .hasTable("messages")
  .then((exists) => {
    if (!exists) {
      // If no "messages" table exists
      // create new, with "id", "message", "topic_id", "emails"
      // and use "id" as a primary identification
      // and increment "id" with every new record (messages)
      return knex.schema
        .createTable("messages", (table) => {
          table.increments().primary();
          table.integer("topic_id");
          table.string("message");
          table.string("emails");
          table.timestamp("created_at");
          table.timestamp("updated_at");
        })
        .then(() => {
          // Log success message
          console.log("Table 'messages' created");
        })
        .catch((error) => {
          console.error(`There was an error creating table: ${error}`);
        });
    }
  })
  .then(() => {
    // Log success message
    console.log("done");
  })
  .catch((error) => {
    console.error(`There was an error setting up the database: ${error}`);
  });

// Export the database
module.exports = knex;
