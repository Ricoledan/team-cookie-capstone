'use strict';

import { Card, Title, Text } from '@tremor/react';

export default function IndexPage() {
  return (
    <main className='p-4 md:p-10 mx-auto max-w-7xl'>
      <Card className='mt-6 relative'>
        <div
          className='absolute inset-0 w-full h-96 bg-cover bg-center'
          style={{ backgroundImage: `url(https://images.unsplash.com/photo-1667453466805-75bbf36e8707?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2832&q=80)` }}
        ></div>
      </Card>
    </main>
  );
}
