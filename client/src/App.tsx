import { BrowserRouter, Route } from "react-router-dom";
import { Routes } from "react-router";
import Landing from "./app/Landing";
import Home from "./app/Home";
import Nopage from "./app/Nopage";
import ErrorBoundary from "./ErrorBoundary";

const App: React.FC = () => {
  const routes = [
    {
      path : "/",
      element : <Home />
    },
    {
      path: "/Landing",
      element:<ErrorBoundary>  <Landing /> </ErrorBoundary> 
    },
    {
      path : "*",
      element : <Nopage />
    }
  ];

  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
