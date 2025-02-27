import { BrowserRouter, Route } from "react-router-dom";
import { Routes } from "react-router";
import Landing from "./app/Landing";
import Home from "./app/Home";


const App: React.FC = () => {
  const routes = [
    {
      path : "/",
      element : <Home />
    },
    {
      path: "/Landing",
      element: <Landing />,
    },
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
