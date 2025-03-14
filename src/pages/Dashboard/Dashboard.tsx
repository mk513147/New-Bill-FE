import { API } from "@/apiCall/api";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    let { data } = await API.post("auth/logout");
    if (data.statusCode === 200) {
      localStorage.clear();
      navigate("/login");
    }
  };
  return (
    <>
      <Button colorPalette={"red"} onClick={handleLogout}>
        Logout
      </Button>
      <h1>Dashboard page</h1>
      <h2>Dashboard page</h2>
    </>
  );
}

export default Dashboard;
