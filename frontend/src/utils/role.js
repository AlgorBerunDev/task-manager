export const Role = {
  admin: "admin",
  employee: "employee",
};
export function isAdmin(user) {
  return user.roles.includes(Role.admin);
}

export function isEmployee(user) {
  return user.roles.includes(Role.employee);
}

export function hasRole(user, roles) {
  return !!user?.roles.find(role => roles.includes(role));
}
