const { deterministicPartitionKey } = require("./dpk");
const crypto = require("crypto");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns the a key based on the event if no partitionKey property is found", () => {
    const invalidTestEvent = {
      invalidProperty: "Hello world!"
    }
    const trivialKey = deterministicPartitionKey(invalidTestEvent);
    expect(trivialKey).toBe(crypto.createHash("sha3-512").update(JSON.stringify(invalidTestEvent)).digest("hex"));
  });

  it("Returns the partitionKey if valid", () => {
    const validTestEvent = {
      partitionKey: crypto.createHash("sha3-512").digest("hex")
    }
    const trivialKey = deterministicPartitionKey(validTestEvent);
    expect(trivialKey).toBe(validTestEvent.partitionKey);
  });

  it("Returns the partitionKey as a string when given a number but otherwise unchanged", () => {
    const validTestEvent = {
      partitionKey: 169173111231915
    }
    const trivialKey = deterministicPartitionKey(validTestEvent);
    expect(typeof trivialKey).toBe("string");
    expect(trivialKey).toBe(JSON.stringify(validTestEvent.partitionKey));
  });

  it("Returns the partitionKey as a string when given an object but otherwise unchanged", () => {
    const validTestEvent = {
      partitionKey: { text: "Hello world!"}
    }
    const trivialKey = deterministicPartitionKey(validTestEvent);
    expect(typeof trivialKey).toBe("string");
    expect(trivialKey).toBe(JSON.stringify(validTestEvent.partitionKey));
  });

  it("Returns the updated partitionKey when given key too long", () => {
    const invalidTestEvent = {
      partitionKey: "a69f73cca23a9ac5c8b567dc185a756e97c982164fe25859e0d1dcc1475c80a615b2123af1f5f94c11e3e9402c3ac558f500199d95b6d3e301758586281dcd26a69f73cca23a9ac5c8b567dc185a756e97c982164fe25859e0d1dcc1475c80a615b2123af1f5f94c11e3e9402c3ac558f500199d95b6d3e301758586281dcd26a69f73cca23a9ac5c8b567dc185a756e97c982164fe25859e0d1dcc1475c80a615b2123af1f5f94c11e3e9402c3ac558f500199d95b6d3e301758586281dcd26a69f73cca23a9ac5c8b567dc185a756e97c982164fe25859e0d1dcc1475c80a615b2123af1f5f94c11e3e9402c3ac558f500199d95b6d3e301758586281dcd26"
    }
    const trivialKey = deterministicPartitionKey(invalidTestEvent);
    expect(trivialKey.length).toBe(128);
  });
});
