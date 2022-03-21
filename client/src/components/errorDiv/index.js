import React from "react";

function ErrorDiv(props) {
  return props.error && props.error.message ? (
    <div data-testid="error-div" className="container-center error">
      {props.error.message}
    </div>
  ) : null;
}

export { ErrorDiv };
