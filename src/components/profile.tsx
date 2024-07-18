import { useState, useEffect } from 'react';
import { User, UserSchema } from '../models/user';
import { Field } from './field';
import { Button } from './button';
import useProfile from '../hooks/use-profile';

export type ProfileProps = {
  id: string;
};

const ERROR_ON_FIELDS = { id: false, login: false, email: false, phone: false };

export function Profile({ id }: ProfileProps) {
  const [edit, setEdit] = useState(false);
  const [valid, setValid] = useState(false);
  const [stale, setStale] = useState(false);
  const [notice, setNotice] = useState({ text: '', error: false });
  const [errors, setErrors] = useState(ERROR_ON_FIELDS);
  const { user, setUser, error, update, refetch, loading, updating } = useProfile(id);

  const notify = (text: string, isError = false) => {
    setNotice({ text, error: isError });
    setTimeout(() => setNotice({ text: '', error: false }), 5000);
  };

  const onEdit = () => {
    setEdit((v) => !v);
  };

  const onCancel = () => {
    refetch();
    setEdit(false);
    setErrors({ ...ERROR_ON_FIELDS });
    setNotice({ text: '', error: false });
  };

  const onSave = () => {
    if (!stale) return onCancel();
    if (!valid) return false;
    return update({
      success: () => {
        setEdit(false);
        setErrors({ ...ERROR_ON_FIELDS });
        notify('信息已保存');
      },
    });
  };

  const onChange = (value: string, field: string) => {
    setStale(true);
    setUser((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    if (error) notify(error.message, true);
  }, [error]);

  useEffect(() => {
    if (!user.id) return;
    const result = UserSchema.safeParse(user);
    setValid(result.success);
    if (result.success) {
      setErrors({ ...ERROR_ON_FIELDS });
    } else {
      const paths = result.error.issues.reduce((acc, err) => acc.concat(err.path as any), []) as (keyof User)[];
      const err = { ...ERROR_ON_FIELDS };
      for (const path of paths) {
        err[path] = true;
      }
      setErrors(err);
    }
  }, [user]);

  return (
    <div className="max-w-96 mx-auto">
      <div className="space-y-4 mt-10">
        <Field
          id="login"
          name="login"
          label="用户名"
          value={user.login || ''}
          error={errors.login}
          disabled={!edit || updating}
          loading={loading}
          onChange={onChange}
          placeholder="中英文数字均可，长度 3~20"
        />
        <Field
          id="email"
          name="email"
          type="email"
          label="邮箱"
          value={user.email || ''}
          error={errors.email}
          disabled={!edit || updating}
          loading={loading}
          onChange={onChange}
          placeholder="user@example.com"
        />
        <Field
          id="phone"
          name="phone"
          label="手机"
          value={user.phone || ''}
          error={errors.phone}
          disabled={!edit || updating}
          loading={loading}
          onChange={onChange}
          placeholder="11 位手机号码"
        />
      </div>
      <div className="mt-10 mb-6 flex space-x-8">
        {edit ? (
          <>
            <Button text="取 消" className="flex-1" onClick={onCancel} />
            <Button
              text="保 存"
              type="primary"
              className="flex-1"
              loading={updating}
              disabled={!valid}
              onClick={onSave}
            />
          </>
        ) : (
          <Button text="编 辑" type="primary" onClick={onEdit} disabled={loading} className="flex-1" />
        )}
      </div>
      <div className={notice.error ? 'text-red-600' : 'text-cyan-500'}>{notice.text}</div>
    </div>
  );
}
