import { unstable_usePrompt } from "@remix-run/react";
import { useState } from "react";
import { Form } from "react-router-dom";

function ImportantForm() {
  const [value, setValue] = useState("");

  // Block navigating elsewhere when data has been entered into the input
  unstable_usePrompt({
    message: "Are you sure?",
    when: ({ currentLocation, nextLocation }) =>
      value !== "" &&
      currentLocation.pathname !== nextLocation.pathname,
  });

  return (
    <Form method="post">
      <label>
        Enter some important data:
        <input
          name="data"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </label>
      <button type="submit">Save</button>
    </Form>
  );
}

export default ImportantForm;


export async function action({ request }) {
  const formData = await request.formData();
  return formData.get("data");
}