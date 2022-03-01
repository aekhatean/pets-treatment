import React from "react";

function ProfilePicture(props) {
  const { src } = props;
  return (
    <img
      className="shadow"
      src={src}
      alt="profile_pircture"
      style={{
        width: 180,
        height: 180,
        borderRadius: 50,
      }}
    />
  );
}

export default ProfilePicture;
