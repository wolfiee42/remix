import { json, useLoaderData } from "@remix-run/react";
import React from "react";

export const loader = async () => {
    const items = [
        { id: 1, name: "Carrot" },
        { id: 2, name: "Banana" },
        { id: 3, name: "Cucumber" },
    ];
    return json(items);
};

export default function HR() {
    const items = useLoaderData<typeof loader>();
    return (
        <div>
            <h1 className="text-2xl font-bold p-4">HR</h1>
            <ul>
                {items.map((item, index, array) => (
                    <React.Fragment key={item.id}>
                        <li key={item.id}>{item.name}</li>
                        {index < array.length - 1 && <hr />}
                    </React.Fragment>
                ))}
            </ul>
        </div>
    );
}