// Import the models
const { v4: uuidv4 } = require("uuid"); // Import the uuid package to generate random ids

// Define the options data
const optionsData = [
  {
    id: uuidv4(),
    name: "Red",
    PollId: "417407bc-9f41-4828-a2a8-e77631afeca6",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: uuidv4(),
    name: "Blue",
    PollId: "417407bc-9f41-4828-a2a8-e77631afeca6",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: uuidv4(),
    name: "Green",
    PollId: "417407bc-9f41-4828-a2a8-e77631afeca6",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// Export the seeder object
module.exports = {
  // The up method will insert the options data into the database
  up: async (queryInterface, Sequelize) => {
    try {
      // Find the poll by id
      // const { polls: Polls } = await import("../models");
      // const poll = await Polls.findByPk("417407bc-9f41-4828-a2a8-e77631afeca6");
      // Check if the poll exists
      // if (!poll) {
      //   throw new Error("Poll not found");
      // }
      // Insert the options data using bulkCreate
      await queryInterface.bulkInsert("options", optionsData);
      console.log("Options seeded successfully");
    } catch (error) {
      console.error(error.message);
    }
  },
  // The down method will delete the options data from the database
  down: async (queryInterface, Sequelize) => {
    try {
      // Delete the options data using bulkDelete
      await queryInterface.bulkDelete("options", {
        PollId: "417407bc-9f41-4828-a2a8-e77631afeca6",
      });
      console.log("Options deleted successfully");
    } catch (error) {
      console.error(error.message);
    }
  },
};
