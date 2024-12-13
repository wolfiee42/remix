import { json } from "@remix-run/node";
import { useFetcher } from "@remix-run/react";

// export const loader = async () => {
//   const items = [
//     { id: 1, name: "Item 1" },
//     { id: 2, name: "Item 2" },
//     { id: 3, name: "Item 3" },
//   ];
//   return json(items);
// };


export default function Index() {
  const fetcher = useFetcher();
function handleClick() {

  const data = fetcher.load("/banana");
  console.log(data);
  return data;
  
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
