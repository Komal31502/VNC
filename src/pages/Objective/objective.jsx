import React, { useState } from "react";
import "./Objective.css";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import ObjectiveDetails from "./ObjectiveDetails";

function Objective() {
  const [key, setKey] = useState("home");

  return (
    <div>
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="home" title="Details">
          <ObjectiveDetails />
        </Tab>
        <Tab eventKey="action" title="Actions/KPIs">
          Actions/KPIs
        </Tab>
        <Tab eventKey="updates" title="Updates">
          Updates
        </Tab>
        <Tab eventKey="relationships" title="Relationships">
          Relationships
        </Tab>
      </Tabs>
    </div>
  );
}

export default Objective;
