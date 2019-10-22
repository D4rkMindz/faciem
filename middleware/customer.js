import { RoleLevel } from '@/domain/role/role-level';

export default function ({ store, redirect }) {
  if ((store.getters['auth/hasRoleAbove'](RoleLevel.CUSTOMER)) !== true) {
    return redirect('/');
  }
};
