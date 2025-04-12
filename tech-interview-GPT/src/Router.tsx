import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
} from "react-router-dom";
import { FormProvider } from "@store/formContext";
import { InterviewSessionProvider } from "@store/interviewSessionContext";
import RootLayout from "./components/common/Layout/Root";
import Main from "./components/Main";
import Session from "@components/Session";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/tech-interview" element={<RootLayout />}>
      <Route index element={<Main />} />
      <Route path=":id" element={<Session />} />
      <Route path="*" element={<Navigate to="/tech-interview" replace />} />
    </Route>
  ),
  { basename: "/tech-interview" } // 👈 Fix: Ensures correct routing
);

const Router = () => {
  return (
    <FormProvider>
      <InterviewSessionProvider>
        <RouterProvider router={router} />
      </InterviewSessionProvider>
    </FormProvider>
  );
};

export default Router;
