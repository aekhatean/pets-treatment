import React from "react";
import Tag from "./Tag";

function TagList(props) {
  const { tags, clickable } = props;
  return (
    <>
      {tags.map((tag) => (
        <Tag key={tag.name} name={tag.name} clickable={clickable} />
      ))}
    </>
  );
}

export default TagList;
