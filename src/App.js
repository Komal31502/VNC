import React, { Suspense,lazy} from "react";
import "./App.css";
import { BrowserRouter, Route, Routes,Navigate } from "react-router-dom";

import SpreadsheetContextProvider from "./context/SpreadsheetContext"
import BadResponse from "./components/BadResponse/BadResponse";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import LoginPage from "./pages/Auth/Login/Login";
import ScorecardContextProvider from "./context/ScorecardContext";
import { AuthContextProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

const Home = lazy(() => import('./pages/Home/Home'));
const MyScorecards = lazy(() => import('./pages/Scorecards/MyScorecards'));
const Spreadsheet = lazy(() => import('./pages/Scorecard/Spreadsheet/Spreadsheet'));

const App = () => {
  const returnHomeElement = () => {
    if (sessionStorage.getItem('vncuser')) {
        return <Navigate to='/home' />
    }
    else {
        return <Navigate to='/login' />
    }
}

  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={returnHomeElement()} />
          <Route path="/login" element={
            <LoginPage />
          }/>
       
          <Route path="/home" element={
            <ProtectedRoute>
            <Suspense fallback={<div>Loading...</div>}>
            <Home />
            </Suspense>
            </ProtectedRoute>
          } />
     
     
          <Route
            path="/scorecards"
            element={
              <ProtectedRoute>
                <ScorecardContextProvider>
                <Suspense fallback={<div>Loading...</div>}>
                  <MyScorecards />
                  </Suspense>
                </ScorecardContextProvider>
                </ProtectedRoute>
            }
          />
     

          <Route path="/spreadsheet" element={
            <ProtectedRoute>
              <ScorecardContextProvider>
                <SpreadsheetContextProvider>
                <Suspense fallback={<div>Loading...</div>}>
                  <Spreadsheet />
                  </Suspense>
                </SpreadsheetContextProvider>
              </ScorecardContextProvider>
              </ProtectedRoute>

          } />
        
       
          <Route path="/502" element={<ProtectedRoute><BadResponse /></ProtectedRoute>} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>

  );
};

export default App;
