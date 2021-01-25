import React, { useState, useEffect } from "react";
import { getHistory } from "../../api";

import "./style.scss";

const DetailsPage = (props) => {
  const [history, setHistory] = useState({});
  useEffect(() => {
    async function loadHistory() {
      const res = await getHistory(props.match.params.id);
      setHistory(res.data.data[0]);
    }
    loadHistory();
  }, []);

  return (
    <div className="details-wrapper">
      <dl>
        <dt>topic: </dt>
        <dd>{history.title}</dd>
      </dl>
      <dl>
        <dt>message: </dt>
        <dd>{history.message}</dd>
      </dl>
      <dl>
        <dt>emails: </dt>
        <dd>{history.emails}</dd>
      </dl>
      <dl>
        <dt>date: </dt>
        <dd>{history.created_at}</dd>
      </dl>
    </div>
  );
};

export default DetailsPage;
