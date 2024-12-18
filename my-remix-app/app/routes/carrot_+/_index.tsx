import { json } from "@remix-run/node";
import { useFetcher } from "@remix-run/react";

export const loader = async () => {
  const items = [
    { id: 1, name: "Carrot" },
    { id: 2, name: "Banana" },
    { id: 3, name: "Cucumber" },
  ];
  return json(items);
};


export default function Index() {
  const fetcher = useFetcher();

  function handleClick() {
    fetcher.load("/carrot");
  }

  return (
    <div>
      <h1>Dynamic Data Fetching with Fetcher</h1>
      <button onClick={handleClick}>Fetch Items</button>

      {fetcher.data ? (
        <ul>
          {fetcher.data.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      ) : null}

      {/* Show loading state */}
      {fetcher.state === "loading" && <p>Loading...</p>}
    </div>
  );
}
