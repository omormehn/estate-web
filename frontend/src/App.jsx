import Website from "./pages/Website";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import Layout from "./components/layout/Layout";
import Properties from "./pages/Properties";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Property from "./pages/Property";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProtectedRoute from "./context/ProtectedRoute.jsx";
import ProfilePage from "./components/Profile/ProfilePage.jsx";
import BookMarks from "./pages/BookMarks.jsx";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Website />} />
              <Route path="/properties">
                <Route index element={<Properties />} />
                <Route
                  path=":propertyId"
                  element={
                    <ProtectedRoute>
                      <Property />
                    </ProtectedRoute>
                  }
                />
              </Route>
              <Route path="/signup" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/bookmarks"
                element={
                  <ProtectedRoute>
                    <BookMarks />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
      <ToastContainer />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
