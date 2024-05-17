import React from "react";
import "./ClientBookings.css";
import ClientNavigationBar from "../../../components/Navigation/ClientNavigationBar";
export default function ClientBookings() {
  return (
    <>
      <ClientNavigationBar />
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Service</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* <a
            href="https://www.flaticon.com/free-icons/empty"
            title="empty icons"
          >
            Empty icons created by kerismaker - Flaticon
          </a> */}
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
    </>
  );
}
