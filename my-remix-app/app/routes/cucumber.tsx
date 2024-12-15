import { useFetcher } from "@remix-run/react";
import { useEffect } from "react";

export function Cucumber() {
    const fetcher = useFetcher();

    useEffect(() => {
        if (fetcher.state === "idle" && !fetcher.data) {
            fetcher.load("/carrot");
        }
    }, [fetcher]);

    return (
        <div>
            <h2>Cucumber Component</h2>
            {fetcher.state === "loading" && <p>Loading...</p>}
            {fetcher.data && (
                <ul>
                    {fetcher.data.map((item: { id: number; name: string }) => (
                        <li key={item.id}>{item.name}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Cucumber;