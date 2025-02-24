import { BrowserRouter, Route } from "react-router-dom";
import { Routes } from "react-router";
import Landing from "./app/Landing";

const App: React.FC = () => {
  const routes = [
    {
      path: "/",
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
