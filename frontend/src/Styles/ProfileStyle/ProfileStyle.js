import React from "react";
import PropTypes from "prop-types";
const ProfileStyle = (props) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "40% 60%",
        maxWidth: "700px",
        height: "700.5px",
        background:
          "linear-gradient(-45deg,rgba( 255, 255, 255, 0.1 ),rgba( 255, 255, 255, 0.4 ))",
        boxShadow: " 0 8px 50px 0 rgba( 500, 500, 500, 0.5 )",
        backdropFilter: "blur( 4px )",
        borderRadius: "10px",
        border: "1px solid rgba( 255, 255, 255, 0.18 )",
        margin: "auto",
        marginTop: "0px"
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        {props.children}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <div
          style={{
            color: "rgba(0,0,0,1)",
            borderBottom: "2px solid rgba(255,255,255,0.2)",
            padding: "0 40px"
          }}
        >
          Full Name :<h2>{props.fullName}</h2>
          Username :<h3>{props.userName}</h3>
          Email :<h3>{props.email}</h3>
        </div>
      </div>
    </div>
  );
};

ProfileStyle.propTypes = {
  fullName: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired
};

export default ProfileStyle;
