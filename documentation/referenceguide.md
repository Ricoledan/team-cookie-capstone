# Step-by-Step Reference Guide to IDme Application

We are using Ganache to simulate an Ethereum network on our local machine.
Ganache is a personal blockchain for Ethereum development that you can use to deploy contracts,
develop applications, and run tests. Here I use the command line interface (CLI) to run Ganache.

## Output from Truffle

```bash 
  Transaction: 0x4ae6ca8a939db42caa11a2483030df0dcf34b6d8c066511072f68eecae4de93f
  Gas usage: 21000
  Block number: 38
  Block time: Tue Jul 11 2023 09:31:09 GMT-0400 (Eastern Daylight Time)
```

The code snippet above is an example of the output from Truffle, a development framework for Ethereum.
It provides information about a transaction, including the transaction hash, gas usage, block number, and block time.

## Transaction Details

Using Truffle console, you can view the details of a transaction by using the **getTransaction** function

```bash
web3.eth.getTransaction('0x7636ef0b784e2aaf3bfd21ffc44de2c3f06a84fffac81178195014d53be98570')
```

When this function is called,
it communicates with the Ethereum node and retrieves the transaction data associated with this hash.

```bash 
{
  hash: '0x4ae6ca8a939db42caa11a2483030df0dcf34b6d8c066511072f68eecae4de93f',
  type: 0,
  nonce: 37,
  blockHash: '0x7921f9c6a5d0234e6f450983755cc7e98bbff543b6bcff14f881747c4f1e875c',
  blockNumber: 38,
  transactionIndex: 0,
  from: '0x2cC88706389c975F86BA189fC8963F3cFb284D4B',
  to: '0x788771856b0D95Bae8251de79733fCa08a9C7666',
  value: '100000000000000000',
  gas: '0x5208',
  gasPrice: '2000000000',
  input: '0x',
  v: '0xa95',
  r: '0x48bc4b5cbab23bba74e27375795cb9e388da6c71d0f0fcdac1a9ce29cb0b663',
  s: '0x7d2fadb3a9ba4069dec37e383e34124d1f0bd82927d0a43d915a18e18666090a'
}
```

The code snippet above represents a transaction object containing various details such as the hash (unique identifier),
transaction type etc.

### Reference Key

- **Hash**: This is the unique identifier of the transaction, also known as the transaction hash or txhash. It is
  calculated by taking the hash of the entire transaction data.

- **Type**: This indicates the transaction type. EIP-2718 introduced typed transaction envelopes, which can support
  multiple transaction types. A value of '0' typically denotes a legacy transaction.

- **Nonce**: The nonce is the number of transactions sent from a specific address. It is used to prevent double-spending
  and order transactions.

- **Block Hash**: This is the unique identifier of the block that contains the transaction.

- **Block Number**: This represents the number of the block that contains the transaction.

- **Transaction Index**: This is the position of the transaction within the block.

- **From**: This is the address of the account that sent the transaction.

- **To**: This is the address of the account that received the transaction. If it is a contract creation transaction,
  this field will be null.

- **Value**: This indicates the amount of Ether to be sent with the transaction, measured in wei. 1 Ether is equal to
  1e18 wei. For example, 100000000000000000 wei is equal to 0.1 Ether.

- **Gas**: The amount of "gas" the sender is willing to spend on computation and storage for this transaction, measured
  in gas units. It is represented in hexadecimal format.

- **Gas Price**: This is the price the sender is willing to pay per unit of gas, in wei. In your case, it is set to 2
  Gwei (2e9 wei).

- **Input**: This is an optional field that contains the data sent with the transaction. For simple Ether transfers,
  this field is typically '0x'. However, for interactions with smart contracts, it may contain encoded function calls
  and parameters.

- **v, r, s**: These three values together constitute the digital signature of the transaction, which proves that it was
  issued by the sender. They are calculated using the sender's private key and the rest of the transaction data,
  following the ECDSA (Elliptic Curve Digital Signature Algorithm) or potentially the EIP-155 specification for replay
  attack protection in newer Ethereum versions.

These details provide comprehensive information about each transaction, enabling you to understand its properties and
characteristics.

## User Input and Eventing in React

client/app/form.tsx

