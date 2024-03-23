import { useState } from "react";
import { Box, Container, CssBaseline } from "@mui/material";

export function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box sx={{ bgcolor: "#cfe8fc", height: "100vh" }} />
      </Container>
    </>
  );
}

export default App;
