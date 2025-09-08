import React from "react";

export default function UsersTable({ users }) {
  return (
    <div className="rounded-md border p-4 bg-white">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border-b p-2 text-left">UserID</th>
            <th className="border-b p-2 text-left">Username</th>
            <th className="border-b p-2 text-left">Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, idx) => (
            <tr key={user.UserID ?? idx}>
              <td className="border-b p-2">{user.UserID}</td>
              <td className="border-b p-2">{user.Username}</td>
              <td className="border-b p-2">{user.Email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
