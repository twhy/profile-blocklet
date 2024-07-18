import { useEffect, useState } from 'react';
import { User } from '../models/user';
import api from '../libs/api';

export default function useProfile(id: string) {
  const [user, setUser] = useState({} as User);
  const [error, setError] = useState<null | Error>(null);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);

  function refetch() {
    setError(null);
    setLoading(true);
    api
      .get(`/api/profile/${id}`)
      .then((res) => res.data)
      .then((json) => {
        if (json.error) {
          setError(new Error(json.error?.message));
        } else {
          setUser(json.data);
        }
      })
      .catch((e) => setError(e))
      .finally(() => setLoading(false));
  }

  function update({ success = () => {} }: { success: Function }) {
    setError(null);
    setUpdating(true);
    api
      .put(`/api/profile/${user.id}`, { user })
      .then((res) => res.data)
      .then((json) => {
        if (json.error) {
          setError(new Error(json.error?.message));
        } else {
          success();
          setUser(json.data);
        }
      })
      .catch((e) => setError(e))
      .finally(() => setUpdating(false));
  }

  useEffect(refetch, [id]);

  return { user, setUser, error, update, refetch, loading, updating };
}
