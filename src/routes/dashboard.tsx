import { Dashboard } from "@/pages";
import { Route } from "react-router-dom";

export const dashboard = () => (
  <>
    <Route path="/dashboard" element={<Dashboard />} />
  </>
);
