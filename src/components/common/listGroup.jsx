import React from "react";

const ListGroup = props => {
  const { items } = props;
  console.log(items);
  return (
    <ul className="list-group">
      {props.items.map(item => (
        <li key={item._id} className="list-group-item">
          {item.name}
        </li>
      ))}
    </ul>
  );
};

export default ListGroup;
