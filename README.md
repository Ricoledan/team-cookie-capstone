# Team Cookie Capstone Project

🍪 This capstone project addresses a use case in which a local government agency manages and issues identification
documents such as a driver's license.
The agency is looking to modernize its processes by leveraging a
blockchain solution to address slow processing times for renewing and issuing licenses, verifying the authenticity of a
license, and allowing the identity to be traced between different government agencies with varying access levels.
Additionally, the agency wants to provide citizens with more security and privacy over their personal
information.

## Contents

- [Features](#features)
- [Team Members](#team-members)
- [Components](#components)
- [Project Structure](#project-structure)
- [Quick Start](#quick-start)

## Features

- **Decentralized Identity**: The solution allows citizens to create a decentralized identity that is stored on the
  blockchain.
  The identity is composed of a public key and a private key.
  The public key is used to verify the identity
  of the citizen, while the private key is used to sign transactions and prove ownership of the identity.
- **License Issuance**: The solution allows citizens to request a new license or renew an existing license. The
  government agency can then approve or reject the request. If approved, the citizen's identity is stored on the
  blockchain and the citizen is issued a license.
- **License Verification**: The solution allows citizens to verify the authenticity of a license by scanning the QR code
  on the license.
  The QR code contains the citizen's public key, which can be used to verify the identity of the
  citizen.
- **License Traceability**: The solution allows government agencies to trace the identity of a citizen between different
  agencies.
  For example, a police officer can verify the identity of a citizen by scanning the QR code on the citizen's
  license.
  The QR code contains the citizen's public key, which can be used to verify the identity of the citizen.
  The
  police officer can then use the public key to trace the identity of the citizen to the government agency that issued
  the license.
- **Privacy**: The solution allows citizens to control the amount of information that is shared with government
  agencies.
  For example, a citizen can choose to share their name and address with the government agency that issued their license
  but not with other government agencies.
  The citizen can also choose to share their name and address with all
  government agencies or not share any information at all.
- **Security**: The solution allows citizens to control the amount of information that is shared with government
  agencies. For example, a citizen can choose to share their name and address with the government agency that issued
  their license but not with other government agencies. The citizen can also choose to share their name and address with
  all government agencies or not share any information at all.

## Team Members

- [Jessica Bilston](https://www.linkedin.com/in/jessica-bilston-cpa-ca-672849104/)
- [Nishit Shetty](https://www.linkedin.com/in/nishitsh/)
- [Blake Tobias](https://www.linkedin.com/in/blake-tobias-cpa-555899114)
- [Ricardo Ledan](https://www.linkedin.com/in/ricardoledan/)

## Components

### Next.js

[Next.js](https://nextjs.org/) The library for web and native user interfaces.

### Truffle

[Truffle](https://trufflesuite.com/) The most comprehensive suite of tools for smart contract development.

### Ganache

[Ganache](https://trufflesuite.com/ganache/) is a personal Ethereum blockchain which you can use to run tests, execute
commands, and inspect state while controlling how the chain operates.

### Project Structure

The project follows the following folder structure:

- **root**: Contains project-level configuration files and documentation.
- **client**: Contains the frontend code and assets.
- **contracts**: Contains the Solidity smart contract files.
- **migrations**: Contains the migration scripts for deploying smart contracts.
- **test**: Contains test scripts for smart contract testing.

### Quick Start

Set local development to use Node version 18.16.1 (.nvmrc)

```bash
nvm use 
```

Install dependencies for the client

```bash
cd client && npm i
```

Run Ganache to run a local ethereum blockchain

```bash
ganache
```

Compile and deploy contracts to the local Ganache network.
For testing purposes, run all migrations from the beginning,
regardless of whether they have been previously deployed.

```bash
truffle migrate — reset
```

Run the Frontend Client

```bash
cd client && npm run dev
```

### Helpful Commands

Test a transaction using the Truffle console

```bash
truffle console
```

Creates a build folder and creates a JSON representation of the contract's methods in JSON format.

```bash
truffle compile 
```

Inspect a transaction on the network

```javascript
web3.eth.getTransaction('TRANSACTION_HASH').then(console.log)
```
