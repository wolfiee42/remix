import type { ActionFunction, MetaFunction } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { useEffect } from "react";
import { addUser, findUserByEmailPassword, User } from "user";
import { v4 as uuidV4 } from "uuid";

type ActionData = {
  error?: string;
  user?: User;
};

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const actionData = useActionData<ActionData>();

  useEffect(() => {
    const storedData = localStorage.getItem("LoggedUser");
    if (storedData) {
      const user = JSON.parse(storedData);
      location.pathname = `/profile/${user.id}`;
    }

    if (actionData?.user) {
      localStorage.setItem("LoggedUser", JSON.stringify(actionData.user));
      location.pathname = `/profile/${actionData.user.id}`;
    }
  }, [actionData]);

  return (
    <div className="flex flex-col items-center justify-center h-screen max-w-3xl mx-auto">
      <Form method="post">
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            className="border-2 border-gray-300 rounded-md w-full p-2"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            id="email"
            className="border-2 border-gray-300 rounded-md w-full p-2"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            className="border-2 border-gray-300 rounded-md w-full p-2"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
          Login
        </button>
      </Form>
    </div>
  );
}

export const action: ActionFunction = async ({
  request,
}: {
  request: Request;
}) => {
  const formData = await request.formData();
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return Response.json(
      { error: "Email and password required." },
      { status: 400 }
    );
  }

  const newUser = {
    id: uuidV4(),
    name,
    email,
    password,
  };

  const existingUser = findUserByEmailPassword(email, password);

  const user = existingUser || newUser;

  if (!existingUser) {
    addUser(user);
  }

  return Response.json({ user }, { status: 200 });
};
