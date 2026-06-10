import { createFileRoute } from "@tanstack/react-router";

function TestPage() {
  return (
    <div style={{ padding: 40 }}>
      <h1 style={{ color: "red" }}>
        SSR TEST SUCCESS
      </h1>
    </div>
  );
}

export const Route = createFileRoute("/")({
  component: TestPage,
});