import crypto from "crypto";
import util from "util";
import Repository from "./repository.js";
const scrypt = util.promisify(crypto.scrypt);

class UsersRepository extends Repository {
  async create(attrs) {
    attrs.id = this.randomId();
    const salt = crypto.randomBytes(8).toString("hex");
    const buf = await scrypt(attrs.password, salt, 64);

    const records = await this.getAll();
    const record = {
      ...attrs,
      password: `${buf.toString("hex")}.${salt}`,
    };
    records.push(record);
    await this.writeAll(records);
    return record;
  }

  async comparePasswords(saved, supplied) {
    const [hashed, salt] = saved.split(".");
    const hashedBuf = await scrypt(supplied, salt, 64);
    return hashed === hashedBuf.toString("hex");
  }
}
export default new UsersRepository("users.json");

//ALL THE TESTING CODE RELATED TO CLASS FUNCTIONALITY.
// const callFunc = async () => {
//   const repo = await new UsersRepository("users.json");
//   //   await repo.create({ email: "tex@gmail.com", password: "password" });
//   //   await repo.update("a8a43f0d", { password: "#fff" });
//   //   const users = await repo.getAll();
//   const user = await repo.getOneBy({ password: "fff" });
//   console.log(user);
// };
// callFunc();
