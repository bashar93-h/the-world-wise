import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { CitiesProvider } from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/FakeAuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";

import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import SpinnerFullPage from "./components/SpinnerFullPage";

// import Homepage from "./pages/Homepage";
// import Pricing from "./pages/Pricing";
// import Product from "./pages/Product";
// import AppLayout from "./pages/AppLayout";
// import PageNotFound from "./pages/PageNotFound";
// import Login from "./pages/Login";

const Homepage = lazy(() => import("./pages/Homepage"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Product = lazy(() => import("./pages/Product"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const Login = lazy(() => import("./pages/Login"));

// dist/index.html                   0.49 kB │ gzip:   0.31 kB
// dist/assets/index-C0MHSRRJ.css   30.23 kB │ gzip:   5.03 kB
// dist/assets/index-BLVgIXtr.js   507.47 kB │ gzip: 149.30 kB

// dist/index.html                           0.49 kB │ gzip:   0.31 kB
// dist/assets/Logo-BYigXoGP.css             0.03 kB │ gzip:   0.05 kB
// dist/assets/Login-B5O0XBJ4.css            0.35 kB │ gzip:   0.22 kB
// dist/assets/Product-ftt4lYil.css          0.47 kB │ gzip:   0.27 kB
// dist/assets/Homepage-Citt4ZPj.css         0.49 kB │ gzip:   0.29 kB
// dist/assets/PageNav-CcPXYRy9.css          0.51 kB │ gzip:   0.28 kB
// dist/assets/AppLayout-WIE2L0Ge.css        1.91 kB │ gzip:   0.70 kB
// dist/assets/index-CiU3jgqp.css           26.58 kB │ gzip:   4.38 kB
// dist/assets/Product.module-Be8LLB42.js    0.06 kB │ gzip:   0.07 kB
// dist/assets/PageNotFound-MJcGMOpp.js      0.15 kB │ gzip:   0.15 kB
// dist/assets/Logo-Dr6HDIW4.js              0.21 kB │ gzip:   0.19 kB
// dist/assets/PageNav-jP4Amz9p.js           0.49 kB │ gzip:   0.28 kB
// dist/assets/Pricing-DhuC_3K4.js           0.65 kB │ gzip:   0.42 kB
// dist/assets/Homepage-CpcohKWs.js          0.67 kB │ gzip:   0.42 kB
// dist/assets/Product-BWrmKvkK.js           0.86 kB │ gzip:   0.49 kB
// dist/assets/Login-C7N0wCzn.js                    1.02 kB │ gzip:   0.54 kB
// dist/assets/AppLayout-DHtivrKL.js157.14 kB │ gzip:  46.36 kB
// dist/assets/index-CwNRPrqo.js           348.26 kB │ gzip: 102.75

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route index element={<Homepage />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="product" element={<Product />} />
              <Route path="login" element={<Login />} />
              <Route
                path="app"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate replace to="cities" />} />
                <Route path="cities" element={<CityList />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
