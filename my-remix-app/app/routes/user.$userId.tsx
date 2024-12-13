import { json } from "@remix-run/node";
import { useFetcher } from "@remix-run/react";

export const loader = async ({ params }) => {
  const users = {
    1: { id: 1, name: "Alice", age: 25 },
    2: { id: 2, name: "Bob", age: 30 },
    3: { id: 3, name: "Charlie", age: 22 },
  };

  const userId = params.userId;
  if (!users[userId]) {
    throw new Response("User not found", { status: 404 });
  }

  return json(users[userId]);
};


export default function UserFetcherExample() {
  const fetcher = useFetcher();

  const fetchUser = (id) => {
    fetcher.load(`/user/${id}`); // Load data for the given user ID
  };

  return (
    <div>
      <h1>User Details</h1>
      <div>
        <button onClick={() => fetchUser(1)}>Load User 1</button>
        <button onClick={() => fetchUser(2)}>Load User 2</button>
        <button onClick={() => fetchUser(3)}>Load User 3</button>
      </div>

      {/* Show loading state */}
      {fetcher.state === "loading" && <p>Loading...</p>}

      {/* Show error if data not found */}
      {fetcher.data && fetcher.data.status === 404 && (
        <p style={{ color: "red" }}>User not found!</p>
      )}

      {/* Display user details from fetcher.data */}
      {fetcher.data && fetcher.data.id && (
        <div>
          <h2>User Info:</h2>
          <p>Name: {fetcher.data.name}</p>
          <p>Age: {fetcher.data.age}</p>
        </div>
      )}
    </div>
  );
}
