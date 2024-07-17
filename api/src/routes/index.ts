import { Router } from 'express';
import middleware from '@blocklet/sdk/lib/middlewares';
import { User, UserSchema } from '../../../shared/models/user';
import db from '../db';

const router = Router();

router.use('/user', middleware.user(), (req, res) => res.json(req.user || {}));

router.get('/profile/:id', (req, res) => {
  const users = db.users.find();
  const user = users.find((u) => u.id === req.params.id);
  const json = user ? { data: user } : { error: { message: 'User not found' } };
  res.json(json);
});

router.put('/profile/:id', (req, res) => {
  const users = db.users.find();
  const found = users.find((user) => user.id === req.params.id);
  if (found) {
    const user = req.body.user as User;
    const result = UserSchema.safeParse(user);
    if (result.success) {
      const data = db.users.update({ ...user, id: found.id });
      return data ? res.json({ data }) : res.json({ error: { message: 'Update faileld' } });
    }
    return res.json({ error: { message: 'Invalid user' } });
  }
  return res.json({ error: { message: `User id ${req.params.id} not found` } });
});

export default router;
