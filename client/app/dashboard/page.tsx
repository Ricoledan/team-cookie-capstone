'use client';

import { useEffect, useState } from 'react';
import { Card, Title, Text } from '@tremor/react';
import Search from './search';
import ApplicationTable from './table';

interface User {
  din: string;
  ssn: string;
  fullName: string;
  dateOfBirth: number;
  residentialAddress: string;
  exists: boolean;
  type: string;
  status: string;
  date: string;
}

export const dynamic = 'force-dynamic';

export default function DashboardPage({
                                        searchParams
                                      }: {
  searchParams: { q: string };
}) {
  const [users, setUsers] = useState<User[]>([
    {
      din: '123456789',
      ssn: '123-45-6789',
      fullName: 'John Doe',
      dateOfBirth: 946684800000, // January 1, 2000
      residentialAddress: '123 Main St, Anytown, USA',
      exists: true,
      type: 'Driver License',
      status: 'Approved',
      date: '07/11/2023'
    },
    {
      din: '987654321',
      ssn: '987-65-4321',
      fullName: 'Jane Smith',
      dateOfBirth: 915148800000, // January 1, 1999
      residentialAddress: '456 Elm St, Anytown, USA',
      exists: true,
      type: 'Driver License',
      status: 'Pending',
      date: '07/11/2023'
    }
  ]);
  const search = searchParams.q ?? '';

  useEffect(() => {
    // Fetch data from API or perform any necessary operations
    // to populate the `users` state variable
    // ...

    // For demonstration purposes, we'll just set the state with the mock data immediately
    setUsers([
      {
        din: '123456789',
        ssn: '123-45-6789',
        fullName: 'John Doe',
        dateOfBirth: 946684800000, // January 1, 2000
        residentialAddress: '123 Main St, Anytown, USA',
        exists: true,
        type: 'Passport',
        status: 'Approved',
        date: '07/10/2023'
      },
      {
        din: '987654321',
        ssn: '987-65-4321',
        fullName: 'Jane Smith',
        dateOfBirth: 915148800000, // January 1, 1999
        residentialAddress: '456 Elm St, Anytown, USA',
        exists: true,
        type: 'Passport',
        status: 'Rejected',
        date: '07/11/2023'
      }
    ]);
  }, []);

  const filteredUsers = users.filter(user =>
    user.fullName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Application Status</Title>
      <Text>A list of applications with various statuses retrieved.</Text>
      <Search />
      <Card className="mt-6">
        <ApplicationTable users={filteredUsers} />
      </Card>
    </main>
  );
}
