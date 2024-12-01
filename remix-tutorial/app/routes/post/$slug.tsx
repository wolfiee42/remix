import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

// Mock data fetching function
async function getPostBySlug(slug: string) {
  const posts = [
    {
      slug: "my-first-post",
      title: "My First Post",
      content: "This is the content of the first post.",
    },
    {
      slug: "hello-world",
      title: "Hello World",
      content: "Welcome to my blog!",
    },
  ];
  return posts.find((post) => post.slug === slug) || null;
}

// Loader function to fetch post data
export const loader: LoaderFunction = async ({ params }) => {
  const { slug } = params;

  if (!slug) {
    throw new Response("Slug is required", { status: 400 });
  }

  const post = await getPostBySlug(slug);

  if (!post) {
    throw new Response("Post not found", { status: 404 });
  }

  return { post };
};

// Component to display the post
export default function PostSlug() {
  const { post } = useLoaderData<{
    post: { title: string; content: string };
  }>();

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
}

// Error boundary for this route
export function ErrorBoundary({ error }: { error: Error }) {
  if (error.message === "Post not found") {
    return (
      <div>
        <h1>404 - Post Not Found</h1>
        <p>The post you are looking for does not exist.</p>
      </div>
    );
  }

  return (
    <div>
      <h1>An Unexpected Error Occurred</h1>
      <p>{error.message}</p>
    </div>
  );
}

// Catch boundary for thrown responses
export function CatchBoundary() {
  const caught = useLoaderData();

  if (caught.status === 404) {
    return (
      <div>
        <h1>404 - Post Not Found</h1>
        <p>The post you are looking for does not exist.</p>
      </div>
    );
  }

  if (caught.status === 400) {
    return (
      <div>
        <h1>400 - Bad Request</h1>
        <p>A valid slug is required to access this post.</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Something went wrong</h1>
    </div>
  );
}
