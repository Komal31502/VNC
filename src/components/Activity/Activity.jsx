import React, { useContext, useState } from 'react'
import { ScorecardContext } from '../../context/ScorecardContext';
import dayjs from "dayjs";

const Activity = () => {
  const { history } = useContext(ScorecardContext);
  const imagePerRow = 5;
  const [next, setNext] = useState(imagePerRow);
  const formattedDate = (date) => {
    const timestamp = date; // Example timestamp
    const formattedDate = dayjs(timestamp).format("YYYY-MM-DD");
    return formattedDate;
  };
  return (
    <div className="scoreaccount-card-desktop1">
      <div className="scoretext-and-supporting-text59">
        <div className="scoretext-and-supporting-text60">
          <div className="scoreheading8">Activity</div>
        </div>
      </div>
      {
        history?.slice(0, next).map((obj, id) => {
          return (
            <div className="scorehistory-item4" key={id}>
              <div className="scoretext-parent2">
                <div className="scoretext161"> {formattedDate(obj?.created_date)}</div>
                <div className="scoretext162">{obj?.description}</div>
              </div>
            </div>
          )
        })
      }
      {
        next < history?.length && (
          <div className="scorebutton64" onClick={() => setNext(next + imagePerRow)}>
            <div className="scoretexttitle">
              <div className="scoretext131">Load More</div>
            </div>
          </div>)
      }

    </div>
  )
}

export default Activity;
