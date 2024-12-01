import { Link } from "@remix-run/react";

export default function PostIndex() {
  const posts = [
    { slug: "my-first-post", title: "My First Post" },
    { slug: "hello-world", title: "Hello World" },
  ];

  return (
    <div>
      <h1>Blog Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link to={`/post/${post.slug}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
