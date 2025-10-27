import React from "react";
import { createRoot } from "react-dom/client";
import { CategoryProvider } from "./context/CategoryContext";
import Header from "./components/Atoms/Header";
import Footer from "./components/Atoms/Footer/Footer";
import Category from "./components/Templates/Category";

const App = () => {
  return (
    <React.Fragment>
      <Header />
      <Category />
      <Footer />
    </React.Fragment>
  )
}

const root = createRoot(document.getElementById("root")!);
root.render(
  <CategoryProvider>
    <App />
  </CategoryProvider>
);
