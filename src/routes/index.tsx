import { createFileRoute } from "@tanstack/react-router";
import Landing from "../pages/Landing";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sheetly - Excel Automation" },
      { name: "description", content: "Turn spreadsheets into insights & reports in seconds." },
      { property: "og:title", content: "Sheetly" },
      { property: "og:description", content: "Turn spreadsheets into insights & reports in seconds." },
    ],
  }),
  component: Landing,
});
