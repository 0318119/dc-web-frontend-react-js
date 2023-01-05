import React, {useState,useEffect} from 'react'
import DashSidebar from '../components/DashSidebar'
import {useNavigate} from "react-router-dom"
import styled_dashboard from '../assets/css/dashboard.module.css'
import DpChecks from '../components/DpChecks';
import Config from '../components/Config';

function Dashboard() {
  const [data, setdata] = useState([])
  return (
    <>
        <div className="wrapperBox">
        {/* <Config /> */}

            <DashSidebar />
              <div className={`${styled_dashboard.dashboard_container}`}>
                <div className={`${styled_dashboard.dashBoardTopBar}`}>
                    <h4>DASHBOARD</h4>
                </div>
    
                <div className={`${styled_dashboard.paddingClass}` + " " + "row"}>
                      <DpChecks 
                        {...{data,setdata}}
                      />
                </div>
              </div>
        </div>
    </>
  )
}

export default Dashboard
