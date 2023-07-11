import Web3 from 'web3';

const provider = new Web3.providers.HttpProvider('http://localhost:8545/');
const web3 = new Web3(provider);

async function getIdentities() {
  const contractABI: any[] = [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "string",
          "name": "din",
          "type": "string"
        }
      ],
      "name": "IdentityCreated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "string",
          "name": "din",
          "type": "string"
        }
      ],
      "name": "IdentityUpdated",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "name": "citizens",
      "outputs": [
        {
          "internalType": "string",
          "name": "din",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "ssn",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "fullName",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "dateOfBirth",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "residentialAddress",
          "type": "string"
        },
        {
          "internalType": "bool",
          "name": "exists",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_din",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_ssn",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_fullName",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_dateOfBirth",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_residentialAddress",
          "type": "string"
        }
      ],
      "name": "createIdentity",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_din",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_ssn",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_fullName",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_dateOfBirth",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_residentialAddress",
          "type": "string"
        }
      ],
      "name": "updateIdentity",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];
  const contractAddress: string = '0xD119849Ceefac75661bCF539b84BD80C6a9E410a';

  const contract = new web3.eth.Contract(contractABI, contractAddress);
  const dinList = await contract.methods.getAllDINs().call();

  return await Promise.all(
    dinList.map(async (din: string) => {
      const identity = await contract.methods.citizens(din).call();
      return {
        din: identity.din,
        ssn: identity.ssn,
        fullName: identity.fullName,
        dateOfBirth: identity.dateOfBirth,
        residentialAddress: identity.residentialAddress,
        exists: identity.exists,
      };
    })
  );
}

export default async function handler(req: any, res: any) {
  try {
    const identities = await getIdentities();
    res.status(200).json(identities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve identities' });
  }
}
