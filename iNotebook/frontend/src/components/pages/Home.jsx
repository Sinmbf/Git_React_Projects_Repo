/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = ({ displayAlert }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const authToken = localStorage.getItem("auth-token");
    // If the user is note logged in then redirect to login page
    if (!authToken) {
      displayAlert("Login or signup to access our page", "info");
      navigate("/login");
    } else {
      console.log("Logged in");
    }
  }, []);
  return (
    <>
      <h1>Home</h1>
    </>
  );
};

export default Home;
