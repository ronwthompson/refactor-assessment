const crypto = require("crypto");

const createNewHash = (base) => {
  return crypto.createHash("sha3-512").update(base).digest("hex")
}

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;

  if (!event) return TRIVIAL_PARTITION_KEY

  if (!event.partitionKey) {
    return createNewHash(JSON.stringify(event));
  }

  let keyToReturn;

  if (typeof event.partitionKey !== "string") {
    keyToReturn = JSON.stringify(event.partitionKey);
  } else {
    keyToReturn = event.partitionKey;
  }

  if (keyToReturn.length > MAX_PARTITION_KEY_LENGTH) {
    return createNewHash(keyToReturn);
  }

  return keyToReturn
};

// Refactoring Notes:

// The nested if statements are difficult to follow from beginning to end. We can 
// reduce the number of branching paths by isolating a few of them in the beginning. 
// For example, we don't need to go through the whole flow chart if no event is 
// found. Additionally, we just return hash from the event if no partitionKey exists.
// In the rest of the function, we make simple checks to update the candidate
// variable to ensure it meets our requirements (is a string, is within the max 
// length) before finishing. I considered using a switch statement instead but we
// want to make decisions on different properties of our event, which a switch does
// not support. I pulled out the crypto hashing because it was quite wordy and also
// renamed candidate to keyToReturn.