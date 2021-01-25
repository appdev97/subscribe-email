import React from "react";

import "./style.scss";

const History = ({ history, data }) => {
  const handleChangeURL = (id) => () => {
    history.push(`/messages/${id}`);
  };

  return (
    <div className="history-wrapper">
      {data.map((item) => (
        <div
          key={item.id}
          className="history-item"
          onClick={handleChangeURL(item.id)}
        >
          <h3>{item.title}</h3>
          <p>{item.message}</p>
          <p>{item.emails}</p>
        </div>
      ))}
    </div>
  );
};

export default History;
