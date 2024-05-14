import React from "react";
import SearchBar from "../../../components/SearchBar/SearchBar";
import "./CompanyDashBoard.css";
export default function CompanyDashBoard() {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>ClientName</th>
            <th>Service</th>
            <th>Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {/* {data.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.title}</td>
                  <td>
                    <button onClick={() => handleDelete(item.id)}>Delete</button>
                  </td>
                </tr>
              ))} */}
        </tbody>
      </table>
      <div className="image-container">
        <img src="/empty.png" alt="" className="centered-image" />
      </div>
    </div>
  );
}
