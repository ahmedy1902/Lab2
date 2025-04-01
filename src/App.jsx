import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useLocation,
} from "react-router-dom";
import { Button, Box } from "@mui/material";
import "./App.css";
import Data from "./pages/data";
import CreateUser from "./pages/createuser";
import reactLogo from "./assets/react.svg";

function NavButtons() {
  const location = useLocation();
  return (
    location.pathname !== "/create" && (
      <Link to="/create" style={{ textDecoration: "none" }}>
        <Button variant="contained" color="secondary">
          Create User
        </Button>
      </Link>
    )
  );
}

function App() {
  return (
    <Router>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Link to="/">
          <img
            src={reactLogo}
            className="logo"
            alt="React logo"
            style={{ height: "100px" }}
          />
        </Link>
        <Box sx={{ width: "100%", mb: 4 }}>
          <NavButtons />
        </Box>
      </Box>

      <Routes>
        <Route path="/" element={<Data />} />
        <Route path="/create" element={<CreateUser />} />
      </Routes>
    </Router>
  );
}

export default App;
