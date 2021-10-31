const fs = require("fs");
const crypto = require("crypto");
class UsersRepository {
  constructor(filename) {
    if (!filename) {
      throw new Error("Creating a repository requires a filename");
    }
    this.filename = filename;
    try {
      fs.accessSync(this.filename);
    } catch (err) {
      fs.writeFileSync(this.filename, "[]");
    }
  }
  async getAll() {
    return JSON.parse(
      await fs.promises.readFile(this.filename, {
        encoding: "utf8",
      })
    );
  }

  async create(attributes) {
    // attributes will be an object with key values like email and password
    attributes.id = this.randomId();
    const records = await this.getAll();
    records.push(attributes);
    await this.writeAll(records);
  }
  async writeAll(records) {
    await fs.promises.writeFile(
      this.filename,
      JSON.stringify(records, null, 2)
    );
  }
  randomId() {
    return crypto.randomBytes(4).toString("hex");
  }
  async getOne(id) {
    const records = await this.getAll();
    return records.find((record) => record.id === id);
  }
  async delete(id) {
    const records = await this.getAll();
    const filteredRecords = records.filter((record) => {
      return record.id !== id;
    });
    await this.writeAll(filteredRecords);
  }
  async update(id, attributes) {
    const records = await this.getAll();
    const record = records.find((record) => record.id === id);
    if (!record) {
      throw new Error(`Record with id ${id} not found!`);
    }
    Object.assign(record, attributes);
    await this.writeAll(records);
  }
}

const test = async () => {
  const repo = new UsersRepository("users.json");

  await repo.update("425964", { username: "isinisalo" });
  const users = await repo.getAll();
  console.log(users);
};

test();
