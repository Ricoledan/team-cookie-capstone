'use client';

import { useEffect, useState } from 'react';
import { Card, Title, Text } from '@tremor/react';
import Search from './search';
import ApplicationTable from './table';

export const dynamic = 'force-dynamic';

export default function IndexPage({
                                    searchParams
                                  }: {
  searchParams: { q: string };
}) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      // Assuming you have a local Ganache instance running at http://localhost:8545
      const response = await fetch('http://localhost/api/identities');
      const data = await response.json();
      setUsers(data);
    }

    fetchUsers();
  }, []);

  const search = searchParams.q ?? '';
  const filteredUsers = users.filter(user => user.name.includes(search));

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
