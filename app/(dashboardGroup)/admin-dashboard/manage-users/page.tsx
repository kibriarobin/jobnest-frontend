import { Users } from 'lucide-react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';

import { Badge } from '@/components/ui/badge';

import { getAllUsers } from '@/service/getAllUsers';

import { UserRoleBadge } from './_components/user-role-badge';
import { ToggleBanButton } from './_components/toggle-ban-button';

export default async function ManageUsersPage() {
  const users = await getAllUsers();

  const regularUsers = users.filter(
    (user) => user.role !== 'ADMIN'
  );

  const adminUsers = users.filter(
    (user) => user.role === 'ADMIN'
  );

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Manage Users
        </h1>

        <p className="text-sm text-muted-foreground">
          View and manage all users across the
          platform.
        </p>
      </div>

      {/* ============================= */}
      {/* Regular Users */}
      {/* ============================= */}

      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold">
            Users
          </h2>

          <p className="text-sm text-muted-foreground">
            Manage candidates and employers.
          </p>
        </div>

        {regularUsers.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-16 text-center">
            <Users className="size-8 text-muted-foreground" />

            <p className="mt-3 text-sm text-muted-foreground">
              No users found.
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-lg border border-border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Verified</TableHead>
                  <TableHead>Status</TableHead>

                  <TableHead className="text-right">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {regularUsers.map((user) => (
                  <TableRow key={user.id}>
                    {/* User */}
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="size-8">
                          <AvatarImage
                            src={
                              user.profilePhoto ??
                              undefined
                            }
                          />

                          <AvatarFallback className="bg-secondary text-xs text-secondary-foreground">
                            {user.name
                              .charAt(0)
                              .toUpperCase()}
                          </AvatarFallback>
                        </Avatar>

                        <div>
                          <p className="text-sm font-medium">
                            {user.name}
                          </p>

                          <p className="text-xs text-muted-foreground">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </TableCell>

                    {/* Role */}
                    <TableCell>
                      <UserRoleBadge
                        role={user.role}
                      />
                    </TableCell>

                    {/* Verified */}
                    <TableCell>
                      {user.isVerified ? (
                        <Badge
                          variant="outline"
                          className="border-0 bg-emerald-500/15 font-medium text-emerald-700 dark:text-emerald-400"
                        >
                          Verified
                        </Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className="border-0 bg-muted font-medium text-muted-foreground"
                        >
                          Unverified
                        </Badge>
                      )}
                    </TableCell>

                    {/* Status */}
                    <TableCell>
                      {user.isBanned ? (
                        <Badge
                          variant="outline"
                          className="border-0 bg-destructive/10 font-medium text-destructive"
                        >
                          Banned
                        </Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className="border-0 bg-emerald-500/15 font-medium text-emerald-700 dark:text-emerald-400"
                        >
                          Active
                        </Badge>
                      )}
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="text-right">
                      <ToggleBanButton
                        userId={user.id}
                        isBanned={user.isBanned}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </section>

      {/* ============================= */}
      {/* Administrators */}
      {/* ============================= */}

      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold">
            Administrators
          </h2>

          <p className="text-sm text-muted-foreground">
            Administrators have full access to the
            platform.
          </p>
        </div>

        {adminUsers.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-12 text-center">
            <Users className="size-8 text-muted-foreground" />

            <p className="mt-3 text-sm text-muted-foreground">
              No administrators found.
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-lg border border-border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Verified</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {adminUsers.map((admin) => (
                  <TableRow key={admin.id}>
                    {/* Admin User */}
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="size-8">
                          <AvatarImage
                            src={
                              admin.profilePhoto ??
                              undefined
                            }
                          />

                          <AvatarFallback className="bg-secondary text-xs text-secondary-foreground">
                            {admin.name
                              .charAt(0)
                              .toUpperCase()}
                          </AvatarFallback>
                        </Avatar>

                        <div>
                          <p className="text-sm font-medium">
                            {admin.name}
                          </p>

                          <p className="text-xs text-muted-foreground">
                            {admin.email}
                          </p>
                        </div>
                      </div>
                    </TableCell>

                    {/* Role */}
                    <TableCell>
                      <UserRoleBadge
                        role={admin.role}
                      />
                    </TableCell>

                    {/* Verified */}
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="border-0 bg-emerald-500/15 font-medium text-emerald-700 dark:text-emerald-400"
                      >
                        Verified
                      </Badge>
                    </TableCell>

                    {/* Status */}
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="border-0 bg-emerald-500/15 font-medium text-emerald-700 dark:text-emerald-400"
                      >
                        Active
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </section>
    </div>
  );
}