import { redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { deleteUser, findUser, User } from "user";

export const loader = async ({ params }: { params: { id: string } }) => {
  const user = findUser(params.id);

  if (!user) {
    return redirect("/");
  }
  return new Response(JSON.stringify(user), {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const Profile = () => {
  const user = useLoaderData<User>();

  const handleClientSideLogout = (action: string) => {
    if (action === "logout" || action === "delete") {
      localStorage.removeItem("LoggedUser");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-800">
          Welcome, {user.name}!
        </h1>
        <p className="text-gray-600 mt-2">Email: {user.email}</p>
        <div className="mt-6 flex space-x-4">
          <Form method="post" onSubmit={() => handleClientSideLogout("logout")}>
            <input type="hidden" name="action" value="logout" />
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
            >
              Logout
            </button>
          </Form>
          <Form method="post" onSubmit={() => handleClientSideLogout("delete")}>
            <input type="hidden" name="action" value="delete" />
            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
            >
              Delete Account
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export const action = async ({
  params,
  request,
}: {
  params: { id: string };
  request: Request;
}) => {
  const formData = await request.formData();

  const actionType = formData.get("action");

  if (actionType === "logout") {
    return redirect("/");
  }
  if (actionType === "delete") {
    deleteUser(params.id);
    return redirect("/");
  }
};

export default Profile;
