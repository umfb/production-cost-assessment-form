import { Routes, Route } from "react-router-dom";
import Form from "./pages/Form";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Form />} />
    </Routes>
  );
}
