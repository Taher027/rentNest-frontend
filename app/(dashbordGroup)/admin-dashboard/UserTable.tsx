import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { UserStatusCell } from "./UserStatusCell";
import { TUser } from "./_Actions/getAllUsers";

const ROLE_STYLES: Record<string, string> = {
  TENANT: "bg-blue-50 text-blue-700 border-blue-200",
  LANDLORD: "bg-violet-50 text-violet-700 border-violet-200",
  ADMIN: "bg-slate-800 text-white border-slate-800",
};

export function UsersTable({ users }: { users: TUser[] }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <div className="flex items-center gap-2.5">
                  <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full bg-slate-100">
                    {user.avatar && !user.avatar.includes("/api/") && (
                      <Image
                        src={user.avatar}
                        alt={user.name}
                        fill
                        sizes="32px"
                        className="object-cover"
                      />
                    )}
                  </div>
                  <span className="font-medium text-slate-800">
                    {user.name}
                  </span>
                </div>
              </TableCell>
              <TableCell className="text-slate-600">{user.email}</TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={`rounded-full ${
                    ROLE_STYLES[user.role] ??
                    "bg-slate-100 text-slate-600 border-slate-200"
                  }`}
                >
                  {user.role}
                </Badge>
              </TableCell>
              <TableCell>
                <UserStatusCell userId={user.id} status={user.status} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {users.length === 0 && (
        <div className="py-12 text-center text-sm text-slate-400">
          No users found.
        </div>
      )}
    </div>
  );
}
