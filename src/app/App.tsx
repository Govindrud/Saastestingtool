import { RouterProvider } from "react-router";
import { router } from "./routes";
import { AuthProvider } from "./contexts/AuthContext";
import { NotificationProvider } from "./contexts/NotificationContext";
import { TestProvider } from "./contexts/TestContext";
import { Toaster } from "sonner";

export default function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <TestProvider>
          <RouterProvider router={router} />
          <Toaster position="top-right" richColors />
        </TestProvider>
      </NotificationProvider>
    </AuthProvider>
  );
}