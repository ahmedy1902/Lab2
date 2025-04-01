import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Alert,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateUser() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    title: "",
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }
    try {
      const response = await axios.post(
        "https://fakestoreapi.com/users",
        formData
      );
      if (response.data) {
        setSuccess(true);
        setError("");
        setFormData({
          name: "",
          email: "",
          password: "",
          title: "",
        });
      }
    } catch (err) {
      setError("Failed to create user");
      setSuccess(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, mb: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Create New User
        </Typography>
        {success && (
          <Alert severity="success">User created successfully!</Alert>
        )}
        {error && <Alert severity="error">{error}</Alert>}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            margin="normal"
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            error={formData.email && !validateEmail(formData.email)}
            helperText={
              formData.email && !validateEmail(formData.email)
                ? "Invalid email format"
                : ""
            }
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
          <Box sx={{ mt: 3, mb: 2, display: "flex", gap: 2 }}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Create User
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              onClick={() => navigate("/")}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default CreateUser;
