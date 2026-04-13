import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Dashboard } from "./components/Dashboard";
import { AITesting } from "./components/AITesting";
import { AutomationTesting } from "./components/AutomationTesting";
import { APITesting } from "./components/APITesting";
import { LLMEvaluation } from "./components/LLMEvaluation";
import { Tools } from "./components/Tools";
import { CICD } from "./components/CICD";
import { MobileTesting } from "./components/MobileTesting";
import { Reports } from "./components/Reports";
import { Team } from "./components/Team";
import { Schedule } from "./components/Schedule";

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
      { path: "mobile", Component: MobileTesting },
      { path: "ci-cd", Component: CICD },
      { path: "reports", Component: Reports },
      { path: "team", Component: Team },
      { path: "schedule", Component: Schedule },
      { path: "tools", Component: Tools },
    ],
  },
]);
