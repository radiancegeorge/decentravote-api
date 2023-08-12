const { v4: uuidv4 } = require("uuid"); // Import the uuid package to generate random ids

// Create an array of some random polls
const polls = [
  {
    id: uuidv4(), // Generate a random uuid for the poll id
    title: "What is your favorite color?", // A simple question for the poll title
    description: "Choose one of the options below.", // A short instruction for the poll description
    ProjectId: "5d7604d1-e93c-40b8-8ba4-c691f2c24f30", // Use the given project id
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: uuidv4(), // Generate another random uuid for the poll id
    title: "How often do you use TypeScript?", // Another question for the poll title
    description:
      "Select the option that best describes your frequency of using TypeScript.", // Another instruction for the poll description
    ProjectId: "5d7604d1-e93c-40b8-8ba4-c691f2c24f30", // Use the same project id
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Insert the polls into the database
    await queryInterface.bulkInsert("polls", polls, {});
  },

  down: async (queryInterface, Sequelize) => {
    // Delete all the polls from the database
    await queryInterface.bulkDelete("polls", null, {});
  },
};
