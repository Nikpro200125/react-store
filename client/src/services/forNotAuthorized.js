import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

function ForNotAuthorized(props) {
  if (!Cookies.get("accessToken")) {
    return props.children;
  } else {
    return <Navigate to={props.to} />;
  }
}

export default ForNotAuthorized;
