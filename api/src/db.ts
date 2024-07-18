import fs from 'fs';
import path from 'path';
import { Database } from './type';
import { User } from './models/user';

const db = {
  filename: 'database.json',
  path() {
    return path.join(__dirname, `../../${db.filename}`);
  },
  read() {
    return JSON.parse(fs.readFileSync(db.path()).toString()) as Database;
  },
  users: {
    find() {
      return db.read().users;
    },
    update(user: User) {
      const data = db.read();
      const index = data.users.findIndex((u) => u.id === user.id);
      if (index > -1) {
        data.users[index] = { ...data.users[index], ...user };
        fs.writeFileSync(db.path(), JSON.stringify(data, null, 2));
        return user;
      }
      return false;
    },
  },
};

export default db;
