'use client';

import { useEffect, useState } from 'react';
import { Card, Title, Text } from '@tremor/react';
import Search from './search';
import ApplicationTable from './table';
import Identity from '../../../build/contracts/Identity.json';
import Web3 from 'web3';

interface Citizen {
  din: string;
  ssn: string;
  fullName: string;
  dateOfBirth: number;
  residentialAddress: string;
  exists: boolean;
}

interface User extends Citizen {
  type: string;
  status: string;
  date: string;
}

export const dynamic = 'force-dynamic';

export default function DashboardPage({
                                        searchParams,
                                      }: {
  searchParams: { q: string };
}) {
  const [users, setUsers] = useState<User[]>([]);

  const search = searchParams.q ?? '';

  useEffect(() => {
    async function fetchIdentity() {
      try {
        const web3 = new Web3('http://localhost:8545');
        const contractInstance = new web3.eth.Contract(
          Identity.abi,
          '0xEDC3fB54878387Ba3328E13aD2A046283803D3E5'
        );
        const citizenArray = await contractInstance.methods.getAllIdentities().call();
        console.log('list of identities', citizenArray);

        // @ts-ignore
        const fetchedUsers: User[] = citizenArray.map((citizen: Citizen) => ({
          din: citizen.din,
          ssn: citizen.ssn,
          fullName: citizen.fullName,
          dateOfBirth: citizen.dateOfBirth,
          residentialAddress: citizen.residentialAddress,
          exists: citizen.exists,
          type: 'Passport',
          status: 'Approved',
          date: '07/10/2023',
        }));

        setUsers(fetchedUsers);
      } catch (error) {
        console.error('Failed to fetch identity', error);
      }
    }

    fetchIdentity();
  }, []);

  const filteredUsers = users.filter((user) =>
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
