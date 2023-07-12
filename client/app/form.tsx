import { FormEvent, useState, useEffect } from 'react';
import Web3 from 'web3';

export default function Home() {
    const [ssn, setSsn] = useState('');
    const [fullName, setFullName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [residentialAddress, setResidentialAddress] = useState('');
    const [error, setError] = useState(''); // State for displaying validation error
    const [submitted, setSubmitted] = useState(false); // State for tracking form submission
    const [formValues, setFormValues] = useState([]); // State for storing form values

    useEffect(() => {
        // Retrieve form values from local storage
        const storedFormValues = localStorage.getItem('formValues');
        if (storedFormValues) {
            setFormValues(JSON.parse(storedFormValues));
        }
    }, []);

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        // Handle form submission logic here
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
            localStorage.setItem('formValues', JSON.stringify(updatedFormValues));

            setSubmitted(true); // Update form submission status
            setError(''); // Clear any previous error messages
        } catch (error) {
            // Handle error during transaction submission
            setError('An error occurred during form submission.');
        }
    };

    const validateForm = () => {
        if (!ssn || !fullName || !dateOfBirth || !residentialAddress) {
            setError('Please fill in all fields.');
            return false;
        }
        // Add additional validation logic if needed
        setError('');
        return true;
    };

    return (
      <div>
          {submitted ? (
            <p className="text-green-500 mb-4">Form submitted successfully!</p>
          ) : (
            <div>
                <h3 className="text-center mb-4">Please fill in the following details:</h3>
                <form
                  onSubmit={handleSubmit}
                  className="max-w-xl mx-auto p-4 md:p-8 my-12 rounded-lg shadow-xl"
                >
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    {submitted && (
                      <p className="text-green-500 mb-4">Form submitted successfully!</p>
                    )}
                    <div className="flex flex-col mb-4">
                        <label htmlFor="ssn" className="mb-2 font-bold text-lg text-grey-darkest">
                            SSN:
                        </label>
                        <input
                          id="ssn"
                          type="text"
                          value={ssn}
                          onChange={(e) => setSsn(e.target.value)}
                          className="border py-2 px-3 text-grey-darkest"
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="fullName" className="mb-2 font-bold text-lg text-grey-darkest">
                            Full Name:
                        </label>
                        <input
                          id="fullName"
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="border py-2 px-3 text-grey-darkest"
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="dateOfBirth" className="mb-2 font-bold text-lg text-grey-darkest">
                            Date of Birth:
                        </label>
                        <input
                          id="dateOfBirth"
                          type="date"
                          value={dateOfBirth}
                          onChange={(e) => setDateOfBirth(e.target.value)}
                          className="border py-2 px-3 text-grey-darkest"
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label
                          htmlFor="residentialAddress"
                          className="mb-2 font-bold text-lg text-grey-darkest"
                        >
                            Residential Address:
                        </label>
                        <input
                          id="residentialAddress"
                          type="text"
                          value={residentialAddress}
                          onChange={(e) => setResidentialAddress(e.target.value)}
                          className="border py-2 px-3 text-grey-darkest"
                        />
                    </div>
                    <button
                      type="submit"
                      className="block w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Submit
                    </button>
                </form>
            </div>
          )}
      </div>
    );
}
