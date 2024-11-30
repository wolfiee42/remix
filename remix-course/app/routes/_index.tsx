import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import styles from "../styles/home.css";
export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <main id="content">
      <h1>A better way to track your tasks</h1>
      <p>Get our app today and never miss a task again.</p>
      <p id="cta">
        <Link to="/notes">Try for free</Link>
      </p>
    </main>
  );
}

export function link() {
  return [{ rel: "stylesheet", href: styles }];
}
