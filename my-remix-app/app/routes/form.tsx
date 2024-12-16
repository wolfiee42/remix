import { useActionData, useNavigation } from "@remix-run/react";
import { action } from "./_index";
import { Form } from "react-router-dom";
import { useEffect, useState } from "react";

export default function NewProject() {
    const navigation = useNavigation();
    const actionData = useActionData<typeof action>();

    return (
        <Form method="post">
            <fieldset
                disabled={navigation.state === "submitting"}
            >
                <p>
                    <label>
                        Name:{" "}
                        <input
                            name="name"
                            type="text"
                            defaultValue={
                                actionData
                                    ? actionData.values.name
                                    : undefined
                            }
                            style={{
                                borderColor: actionData?.errors.name
                                    ? "red"
                                    : "",
                            }}
                        />
                    </label>
                </p>

                {actionData?.errors.name ? (
                    <ValidationMessage
                        isSubmitting={navigation.state === "submitting"}
                        error={actionData?.errors?.name}
                    />
                ) : null}

                <p>
                    <label>
                        Description:
                        <br />
                        <textarea
                            name="description"
                            defaultValue={actionData?.values.description}
                            style={{
                                borderColor: actionData?.errors.description
                                    ? "red"
                                    : "",
                            }}
                        />
                    </label>
                </p>

                <ValidationMessage
                    isSubmitting={navigation.state === "submitting"}
                    error={actionData?.errors.description}
                />

                <p>
                    <button type="submit">
                        {navigation.state === "submitting"
                            ? "Creating..."
                            : "Create"}
                    </button>
                </p>
            </fieldset>
        </Form>
    );
}

function ValidationMessage({ error, isSubmitting }) {
    const [show, setShow] = useState(!!error);
  
    useEffect(() => {
      const id = setTimeout(() => {
        const hasError = !!error;
        setShow(hasError && !isSubmitting);
      });
      return () => clearTimeout(id);
    }, [error, isSubmitting]);
  
    return (
      <div
        style={{
          opacity: show ? 1 : 0,
          height: show ? "1em" : 0,
          color: "red",
          transition: "all 300ms ease-in-out",
        }}
      >
        {error}
      </div>
    );
  }