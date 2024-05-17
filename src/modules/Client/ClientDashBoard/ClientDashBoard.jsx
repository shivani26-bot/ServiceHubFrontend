import React from "react";
import SearchBar from "../../../components/SearchBar/SearchBar";
import ClientNavigationBar from "../../../components/Navigation/ClientNavigationBar";

export default function ClientDashBoard() {
  return (
    <>
      <ClientNavigationBar />
      <SearchBar />
    </>
  );
}
