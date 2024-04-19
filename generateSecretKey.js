import crypto from 'crypto';

// Generate a random buffer of specified length
const generateRandomBuffer = (length) => {
  return crypto.randomBytes(length);
};

// Convert buffer to a hexadecimal string
const bufferToHexString = (buffer) => {
  return buffer.toString('hex');
};

// Generate a random string of specified length
const generateRandomString = (length) => {
  const buffer = generateRandomBuffer(length / 2); // Divide by 2 because 1 byte = 2 hex characters
  return bufferToHexString(buffer);
};

// Generate a secure random string for JWT secret key
const generateJWTSecret = (length) => {
  return generateRandomString(length);
};

// Example: Generate a JWT secret key of length 64 characters (32 bytes)
const jwtSecret = generateJWTSecret(64);
console.log(jwtSecret);
