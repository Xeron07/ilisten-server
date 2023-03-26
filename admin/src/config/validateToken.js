import jwtDecode from "jwt-decode";

const isTokenExpired = () => {
  let token = localStorage.getItem("authToken");
  if (!token) return true;
  let decodedToken = jwtDecode(token);
  let currentDate = new Date();

  // JWT exp is in seconds
  return decodedToken.exp * 1000 < currentDate.getTime();
};

export default isTokenExpired;
