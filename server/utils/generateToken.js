const jwt = require("jsonwebtoken");

/**
 * Generates a JSON Web Token (JWT) for a specific user.
 * @param {string} id - The ID of the user for whom the token will be generated.
 * @returns {string} The generated JSON Web Token.
 */
const generateToken = (id) => {

  // Generate the JWT containing the 'id'.
  // The 'jwt.sign' method signs the payload with the provided 'secret' and sets the expiration to '30d' (30 days).
  return jwt.sign({ id }, "thisismysecretkey", {
    expiresIn: "30d",
  });
};

module.exports = generateToken;
