import React from "react";

const ReadOnlyRow = ({ transaction, handleEditClick, handleDeleteClick }) => {
  return (
    <tr>
      <td>{transaction.productName}</td>
      <td>{transaction.amount}</td>
      <td>{transaction.customerName}</td>
      <td>{transaction.status}</td>
      <td>
        <button
          type="button"
          onClick={(event) => handleEditClick(event, transaction)}
        >
          Edit
        </button>
        <button type="button" onClick={() => handleDeleteClick(transaction.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;
