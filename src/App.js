import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import ErrorBoundary from "./components/common/ErrorBoundary";
import Login from "./components/auth/Login";
import RequireAuth from "./components/auth/RequireAuth";
import Menu from "./components/menu/menu";
import NotFound from "./components/notFound/NotFound";
import Header from "./components/header/Header";
import Main from "./components/main/Main";
import Loading from "./components/common/Loading";
import ChangeData from "./components/changeData/ChangeData";


// LAZY LOADING
const Home = lazy(() => import("./components/home/home"));
const Tests = lazy(() => import("./components/tests/tests"));
const Schedule = lazy(() => import("./components/schedule/schedule"));
const Recovery = lazy(() => import("./components/recovery/Recovery"))
const ResetPass = lazy(() => import("./components/recovery/reset/Reset"))
const CheckResults = lazy(() =>
  import("./components/tests/checkResults/CheckResults")
);
const Chat = lazy(() => import("./components/chat/Chat"));
const UserProfile = lazy(() =>
  import("./components/profile/userProfile/UserProfile")
);

function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <div style={{ display: "flex", backgroundColor: "#eff0f1" }}>
          <Menu />
          <div style={{ width: "100%", height: "100%" }}>
            <Header />
            <Main>
              <Suspense fallback={<Loading />}>
                <Routes>
                  (// PUBLIC ROUTES)
                  <Route path="/" element={<Login />} />
                  <Route path="/recovery" element={<Recovery />} />
                  {/* <Route path="/terms" element={<Terms />} /> */}
                  <Route path="/reset-password/:userId/:recovery_token" exact element={<ResetPass />} />
                  (// PROTECTED ROUTES)
                  <Route element={<RequireAuth />}>
                    <Route path="/home" element={<Home />} />

                    <Route path="/schedule" element={<Schedule />} />

                    <Route path="/tests" element={<Tests />} />

                    <Route path="/profile/:id" element={<UserProfile />} />

                    <Route path="/test/result" element={<CheckResults />} />

                    <Route path="/admin" element={<ChangeData />} />

                    <Route path="/chat" element={<Chat />} />
                  </Route>
                  (// NOT FOUND ROUTE)
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </Main>
          </div>
        </div>
      </ErrorBoundary>
    </div>
  );
}

export default App;
