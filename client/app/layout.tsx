import './globals.css';

import { Analytics } from '@vercel/analytics/react';
import Nav from './nav';
import { Suspense } from 'react';

export const metadata = {
  title: 'IDme Web Application',
  description:
    '🍪This capstone project addresses a use case in which a local government agency manages and issues identification documents such as a driver\'s license. The agency is looking to modernize its processes by leveraging a blockchain solution to address slow processing times for renewing and issuing licenses, verifying the authenticity of a license, and allowing the identity to be traced between different government agencies with varying access levels. Additionally, the agency wants to provide citizens with more security and privacy over their personal information.'
};

export default async function RootLayout({
                                           children
                                         }: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className='h-full bg-gray-50'>
    <body className='h-full'>
    <Suspense>
      <Nav />
    </Suspense>
    {children}
    <Analytics />
    </body>
    </html>
  );
}
