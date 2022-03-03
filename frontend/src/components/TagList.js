import React from "react";
import Tag from "./Tag";

function TagList(props) {
  const { tags } = props;
  return (
    <>
      {tags.map((tag) => (
        <Tag key={tag.name} name={tag.name} />
      ))}
    </>
  );
}

export default TagList;
