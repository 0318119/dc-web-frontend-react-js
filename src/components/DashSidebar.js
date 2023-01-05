
import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import siteLogo from './images/dc_logo.svg';

// ICONS ==================== //
import FaBars from "./images/FaBars.svg"
import GridCubes from './images/cubes.svg'
import Arrow_icon from "./images/arrow.svg"
import logout_icon from './images/logOut.svg'
import doubleCheck from './images/DoubleTick.svg'

// CSS ===================== //
import SideBar from './css/sidebar.module.css'

function DashSidebar() {
  const [isSidebar, setSidebar] = useState(false);
  const [inprogressIsActiveClss, setInprogressActiveClss] = useState(false);
  const [completedIsActiveClss, setCompletedActiveClss] = useState(false);
  const [isListing, setListing] = useState(false);
  const [isArrow, setArrow] = useState(false);
  let params = useParams();
  const navigate = useNavigate();


  const hideShow_SideBar = isSidebar ? `${SideBar.showSideBar}` : '';
  const widthAdjust = isSidebar ? `${SideBar.widthAuto}` : '';
  const hideLogoBox = isSidebar ? `${SideBar.hidelogo}` : '';
  const setList = isSidebar ? `${SideBar.listingHead}` : '';
  const setinnerListing = isSidebar ? `${SideBar.dropDownList}` : '';
  const checkIcons = isSidebar ? `${SideBar.applyCss}` : '';
  const hideTxt  = isSidebar ? `${SideBar.spanTxt}` : "";

  const activeListing = isListing ? `${SideBar.activeList}` : '';
  const activeArrow = isListing ? `${SideBar.rotateArrow}` : '';
  // const activeArrow = isArrow ? `${SideBar.rotateArrow}` : '';
    
  const activeListingsInprogress = inprogressIsActiveClss ? `${SideBar.applyActiveClassInprogress}` : "false";
  const activeListingsCompleted = completedIsActiveClss ? `${SideBar.applyActiveClassCompleted}` : "false";

  
  const sideBarHandler = () => {
    setSidebar(current => !current);
  }
  const listHandler = () => {
    setListing(current => !current);
  }

  const F_name = JSON.parse(localStorage.getItem("F_Name"));
  const L_name = JSON.parse(localStorage.getItem("L_Name"));

  const f_name_first_letter = F_name?.substring(0, 1);
  const l_name_first_letter = L_name?.substring(0, 1);

  const logOutHandler = () => {
    localStorage.clear();
    navigate("/")
  };
  
  
 

const hideAndShwoDropDown = async () => {
  if (params.checks) {
        setListing(true);
    }if(params.checks == "inprogress"){
        setInprogressActiveClss(true)
        setCompletedActiveClss(false)
    }if(params.checks == "completed"){
        setInprogressActiveClss(false)
        setCompletedActiveClss(true)
    }
    // if (!params.checks) {
    //   setListing(false);
    // }
}

useEffect(() => {
  hideAndShwoDropDown()
},[params.checks]);

  return (
    <>

      <div className={`${SideBar.afterMediumCss}`}>
          <img src={FaBars} alt="" onClick={sideBarHandler}/>
      </div>
      <div className={`${SideBar.sideBarCon}` + " " + widthAdjust}>
        <div className={`${SideBar.innerSide}` + " " + hideShow_SideBar}>
          <div className={`${SideBar.fixedPosition}` + " " + hideShow_SideBar}>
            <div className={`${SideBar.logoBox}`}>
              <a className={hideLogoBox}><img src={siteLogo} alt="" className="img-fluid" /></a>
              <img src={FaBars} alt="" onClick={sideBarHandler}/>
            </div>
            <h5 className={`${SideBar.dashHead}`}>
              <Link to="/Dashboard">
                <img src={GridCubes} alt="" />
                <span className={setList}>
                  Dashboard
                </span>
              </Link>
            </h5>
            <div className={`${SideBar.dropDownBox}`}>
              <ul>
                <li className={`${checkIcons}`}>
                  <div className={`${SideBar.iconBox}`} onClick={listHandler}>
                    <img src={doubleCheck} className={`${SideBar.checkIcons}`} alt="" />
                    <span className={`${hideTxt}`}>Checks</span>
                    <img src={Arrow_icon} className={`${SideBar.arrowIcon} ${setinnerListing}` + " " + activeArrow}/>
                  </div>
                  <ul className={`${SideBar.dropingLinks}` + " " + setinnerListing + " " + activeListing}>
                    <li>
                      <span> 
                        <Link to='/Listing/completed' 
                          className={activeListingsCompleted}>
                          Completed
                        </Link>
                      </span>
                    </li>
                    <li>
                        <span> 
                          <Link to='/Listing/inprogress' 
                              className={activeListingsInprogress}>
                              In progress
                          </Link>
                        </span>
                      </li>
                  </ul>
                </li>
              </ul>
            </div>
            {/* slice(1, 19)}... */}
            <div className={`${SideBar.sideBarFoot}`} >
              <div className={`${SideBar.innerArea}`}>
                <h5 className={setinnerListing}>{`${f_name_first_letter}${l_name_first_letter}`}</h5>
                <span className={setinnerListing}>{`${F_name} ${L_name}`}</span>
                <img src={logout_icon} alt=""  onClick={logOutHandler}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}


export default DashSidebar
