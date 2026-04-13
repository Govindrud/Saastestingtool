import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Dashboard } from "./components/Dashboard";
import { AITesting } from "./components/AITesting";
import { AutomationTesting } from "./components/AutomationTesting";
import { APITesting } from "./components/APITesting";
import { LLMEvaluation } from "./components/LLMEvaluation";
import { Tools } from "./components/Tools";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: "ai-testing", Component: AITesting },
      { path: "automation", Component: AutomationTesting },
      { path: "api-testing", Component: APITesting },
      { path: "llm-evaluation", Component: LLMEvaluation },
      { path: "tools", Component: Tools },
    ],
  },
]);
