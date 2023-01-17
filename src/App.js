import React, { useState, Fragment } from "react";
import { nanoid } from "nanoid";
import "./App.css";
import data from "./mock-data.json";
import ReadOnlyRow from "./components/ReadOnlyRow";
import EditableRow from "./components/EditableRow";

const App = () => {
  const [transactions, setContacts] = useState(data);
  const [addFormData, setAddFormData] = useState({
    productName: "",
    amount: "",
    customerName: "",
    status: "",
  });

  const [editFormData, setEditFormData] = useState({
    productName: "",
    amount: "",
    customerName: "",
    status: "",
  });

  const [editContactId, setEditContactId] = useState(null);

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newContact = {
      id: nanoid(),
      productName: addFormData.productName,
      amount: addFormData.amount,
      customerName: addFormData.customerName,
      status: addFormData.status,
    };

    const newContacts = [...transactions, newContact];
    setContacts(newContacts);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      id: editContactId,
      productName: editFormData.productName,
      amount: editFormData.amount,
      customerName: editFormData.customerName,
      status: editFormData.status,
    };

    const newContacts = [...transactions];

    const index = transactions.findIndex((transaction) => transaction.id === editContactId);

    newContacts[index] = editedContact;

    setContacts(newContacts);
    setEditContactId(null);
  };

  const handleEditClick = (event, transaction) => {
    event.preventDefault();
    setEditContactId(transaction.id);

    const formValues = {
      productName: transaction.productName,
      amount: transaction.amount,
      customerName: transaction.customerName,
      status: transaction.stat,
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditContactId(null);
  };

  const handleDeleteClick = (contactId) => {
    const newContacts = [...transactions];

    const index = transactions.findIndex((transaction) => transaction.id === contactId);

    newContacts.splice(index, 1);

    setContacts(newContacts);
  };

  return (
    
    <div className="app-container">
      <h1>Transaction Table</h1>
      <form onSubmit={handleEditFormSubmit}>
        <table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Amount</th>
              <th>Buyer</th>
              <th>status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <Fragment>
                {editContactId === transaction.id ? (
                  <EditableRow
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <ReadOnlyRow
                    transaction={transaction}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </form>

      <h2>Add a transaction</h2>
      <form onSubmit={handleAddFormSubmit}>
        <input
          type="text"
          name="productName"
          required="required"
          placeholder="Enter a product name..."
          onChange={handleAddFormChange}
        />
        <input
          type="number"
          min="0"
          name="amount"
          required="required"
          placeholder="Enter an amount..."
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="customerName"
          required="required"
          placeholder="Enter a customer name..."
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="status"
          required="required"
          placeholder="SUCCESS or FAILED..."
          onChange={handleAddFormChange}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default App;
