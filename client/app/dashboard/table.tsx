import { Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell, Text } from '@tremor/react';

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

export default function ApplicationTable({ users }: { users: User[] }) {
  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // Month is zero-based, so we add 1
  const day = currentDate.getDate();

  const formattedDate = `${day}/${month}/${year}`;

  let displayValues: any[] = [];

  if (typeof localStorage !== 'undefined') {
    const storedValues = JSON.parse(localStorage.getItem('formValues') || '[]');
    displayValues = Array.isArray(storedValues) ? storedValues : [];
  }

  try {
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
          {users.length > 0 ? (
            users.map((user) => (
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
            ))
          ) : (
            displayValues.map((value, index) => (
              <TableRow key={index}>
                <TableCell>Driver's License</TableCell>
                <TableCell>
                  <Text>Pending</Text>
                </TableCell>
                <TableCell>
                  <Text>{value.fullName}</Text>
                </TableCell>
                <TableCell>
                  <Text>{formattedDate}</Text>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    );
  } catch (error) {
    // Handle the error gracefully, e.g., log it or display a fallback UI
    console.error('Hydration error:', error);
    return null; // or return a fallback UI component
  }
}
