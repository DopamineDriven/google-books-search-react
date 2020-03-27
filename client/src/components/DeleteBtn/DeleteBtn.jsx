import React from "react";
import './DeleteBtn.css';
// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
function DeleteBtn(props) {
  return (
    <span className="delete-btn color-red" {...props} role="button" tabIndex="0">
      ✗
    </span>
  );
}

export default DeleteBtn;
