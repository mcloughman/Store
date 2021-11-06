const fs = require("fs");
const crypto = require("crypto");
const util = require("util");
const Repository = require("./repository");

const scrypt = util.promisify(crypto.scrypt);

class UsersRepository extends Repository {
  async create(attributes) {
    // attributes will be an object with key values like email and password
    attributes.id = this.randomId();
    const salt = crypto.randomBytes(8).toString("hex");
    const buffer = await scrypt(attributes.password, salt, 64); // we don't need a callback since we promisifed it
    const records = await this.getAll();
    const record = {
      ...attributes,
      password: `${buffer.toString("hex")}.${salt}`,
    };
    records.push(record);
    await this.writeAll(records);
    return record;
  }
  async comparePasswords(savedPassword, suppliedPassword) {
    // const result = savedPassword.split(".");
    // const hashed = result[0];
    // const salt = result[1];
    // just using destructuring below cnodenses the code into a single line
    const [hashed, salt] = savedPassword.split(".");
    const hashedSuppliedBuffer = await scrypt(suppliedPassword, salt, 64);

    return hashed === hashedSuppliedBuffer.toString("hex");
  }
}

module.exports = new UsersRepository("users.json");
