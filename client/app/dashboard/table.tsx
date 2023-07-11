import {
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text
} from '@tremor/react';

interface User {
  din: string;
  ssn: string;
  fullName: string;
  dateOfBirth: number;
  residentialAddress: string;
  exists: boolean;
  type: string; // Add the additional properties here
  status: string;
  date: string;
}

export default async function ApplicationTable({ users }: { users: User[] }) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Type</TableHeaderCell>
          <TableHeaderCell>Status</TableHeaderCell>
          <TableHeaderCell>Full Name</TableHeaderCell>
          <TableHeaderCell>Date</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.type}>
            <TableCell>{user.type}</TableCell>
            <TableCell>
              <Text>{user.status}</Text>
            </TableCell>
            <TableCell>
              <Text>{user.fullName}</Text>
            </TableCell>
            <TableCell>
              <Text>{user.date}</Text>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
