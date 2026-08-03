import { getAllUsers } from "./_Actions/getAllUsers";
import { UsersTable } from "./UserTable";

export default async function AdminUsersPage() {
  const users = await getAllUsers();

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-1 text-xl font-semibold text-slate-900">Users</h1>
      <p className="mb-6 text-sm text-slate-500">
        {users.length} user{users.length !== 1 ? "s" : ""}
      </p>

      <UsersTable users={users} />
    </div>
  );
}
