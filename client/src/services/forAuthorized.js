import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

function ForAuthorized(props) {
  if (!!Cookies.get("accessToken")) {
    return props.children;
  } else {
    return <Navigate to={props.to} />;
  }
}

export default ForAuthorized;
