export enum Role {
  Admin = "admin",
  Caregiver = "caregiver",
  Manager = "manager",
}
export type User = {
  username: string;
  password: string;
  role: Role;
};

export const Users: User[] = [
  { username: "JohnA", password: "12345", role: Role.Admin },
  { username: "JohnC", password: "12345", role: Role.Caregiver },
  { username: "JohnM", password: "12345", role: Role.Manager },
];

module.exports = { Users };
