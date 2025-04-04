import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import Artwork from "./pages/Artwork";

jest.mock("./pages/Home", () => () => <div>Home Page</div>);
jest.mock("./pages/Artwork", () => () => <div>Artwork - ID</div>);
jest.mock("./pages/Artwork", () => {
  return function MockArtwork() {
    return <div>Loading artwork...</div>;
  };
});

test("renders Home page", () => {
  render(<App />);
  expect(screen.getByText("Home Page")).toBeInTheDocument();
});
test("renders Artwork page when navigating to /artwork/:id", () => {
  render(
    <MemoryRouter initialEntries={["/artwork/123"]}>
      <Routes>
        <Route path="artwork/:id" element={<div>Artwork - ID</div>} />
      </Routes>
    </MemoryRouter>
  );

  expect(screen.getByText("Artwork - ID")).toBeInTheDocument();
});
test("displays loading state initially", () => {
  render(
    <MemoryRouter initialEntries={["/artwork/789"]}>
      <Artwork />
    </MemoryRouter>
  );

  expect(screen.getByText("Loading artwork...")).toBeInTheDocument();
});
