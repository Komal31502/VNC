import React, { useContext } from 'react'
import "./SpreadsheetSidebar.css";
import Foundation from "../../../Foundation/Foundation"
import { SpreadsheetContext } from '../../../../context/SpreadsheetContext';


const Sidebar = () => {
  const { themeData, indicators,tasks} = useContext(SpreadsheetContext);
  const iconType=(icon)=>{
   switch(icon)
   {
    case "KPI":{return "/images/scorecard/spreadsheets/table-icons/KPI.svg";}
    case "Action":{return "/images/scorecard/spreadsheets/table-icons/task.svg";}
    case "Success Factor":{return "/images/scorecard/spreadsheets/table-icons/success.svg";}
    case "Expected Outcome":{return "/images/scorecard/spreadsheets/table-icons/expected.svg";}
    case "Rationale":{return "/images/scorecard/spreadsheets/table-icons/task.svg";}
    case "Hypothesis":{return "/images/scorecard/spreadsheets/table-icons/hypothesis.svg";}
    case "Risk":{return "/images/scorecard/spreadsheets/table-icons/risk-factor.svg";}
    case "Cascaded":{return "/images/scorecard/spreadsheets/table-icons/rectangle.svg";}
    case "Linked":{return "/images/scorecard/spreadsheets/table-icons/link-icon.svg";}
    case "Dependency":{return "/images/scorecard/spreadsheets/table-icons/dependency.svg";}
    case "Reasoning":{return "/images/scorecard/spreadsheets/table-icons/reasoning.svg";}
    default:{break;}
   }
  }
  return (
      <>
        <Foundation />
      <div className='sidebar-body'>
        <div className='themes-header'>
          <div className='heading'>
            Themes
          </div>
        </div>
        <div className='themes-body'>
          {
            themeData.map((theme, index) => {        
              return (
                  <div className='theme-elements' key={index}>
                    <div className='theme-dots' style={{background:theme.color}}></div>
                    <div>{theme.title}</div>
                  </div>
              )
            })
          }
        </div>
        <div className='indicator-header'>
          <div className='heading'>
            Indicators
          </div>

        </div>
        <div className='indicator-body'>
          {indicators.map((data, index) => {
            return (
               <div className='indicator-elemnts' key={index}>
               <div className={data.name === "leading" ? "indicators-icon-leading" : "indicators-icon-lagging"}>
                        <img alt="" src={data.name === "leading" ? "/images/scorecard/spreadsheets/table-icons/leading.svg" : "/images/scorecard/spreadsheets/sidebar/arrow-down-right.svg"} />
                      </div>
                      <div>{data.name}</div>
               </div>
            )
          })}

        </div>
        <div className='indicator-header'>
          <div className='heading'>
            Action Type
          </div>
        </div>
        <div className='task-type'>
        {tasks.map((data, index) => {
          return (
             <div className='task-elements' key={index}>
                   <div className='icon-container'>
                   <img alt=" " src={iconType(data.name)} />
                    </div>
                    <div>{data.name}</div>
             </div>
          )
        })}
        </div>
      </div>
      </>
  )
}

export default Sidebar;