``` jsx

try {
            const web3 = new Web3('http://localhost:8545');
            const accounts = await web3.eth.getAccounts();
            const tx = {
                from: accounts[0],
                to: accounts[1],
                value: web3.utils.toWei('0.1', 'ether'),
                gas: 21000
            };
            const receipt = await web3.eth.sendTransaction(tx);

            console.log(`Transaction hash: ${receipt.transactionHash}`);
            console.log(`From address: ${receipt.from}`);
            console.log(`To address: ${receipt.to}`);
            console.log(`Gas used: ${receipt.gasUsed}`);
            console.log(`Cumulative gas used: ${receipt.cumulativeGasUsed}`);
            console.log(`Transaction status: ${receipt.status}`);
            console.log(
              `Submitted SSN: ${ssn}, Full Name: ${fullName}, Date of Birth: ${dateOfBirth}, Residential Address: ${residentialAddress}`
            );

            // Store form values in local storage
            const formData = { ssn, fullName, dateOfBirth, residentialAddress };
            const updatedFormValues = [...formValues, formData];
            // @ts-ignore
            setFormValues(updatedFormValues);
            setSubmitted(true); // Update form submission status
            setError(''); // Clear any previous error messages
        } catch (error) {
            // Handle error during transaction submission
            setError('An error occurred during form submission.');
        }

```

### Summary

The overall purpose of this code is to send a small amount of Ether from one account to another on a local
Ethereum blockchain as part of a form submission process

Here's a breakdown of what the code does:

* It creates a connection to an Ethereum node using the Web3 library and fetches the available accounts
* A transaction object (tx) is defined with properties such as from, to, value, and gas.
* The transaction is sent to the blockchain using web3.eth.sendTransaction(tx), and the receipt is stored in the receipt
  variable.

```javascript
const web3 = new Web3('http://localhost:8545');
const accounts = await web3.eth.getAccounts();
const tx = {
  from: accounts[0],
  to: accounts[1],
  value: web3.utils.toWei('0.1', 'ether'),
  gas: 21000
};
const receipt = await web3.eth.sendTransaction(tx);
```

* from: accounts[0] specifies the sender of the transaction, which is the first account from the fetched list of
  accounts.
* to: accounts[1] specifies the receiver of the transaction, which is the second account in the list.
* value: web3.utils.toWei('0.1', 'ether') sets the amount of Ether to send in the transaction.
* gas: 21000 sets the amount of gas to use for the transaction.
* The ```const receipt = await web3.eth.sendTransaction(tx)``` line sends the transaction to the blockchain and waits
  for it
  to be mined. Once the transaction is mined, it returns a receipt that contains details about the transaction.

And we console.log additional information for debugging purposes

``` jsx
    return (
        <div>
            {submitted ? (
                <p className="text-green-500 mb-4">Form submitted successfully!</p>
            ) : (
                <div>
                    <h3 className="text-center mb-4">Please fill in the following details:</h3>
                    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4 md:p-8 my-12 rounded-lg shadow-xl">
                        {error && <p className="text-red-500 mb-4">{error}</p>}
                        {submitted && (
                            <p className="text-green-500 mb-4">Form submitted successfully!</p>
                        )}
                        <div className="flex flex-col mb-4">
                            <label htmlFor="ssn" className="mb-2 font-bold text-lg text-grey-darkest">SSN:</label>
                            <input id="ssn" type="text" value={ssn} onChange={(e) => setSsn(e.target.value)}
                                   className="border py-2 px-3 text-grey-darkest"/>
                        </div>
                        <div className="flex flex-col mb-4">
                            <label htmlFor="fullName" className="mb-2 font-bold text-lg text-grey-darkest">Full
                                Name:</label>
                            <input id="fullName" type="text" value={fullName}
                                   onChange={(e) => setFullName(e.target.value)}
                                   className="border py-2 px-3 text-grey-darkest"/>
                        </div>
                        <div className="flex flex-col mb-4">
                            <label htmlFor="dateOfBirth" className="mb-2 font-bold text-lg text-grey-darkest">Date of
                                Birth:</label>
                            <input id="dateOfBirth" type="date" value={dateOfBirth}
                                   onChange={(e) => setDateOfBirth(e.target.value)}
                                   className="border py-2 px-3 text-grey-darkest"/>
                        </div>
                        <div className="flex flex-col mb-4">
                            <label htmlFor="residentialAddress" className="mb-2 font-bold text-lg text-grey-darkest">Residential
                                Address:</label>
                            <input id="residentialAddress" type="text" value={residentialAddress}
                                   onChange={(e) => setResidentialAddress(e.target.value)}
                                   className="border py-2 px-3 text-grey-darkest"/>
                        </div>
                        <button type="submit"
                                className="block w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
```

We use React to display a form component that conditionally renders content based on the submitted variable:

* If submitted is true, it displays a success message. Otherwise, it renders the form.
* The form includes input fields for SSN, Full Name, Date of Birth, and Residential Address.
* Each input field is bound to a corresponding state variable (e.g., ssn, fullName) using the value attribute and
  updated using the onChange event handler.
* The form also handles form submission by calling the **handleSubmit** function.
* Error handling is implemented by displaying an error message (error) if it exists.
* The setSubmitted and setError functions are called to update the form submission status and clear any previous error
  messages. 
* Styling classes are applied to elements using tailwind CSS classes.
  This code snippet represents a form component in a React application that allows users to input personal details and
  handles form submission and error handling.

## Smart Contracts



## Conclusion
