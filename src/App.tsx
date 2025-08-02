import { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import PaginationPage from './pages/PaginationPage';
import LoadMorePage from './pages/LoadMorePage';
import PokemonDetailPage from './pages/PokemonDetailPage';

function Loader() {
  return <div className="flex justify-center items-center h-screen text-xl">Loading...</div>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/pagination"
          element={
            <Suspense fallback={<Loader />}>
              <PaginationPage />
            </Suspense>
          }
        />
        <Route
          path="/load-more"
          element={
            <Suspense fallback={<Loader />}>
              <LoadMorePage />
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
        <Route path="*" element={<Navigate to="/pagination" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
