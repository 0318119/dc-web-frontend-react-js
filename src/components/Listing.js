import React, { useEffect, useState } from 'react'
import Config from './Config'
import DataTable from 'react-data-table-component'
import ReactTooltip from 'react-tooltip';
import DashSidebar from './DashSidebar'
import styled_dashboard from '../assets/css/dashboard.module.css'
import styled_check from './css/add-check.module.css'
import arrowIcon from './images/right_arrow.svg'
import styled_listings from './css/listings.module.css'
import Moment from 'react-moment';
import { useParams } from "react-router-dom"
import { useLocation } from 'react-router'
import axios from 'axios'
import BaseURl from './BaseURl'
import ListingFilter from './ListingFilter'
import SearchModalErr from './modals/SearchModalErr';

function Listing() {
    const [checksCompletedListings, setChecksCompletedListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [contentLoader, setContentLoader] = useState(false);
    const [searchLoader, setSearchLoader] = useState(false);
    const [error, setError] = useState();
    const [targetVal, settargetVal] = useState("");
    const [selected, setSelected] = useState([]);
    const [idsIntoUrl, setIdsIntoUrl] = useState([]);
    const [Isrows, setRows] = useState([]);
    const [page, setPage] = useState(1)
    const countPerPage = 50;
    const [checkBox, setCheckBoxData] = useState([]);
    // const [lengthItems, setTotalLengthItems] = useState();
    const [showSearchErr, setShowSearchErr] = useState(false)
    let params = useParams();
    const location = useLocation()

    let data_api = "data_api";
    let search_api = "search_api";

    let IsLogin = "AUTH_TOKEN" in localStorage && "AUTH_TOKEN" !== null;

    const getListings = async () => {
        <BaseURl />;
        try {
            const acess_token = JSON.parse(localStorage.getItem("AUTH_TOKEN"));
            await axios({
                method: "get",
                url: `/api/v01/case-checks-dc-web?page=${page}&per_page=${countPerPage}`,
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${acess_token}`,
                },
                params: {
                    'application_type': 'double_check',
                    'check_status': params.checks
                }
            })
                .then((response) => {
                    setChecksCompletedListings(response.data.success.data.data)
                    setRows(response.data.success.data.total)
                    setError(false)
                    setContentLoader(true)
                }).catch((response) => {
                    setError("Something went wrong")
                }).finally(() => {
                    setLoading(false);
                });
        } catch (error) {}
    }

    const searchClick = async (e) => {
        try {
            if (targetVal || idsIntoUrl.length > 0) {
                <BaseURl />;
                const acess_token = JSON.parse(localStorage.getItem("AUTH_TOKEN"));
                await axios({
                    method: "get",
                    url: `/api/v01/case-checks-search-dc-web?multi_text=${targetVal}&chk_id=${idsIntoUrl}&page=${page}&per_page=${countPerPage}`,
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${acess_token}`,
                        'content-type': 'multipart/form-data'
                    },
                }).then((response) => {
                    setSearchLoader(true)
                    setTimeout(() => {
                        setRows(response.data.success.data.total)
                        setChecksCompletedListings(response.data.success.data.data)
                        setSearchLoader(false)
                    }, 2000);
                })
            }else{
                setShowSearchErr(true)
            }
        } catch (error) {
            setError("Something went wrong")
        }
    }

    const getCheckByType = async () => {
        <BaseURl />;
        try {
            const acess_token = JSON.parse(localStorage.getItem("AUTH_TOKEN"));
            await axios({
                method: "get",
                url: `/api/v01/checks`,
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${acess_token}`,
                },
                params: {
                    'application_type': 'double_check',
                }
            })
                .then((response) => {
                    setCheckBoxData(response.data.success.data.data)
                    // setsearch(response.data.success.data.data)
                    // setTotalLengthItems(response.data.success.data.data.length)
                }).catch((response) => {})
        } catch (error) {}
    }

    useEffect(() => {
        if (IsLogin){
            if(data_api == "data_api"){
                search_api = "stop_search_api";
                getListings(page);
            }else{
                search_api = "search_api";
            }
        }

      
    }, [location.key,page]);


    useEffect(() => {
        if (IsLogin){
            if(search_api == "search_api"){
                data_api = "stop_data_api"
                searchClick(page);
            }else{
                data_api = "data_api"
            }
        }
    }, [page]);

    useEffect(() => {
        if (IsLogin){
            getCheckByType();
        }
    },[])

    let lang = {
        rangeSeparatorText: "out of",
        rowsPerPageText: "Show Entries"
    };

    const columns = [
        {
            name: "R.No",
            cell: (row, index) => index + 1
        },
        {
            name: <span className={`${styled_listings.employeeIdColumnName}`} >Employee Id</span>,
            selector: (row) => <div className={`${styled_listings.employeeId}`}>
                {row.check_case.subject_id}
            </div>

        },
        {
            name: "Name",
            selector: (row) => row.check_case.subject_name,
        },
        {
            name: "Type",
            selector: (row) => <div className="">
                <p data-tip={row.check.chk_name} >{row.check.chk_name}</p>
                <ReactTooltip type="light" place="bottom" className={`${styled_listings.toolTipShadow}`}/>
            </div>
        },
        {
            name: "Outcome Status",
            selector: (row) => <div   className={`${styled_listings.outcomeStatus}`} style={{background: `${row.case_check_outcome_status.status_color + 40}`}}>
                <i style={{backgroundColor: row.case_check_outcome_status.status_color}}></i>
                <span>{row.case_check_outcome_status.status_label}</span>
            </div>
        },
        {
            name: "Received Updated",
            selector: (row) => <Moment fromNow ago date={row.updated_at} />
        },
        {
            name: "Detail",
            cell: (row) => <div onClick={nextPage} data-key={row.case_chk_id} className={`${styled_listings.goNextOnPage}`}>
                <img src={arrowIcon} alt=""/>
            </div>
        }
    ]
    
    const nextPage = (e) => {
        const caseId = e.currentTarget.getAttribute('data-key');
        window.open(`#/SujectDetails/${caseId}`); 
    }

    const handlePageChange = page => {
        setPage(page)
    }

    const searchHandler = (e) => {
        const currentValue = e.target.value
        settargetVal(currentValue)
    };

    const resetForm = async (e) => {
        <BaseURl />;
        try {
            const acess_token = JSON.parse(localStorage.getItem("AUTH_TOKEN"));
            await axios({
                method: "get",
                url: `/api/v01/case-checks-dc-web?page=${page}&per_page=${countPerPage}&delay=1`,
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${acess_token}`,
                },
                params: {
                    'application_type': 'double_check',
                    'check_status': params.checks
                }
            })
            .then((response) => {
                settargetVal("")
                setIdsIntoUrl("")
                setSelected([])
                setChecksCompletedListings(response.data.success.data.data)
                setRows(response.data.success.data.total)
                setError(false)
                setContentLoader(true)
                checkBox.forEach((selectedValueOfChk) => {
                    if(selectedValueOfChk.ischecked == true){
                        selectedValueOfChk.ischecked = false
                    }
                });
            }).catch((response) => {
                setError(response.message)
            }).finally(() => {
                setLoading(false);
            });
        } catch (error) {}
    }


   

    return (
        <div className='wrapperBox'>
             {(() => {
                 const User = JSON.parse(localStorage.getItem("User"));
                    if ("User" in localStorage && User == false){
                        return
                    }else{
                        return ( <Config /> )
                    }
                })()}
            <DashSidebar />
            <div className={`${styled_dashboard.dashboard_container}`}>
                <ul className="text-danger mb-0">
                    {error && (
                        <div className="setLoaderGlobal">
                            <p className='error_msg'>{`${error}`}</p>
                        </div>
                    )}
                </ul>
                {loading && (
                    <div className="setLoaderGlobal">
                        <div className="spinner-border text-primary d-block" role="status"></div>
                    </div>
                )}

                {searchLoader && (
                    <div className="setLoaderGlobalTextLoader">
                        <h5>
                            <span>Processing...</span>
                        </h5>
                    </div>
                )}

                {contentLoader && (
                    <>
                        <div className={`${styled_dashboard.dashBoardTopBar}`}>
                            <div className={`${styled_check.styled_check}`}>
                                <h5 className={`${styled_listings.completedHead}`}>COMPLETED CHECKS</h5>
                            </div>
                        </div>
                        <div className={`${styled_listings.listingBox}`}>

                            <div className={`${styled_listings.searchFilterBox}`}>
                                <ListingFilter 
                                {...{ 
                                    searchHandler, targetVal, settargetVal,searchClick, 
                                    resetForm,checkBox,setCheckBoxData,setIdsIntoUrl,idsIntoUrl,selected, setSelected
                                }} />
                            </div>
                            <DataTable 
                                columns={columns} 
                                data={checksCompletedListings}
                                highlightOnHover
                                pagination
                                paginationServer
                                paginationTotalRows={Isrows}
                                paginationPerPage={countPerPage}
                                paginationRowsPerPageOptions={[50, 100]}
                                paginationComponentOptions={{
                                    rangeSeparatorText: lang.rangeSeparatorText,
                                    rowsPerPageText: <div className="">{lang.rowsPerPageText}</div>,
                                    noRowsPerPage: true,
                                }}
                                // onChangePage={page => {setPage(page)}}
                                onChangePage={handlePageChange}
                            />
                        </div>
                        <div className="mt-3 d-flex justify-content-center align-items-center mb-3">
                            <p className='text-center lead p-0 m-0 h6'>
                                <b className={`${styled_listings.botLine}`}>Copyright © 2022 Double Check. All rights reserved | Powered by Tech Exc</b>
                            </p>
                        </div>
                    </>
                )}
                {showSearchErr && (
                    <>
                        <SearchModalErr 
                        {...{showSearchErr,setShowSearchErr}} 
                        />
                    </>
                )}
            </div>
        </div>
    )
}

export default Listing
