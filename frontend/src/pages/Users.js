import React from "react";
import UserTableContainer from "../containers/Tables/UserTableContainer";

export default function Users() {
  return (
    <div className="users-page">
      <h1>Users page</h1>
      <UserTableContainer />
    </div>
  );
}
