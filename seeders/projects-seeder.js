const { v4: uuidv4 } = require("uuid"); // Import the uuid package to generate random ids

// Create an array of 10 random projects
const projects = Array.from({ length: 10 }, () => {
  // Generate a random hexadecimal string for the contract address
  const contractAddress = "0x" + Math.random().toString(16).slice(2, 42);

  // Generate a random name for the project using some common words
  const words = [
    "Alpha",
    "Beta",
    "Gamma",
    "Delta",
    "Epsilon",
    "Zeta",
    "Eta",
    "Theta",
    "Iota",
    "Kappa",
  ];
  const name = words[Math.floor(Math.random() * words.length)] + " Project";

  // Generate a random symbol for the project using some common letters
  const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  const symbol =
    letters[Math.floor(Math.random() * letters.length)] +
    letters[Math.floor(Math.random() * letters.length)] +
    letters[Math.floor(Math.random() * letters.length)];

  // Assign the user id of 'aeeb4c75-60f9-41b9-934f-381a405aa687' or null with equal probability
  const userId =
    Math.random() < 0.5 ? "aeeb4c75-60f9-41b9-934f-381a405aa687" : null;

  return {
    id: uuidv4(), // Generate a random uuid for the project id
    contractAddress: contractAddress, // Use the generated contract address
    name: name, // Use the generated name
    symbol: symbol, // Use the generated symbol
    UserId: userId, // Use the assigned user id
    createdAt: new Date(),
    updatedAt: new Date(),
  };
});

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Insert the projects into the database
    await queryInterface.bulkInsert("projects", projects, {});
  },

  down: async (queryInterface, Sequelize) => {
    // Delete all the projects from the database
    await queryInterface.bulkDelete("projects", null, {});
  },
};
