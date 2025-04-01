import { useEffect, useState } from "react";
import UsersList from "./userslist";
import axios from "axios";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

function Data() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
        setError("Error fetching users");
      });
  }, []);

  if (error) return <div>{error}</div>;
  if (!users.length) return <div>No users found</div>;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {users.map((user) => (
          <Grid key={user.id} size={{ xs: 2, sm: 4, md: 4 }}>
            <UsersList user={user} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Data;
