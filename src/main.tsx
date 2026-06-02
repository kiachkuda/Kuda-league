import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";

import "./styles.css";

import Home from "./routes/index";
import About from "./routes/about";
import Matches from "./routes/matches";
import Register from "./routes/register";
import Seasons from "./routes/seasons";
import Standings from "./routes/standings";
import Teams from "./routes/teams";
import TeamDetail from "./routes/team-detail";
import NotFound from "./routes/not-found";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/about", element: <About /> },
  { path: "/matches", element: <Matches /> },
  { path: "/register", element: <Register /> },
  { path: "/seasons", element: <Seasons /> },
  { path: "/standings", element: <Standings /> },
  { path: "/teams", element: <Teams /> },
  { path: "/teams/:id", element: <TeamDetail /> },
  { path: "*", element: <NotFound /> },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster />
    </QueryClientProvider>
  </React.StrictMode>,
);
