import { Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import PaginationPage from "./pages/PokemonListPage";
import PokemonDetailPage from "./pages/PokemonDetailPage";

function Loader() {
  return (
    <div className="flex justify-center items-center h-screen text-xl">
      Loading...
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/pokemonlist"
          element={
            <Suspense fallback={<Loader />}>
              <PaginationPage />
            </Suspense>
          }
        />
        <Route
          path="/pokemon/:id"
          element={
            <Suspense fallback={<Loader />}>
              <PokemonDetailPage />
            </Suspense>
          }
        />
        <Route path="*" element={<Navigate to="/pokemonlist" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
