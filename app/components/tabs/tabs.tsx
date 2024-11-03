import React, { ReactElement, ReactNode, useState } from "react";
import "./tabs.scss";

const SlidingTabs = ({ tabs, content }: { tabs: string[]; content: any }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <div className="tabs-wrapper">
      <div className="tabs-container">
        <div className="tabs">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`tab ${activeTab === index ? "active" : ""}`}
              onClick={() => handleTabClick(index)}
            >
              {tab}
            </button>
          ))}
          <div
            className="tab-indicator"
            style={{
              width: `${100 / tabs.length}%`, // Adjust the width based on the number of tabs
              transform: `translateX(${activeTab * 100}%)`,
            }}
          />
        </div>
      </div>
      <div className="tab-content">{content[activeTab]}</div>
    </div>
  );
};

export default SlidingTabs;
