import React, { useContext, useState } from 'react'
import './Foundation.css'
import { Skeleton } from '@mui/material'
import { ScorecardContext } from '../../context/ScorecardContext'

const Foundation = () => {
 const {loader,company,coreValues}=useContext(ScorecardContext);
 const imagePerRow = 2;
 const [next, setNext] = useState(imagePerRow);
  return (
    <div className='foundation-parent'>
      <div className='foundation-heading'>
        Foundation
      </div>
      <div className='foundation-body'>
        <div className='mission-parent'>
          <div className='mission-header'>Mission</div>
          {
            loader ?
              <Skeleton animation={"wave"} variant="rounded" width={"100%"} height={15} /> :
              <div className='mission-body'>{company[0]?.mission_text}</div>
          }
        </div>
        <div className='mission-parent'>
          <div className='mission-header'>Vision</div>
          {
            loader ?
              <Skeleton animation={"wave"} variant="rounded" width={"100%"} height={15} />
              : <div className='mission-body'>{company[0]?.vision_text}</div>
          }
        </div>
        <div className='mission-parent'>
          <div className='mission-header'>Values</div>
          {
            loader ?
                <>
                <Skeleton animation={"wave"} variant='rounded' width={"100%"} height={15} sx={{ margin: "5px 0px" }} />
                <Skeleton animation={"wave"} variant='rounded' width={"100%"} height={15} sx={{ margin: "5px 0px" }} />
                <Skeleton animation={"wave"} variant='rounded' width={"100%"} height={15} sx={{ margin: "5px 0px" }} />
                </>
              :
               <>
                {
                  coreValues?.slice(0, next)?.map((item, index) => (
                    <div className='mission-body' key={index}>
                      {item.name}
                    </div>
                  ))
                }
             
                </>
          }
      
        </div>
        {
          next < coreValues?.length && (
            <div className="scorebutton64" onClick={() => setNext(next + imagePerRow)}>
              <div className="scoretexttitle">
                <div className="scoretext131">Load More</div>
              </div>
            </div>)
        }
      </div>
    </div>
  )
}

export default React.memo(Foundation);