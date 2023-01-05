import axios from 'axios';
import React from 'react'
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom"
import BaseURl from './BaseURl';
import Moment from 'react-moment';
import DashSidebar from './DashSidebar';
import styled_dashboard from '../assets/css/dashboard.module.css'
import styled_check from './css/add-check.module.css'
import styled_check_details from './css/checkDetails.module.css'
import Config from './Config'
import ID_CARD from './images/id_card.svg'
import PDF_ICONS from './images/pdf.svg'
import WORD_ICON from './images/docx.svg'
import EXCEL_ICON from './images/xls.svg'
import NOT_ICON from './images/blank-file.svg'



function SubjectDetails() {
    let params = useParams();
    const [checkDetailsOne, setCheckDetailsOne] = useState([])
    const [checkDetailsTwo, setCheckDetailsTwo] = useState([])
    const [checkDetailsThree, setCheckDetailsThree] = useState([])

    const [loading, setLoading] = useState(true);
    const [contectLoader, setContectLoader] = useState(false);
    const [error, setError] = useState();


    const F_name = JSON.parse(localStorage.getItem("F_Name"));
    const L_name = JSON.parse(localStorage.getItem("L_Name"));
    const f_name_first_letter = F_name?.charAt(0);
    const l_name_first_letter = L_name?.charAt(0);
    let IsLogin = "AUTH_TOKEN" in localStorage && "AUTH_TOKEN" !== null;

    async function getData() {
        <BaseURl />;
        const acess_token = JSON.parse(localStorage.getItem("AUTH_TOKEN"));
        await axios({
            method: "get",
            url: `/api/v01/subject-profile`,
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${acess_token}`,
            },
            params: {
                'application_type': 'double_check',
                'ch': params.params
            }
        })
        .then((response) => {
            setContectLoader(true)
            setCheckDetailsOne(response.data.success.data.case_checks)
            setCheckDetailsTwo(response.data.success.data)
            setCheckDetailsThree(response.data.success.data.case_checks)
        }).catch((response) => {
            setError("Something went wrong")
        }).finally(() => {
            setLoading(false);
        });
    }
    
    useEffect(() => {
        if (IsLogin){
            getData();
        }
    }, [])


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
             {contectLoader && (
                <>
                    {checkDetailsOne?.map((items) => {
                        return  <div key={items.check.chk_id} className={`${styled_dashboard.dashBoardTopBar}`}>
                                    <div className={`${styled_check.styled_check}`}>
                                        <div className={`${styled_check.iconBox}`}>
                                            <img src={items.check.chk_image_url} alt="" />
                                        </div>
                                        <h5>{items.check.chk_name} Check Details</h5>
                                    </div>
                                </div>
                    })}

                    <div className={`${styled_check_details.caseDetailsBox}`}>
                        <div  className={`${styled_check_details.detailsSection}`}>
                            <div  className={`${styled_check_details.innerTobBox}`}>
                                <div className={`${styled_check_details.scdUserProBox}`}>
                                    {
                                        checkDetailsTwo.subject_image ?
                                        <div className={`${styled_check_details.scdUserConditionPathBox}`}>
                                                <img src={checkDetailsTwo.subject_image} alt="" />
                                            <a href={`${checkDetailsTwo.subject_image}`} target="_blank"></a>
                                        </div> : 
                                        <div className={`${styled_check_details.scdUserConditionNameBox}`}>
                                            <span>
                                                {`${f_name_first_letter}${l_name_first_letter}`}
                                            </span>
                                        </div>
                                    }
                                </div>
                                <h5 className={`${styled_check_details.userNameBox}`}>
                                    <span>{checkDetailsTwo.subject_name} 
                                        <p className='lead p-0 mt-2 m-0'>{checkDetailsTwo.subject_cnic}</p>
                                    </span>
                                </h5>

                                
                            </div>

                            <div  className={`${styled_check_details.innerbottomBox}`}>

                                <div className={`${styled_check_details.clientBox}`}>
                                    <h5 className={`${styled_check_details.innerClientBoxOnce}`}>
                                        <span className='d-block'>CLIENT'S NAME:</span>
                                        {checkDetailsThree?.map((items) => {
                                            return <p className='p-0 m-0' id={`${styled_check_details.marginTop}`} key={items.case_check_added_by.id}>{items.case_check_added_by.first_name}</p>
                                        })} 
                                    </h5>
                                    <h5 className={`${styled_check_details.innerClientBoxOnce}`}>
                                        <span className='d-block'>CASE STATUS:</span>
                                        <p className='p-0 m-0' id={`${styled_check_details.marginTop}`}>{checkDetailsTwo.case_status.status_label}</p>
                                    </h5>
                                </div>

                                <div className={`${styled_check_details.clientBox}`}>
                                    <h5 className={`${styled_check_details.innerClientBoxOnce}`}>
                                        <span className='d-block'>EMPLOYEE ID:</span>
                                        <p className='p-0 m-0' id={`${styled_check_details.marginTop}`}>{checkDetailsTwo.subject_id}</p>
                                    </h5>
                                    <h5 className={`${styled_check_details.innerClientBoxOnce}`}>
                                        <span className='d-block'>BILLING STATUS:</span>
                                        <p className='p-0 m-0' id={`${styled_check_details.marginTop}`}>{checkDetailsTwo.case_billing_status.status_label}</p>
                                    </h5>
                                </div>

                                <div className={`${styled_check_details.clientBox}`}>
                                    <h5 className={`${styled_check_details.innerClientBoxOnce}`}>
                                        <span className='d-block'>DATE OF COMPLETION:</span>
                                        {checkDetailsThree?.map((items) => {
                                            return <p className='p-0 m-0' id={`${styled_check_details.marginTop}`} key={items.case_check_outcome_status.status_id
                                            }>{items.case_check_outcome_status.status_label}</p>
                                        })}
                                    </h5>
                                </div>

                                <div className={`${styled_check_details.pictureBox}`}>
                                    <h5 className='mt-4'>
                                        <div className={`${styled_check_details.cnicBox}`}>
                                            {
                                                checkDetailsTwo.subject_cnic_front_file_url ?
                                                <a href={`${checkDetailsTwo.subject_cnic_front_file_url}`}  target="_blank"><img src={checkDetailsTwo.subject_cnic_front_file_url} alt="" /></a> : <img src={ID_CARD} alt="" />
                                            }
                                            {
                                                checkDetailsTwo.subject_cnic_back_file_url ?
                                                <a href={`${checkDetailsTwo.subject_cnic_back_file_url}`}  target="_blank"><img src={checkDetailsTwo.subject_cnic_back_file_url} alt="" /></a> : <img src={ID_CARD} alt="" />
                                            }
                                        </div>
                                    </h5>
                                </div>

                            </div>
                        </div>

                        <div className={`${styled_check_details.goalPostSection}`}>
                            <div className={`${styled_check_details.goalPostTopSection}`}>
                                {checkDetailsOne?.map((items) => {
                                        return  <div key={items.check.chk_id} className={`${styled_check_details.checkTag}`}>
                                                <div className={`${styled_check_details.tabBox}`}>
                                                    <img src={items.check.chk_image_url} alt="" />
                                                    <h5>{items.check.chk_name}</h5>
                                                    <span></span>
                                                </div>
                                        </div>
                                })}
                            </div>
                            
                            <div className={`${styled_check_details.goalPostData}`}>
                                <div className={`${styled_check_details.headGoalPostBox}`}>
                                    <div className={`${styled_check_details.completedBox}` + " " + "d-flex"}>
                                        <span>Check Completed at:</span>
                                        <p>{checkDetailsTwo.case_completed_at ? checkDetailsTwo.case_completed_at :  "Not completed yet"}</p>
                                    </div>
                                </div>
                                
                                {/* ATTACHMENT SECTION */}
                                <div className={`${styled_check_details.goalPostfeilds}`+ " " + "mt-3"}>
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>S.No</th>
                                                <th>Title</th>
                                                <th>Details</th>
                                                <th>Updated At</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                            {checkDetailsOne?.map((items) => {
                                            return <tbody key={items.check.chk_id}>
                                                {items.caseChkDetailGroupByType.resource_data.input?.map((data,index) => {
                                                    return <tr key={index + 1}>
                                                                <td scope="row">{data.case_chk_detail_sort}</td>
                                                                <td>{data.case_chk_detail_label}</td>
                                                                <td>{data.case_chk_detail_value ? data.case_chk_detail_value : "Not Found"}</td>
                                                                <td><Moment fromNow ago date={data.updated_at.toString()}/></td>
                                                                <td>{data.verification_status ? data.verification_status.status_key : "N/A"}</td>
                                                            </tr>
                                                })}
                                            
                                                {items.caseChkDetailGroupByType.resource_data.picture?.map((data,index) => {
                                                    return <tr key={index + 1}>
                                                                <td scope="row">{data.case_chk_detail_sort}</td>
                                                                <td>{data.case_chk_detail_label}</td>
                                                                <td>{data.case_chk_detail_value ? data.case_chk_detail_value : "Not Found"}</td>
                                                                <td><Moment fromNow ago date={data.updated_at}/></td>
                                                                <td>{data.verification_status ? data.verification_status.status_key : "N/A"}</td>
                                                            </tr>
                                                })}
                                                {items.caseChkDetailGroupByType.resource_data.location?.map((data,index) => {
                                                    return <tr key={index + 1}>
                                                                <td scope="row">{data.case_chk_detail_sort}</td>
                                                                <td>{data.case_chk_detail_label}</td>
                                                                <td>{data.case_chk_detail_value ? data.case_chk_detail_value : "Not Found"}</td>
                                                                <td><Moment fromNow ago date={data.updated_at}/></td>
                                                                <td>{data.verification_status ? data.verification_status.status_key : "N/A"}</td>
                                                            </tr>
                                                })}
                                                {items.caseChkDetailGroupByType.resource_data.year?.map((data,index) => {
                                                    return <tr key={index + 1}>
                                                                <td scope="row">{data.case_chk_detail_sort}</td>
                                                                <td>{data.case_chk_detail_label}</td>
                                                                <td>{data.case_chk_detail_value ? data.case_chk_detail_value : "Not Found"}</td>
                                                                <td><Moment fromNow ago date={data.updated_at}/></td>
                                                                <td>{data.verification_status ? data.verification_status.status_key : "N/A"}</td>
                                                            </tr>
                                                })}
                                            </tbody>
                                            })}
                                    </table>
                                </div>
                                

                                <div className={`${styled_check_details.Attachment}`}>
                                    <h5 className={`${styled_check_details.headAttachment}`}>Attachment(s)
                                    {checkDetailsOne?.map((fileItems,index) => {
                                        return <span  key={index + 2}>
                                        {fileItems.case_check_attachments.length == 0 ? <p className={`${styled_check_details.filesMess}`}>No attachment(s) yet</p> : false}
                                        </span>
                                    })} </h5>
                                    {checkDetailsOne?.map((fileItems) => {
                                        return <div className={`${styled_check_details.innerAttachment}`} key={fileItems.check.chk_id}>
                                            {fileItems.case_check_attachments?.map((data) => {
                                                return <div className={`${styled_check_details.attachmentBox}`} key={data.case_check_attachment_id}>
                                                        {(() => {
                                                            if ( data.case_check_attachment_file_url.slice((Math.max(0, data.case_check_attachment_file_url.lastIndexOf(".")) || Infinity) + 1) === "jpg"){
                                                                return (
                                                                <>
                                                                    <a href={`${data.case_check_attachment_file_url}`} target="_blank"><img src={data.case_check_attachment_file_url} alt="" /></a>
                                                                    <h5 className={`${styled_check_details.fileLabel}`}>{data.case_check_attachment_file_caption.slice(1, 10)}...</h5>
                                                                </>
                                                                )
                                                            }else if(data.case_check_attachment_file_url.slice((Math.max(0, data.case_check_attachment_file_url.lastIndexOf(".")) || Infinity) + 1) === "jpeg"){
                                                                return (
                                                                    <>
                                                                        <a href={`${data.case_check_attachment_file_url}`} target="_blank"><img src={data.case_check_attachment_file_url} alt="" /></a>
                                                                        <h5 className={`${styled_check_details.fileLabel}`}>{data.case_check_attachment_file_caption.slice(1, 10)}...</h5>
                                                                    </>
                                                                )
                                                            }
                                                            else if(data.case_check_attachment_file_url.slice((Math.max(0, data.case_check_attachment_file_url.lastIndexOf(".")) || Infinity) + 1) === "png"){
                                                                return (
                                                                    <>
                                                                        <a href={`${data.case_check_attachment_file_url}`} target="_blank"><img src={data.case_check_attachment_file_url} alt="" /></a>
                                                                        <h5 className={`${styled_check_details.fileLabel}`}>{data.case_check_attachment_file_caption.slice(1, 10)}...</h5>
                                                                    </>
                                                                )
                                                            } else if(data.case_check_attachment_file_url.slice((Math.max(0, data.case_check_attachment_file_url.lastIndexOf(".")) || Infinity) + 1) === "pdf"){
                                                                return (
                                                                    <>
                                                                        <a href={`${data.case_check_attachment_file_url}`} target="_blank"><img src={PDF_ICONS} alt="" /></a>
                                                                        <h5 className={`${styled_check_details.fileLabel}`}>{data.case_check_attachment_file_caption.slice(1, 10)}...</h5>
                                                                    </>
                                                                )
                                                            } else if(data.case_check_attachment_file_url.slice((Math.max(0, data.case_check_attachment_file_url.lastIndexOf(".")) || Infinity) + 1) === "docx"){
                                                                return (
                                                                    <>
                                                                        <a href={`${data.case_check_attachment_file_url}`} target="_blank"><img src={WORD_ICON} alt="" /></a>
                                                                        <h5 className={`${styled_check_details.fileLabel}`}>{data.case_check_attachment_file_caption.slice(1, 10)}...</h5>
                                                                    </>
                                                                )
                                                            }  else if(data.case_check_attachment_file_url.slice((Math.max(0, data.case_check_attachment_file_url.lastIndexOf(".")) || Infinity) + 1) === "xlsx"){
                                                                return (
                                                                    <>
                                                                        <a href={`${data.case_check_attachment_file_url}`} target="_blank"><img src={EXCEL_ICON} alt="" /></a>
                                                                        <h5 className={`${styled_check_details.fileLabel}`}>{data.case_check_attachment_file_caption.slice(1, 10)}...</h5>
                                                                    </>
                                                                )
                                                            } return (
                                                                    <>
                                                                        <a href={`${ data.case_check_attachment_file_url}`} target="_blank"><img src={NOT_ICON} alt="" /></a>
                                                                        <h5 className={`${styled_check_details.fileLabel}`} target="_blank">{data.case_check_attachment_file_caption.slice(1, 10)}...</h5>
                                                                    </>
                                                            )
                                                        })()},
                                                </div>
                                            })}
                                        </div>
                                    })}
                                </div>


                                {/* GOAL POST SECTION */}
                                <div className={`${styled_check_details.goalPostfeilds}`+ " " + "mt-3 mb-2"}>
                                    <div className={`${styled_check_details.headGoalPostBox}`}>
                                        <h4 className='mt-4'>Provided Data:</h4>
                                    </div>
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>S.No</th>
                                                <th>Title</th>
                                                <th>Details</th>
                                            </tr>
                                        </thead>
                                            {checkDetailsOne?.map((items,index) => {
                                                if (items.caseChkDetailGroupByType.resource_data.text !== undefined){
                                                    return (
                                                        <tbody key={index + 1}>
                                                            {items.caseChkDetailGroupByType.resource_data.text?.map((data,index) => {
                                                                return <tr key={data.case_chk_detail_id}>
                                                                            <td>{index + 1}</td>
                                                                            <td>{data.case_chk_detail_label}</td>
                                                                            <td>{data.case_chk_detail_value}</td> 
                                                                        </tr>;
                                                                })}
                                                        </tbody>
                                                    )
                                                } else if (items.caseChkDetailGroupByType.resource_data.text == undefined){
                                                    return (
                                                        <tbody key={index + 2}>
                                                            <tr><td className='border-0'>No data found</td></tr>
                                                        </tbody>
                                                    )
                                                }
                                            })}
                                    </table>
                                </div>


                                <div className={`${styled_check_details.Attachment}`}>
                                    <h5 className={`${styled_check_details.headAttachment}`}>Provided source file(s)
                                    {checkDetailsOne?.map((fileItems,index) => {
                                        return <span key={index + 2}>
                                                     {fileItems.case_check_sources.length == 0 ? <p className={`${styled_check_details.filesMess}`}>No provided source file(s) yet</p> : false}
                                                </span>
                                    })} </h5>
                                    {checkDetailsOne?.map((fileItems) => {
                                        return <div className={`${styled_check_details.innerAttachment}`} key={fileItems.check.chk_id}>
                                            {fileItems.case_check_sources?.map((data) => {
                                            return <div className={`${styled_check_details.attachmentBox}`} key={data.case_check_source_id}>
                                                {(() => {
                                                    if ( data.case_check_source_file_url.slice((Math.max(0, data.case_check_source_file_url.lastIndexOf(".")) || Infinity) + 1) === "jpg"){
                                                        return (
                                                        <>
                                                            <a href={`${data.case_check_source_file_url}`} target="_blank"><img src={data.case_check_source_file_url} alt="" /></a>
                                                            <h5 className={`${styled_check_details.fileLabel}`} target="_blank">{data.case_check_source_file_caption.slice(1, 19)}...</h5>
                                                        </>
                                                        )
                                                    }else if(data.case_check_source_file_url.slice((Math.max(0, data.case_check_source_file_url.lastIndexOf(".")) || Infinity) + 1) === "jpeg"){
                                                        return (
                                                            <>
                                                            <a href={`${data.case_check_source_file_url}`} target="_blank"><img src={data.case_check_source_file_url} alt="" /></a>
                                                            <h5 className={`${styled_check_details.fileLabel}`} target="_blank">{data.case_check_source_file_caption.slice(1, 10)}...</h5>
                                                            </>
                                                        )
                                                    }
                                                    else if(data.case_check_source_file_url.slice((Math.max(0, data.case_check_source_file_url.lastIndexOf(".")) || Infinity) + 1) === "png"){
                                                        return (
                                                        <>
                                                            <a href={`${data.case_check_source_file_url}`} target="_blank"><img src={data.case_check_source_file_url} alt="" /></a>
                                                            <h5 className={`${styled_check_details.fileLabel}`} target="_blank">{data.case_check_source_file_caption.slice(1, 10)}...</h5>
                                                        </>
                                                        )
                                                    }
                                                    else if(data.case_check_source_file_url.slice((Math.max(0, data.case_check_source_file_url.lastIndexOf(".")) || Infinity) + 1) === "pdf"){
                                                        return (
                                                        <>
                                                            <a href={`${data.case_check_source_file_url}`} target="_blank"><img src={PDF_ICONS} alt="" /></a>
                                                            <h5 className={`${styled_check_details.fileLabel}`} target="_blank">{data.case_check_source_file_caption.slice(1, 10)}...</h5>
                                                        </>
                                                        )
                                                    } else if(data.case_check_source_file_url.slice((Math.max(0, data.case_check_source_file_url.lastIndexOf(".")) || Infinity) + 1) === "docx"){
                                                        return (
                                                        <>
                                                            <a href={`${ data.case_check_source_file_url}`} target="_blank"><img src={WORD_ICON} alt="" /></a>
                                                            <h5 className={`${styled_check_details.fileLabel}`} target="_blank">{data.case_check_source_file_caption.slice(1, 10)}...</h5>
                                                        </>
                                                        )
                                                    }else if(data.case_check_source_file_url.slice((Math.max(0, data.case_check_source_file_url.lastIndexOf(".")) || Infinity) + 1) === "xlsx"){
                                                        return (
                                                        <>
                                                            <a href={`${ data.case_check_source_file_url}`} target="_blank"><img src={EXCEL_ICON} alt="" /></a>
                                                            <h5 className={`${styled_check_details.fileLabel}`} target="_blank">{data.case_check_source_file_caption.slice(1, 10)}...</h5>
                                                        </>
                                                        )
                                                    }return (
                                                        <>
                                                            <a href={`${ data.case_check_source_file_url}`} target="_blank"><img src={NOT_ICON} alt="" /></a>
                                                            <h5 className={`${styled_check_details.fileLabel}`} target="_blank">{data.case_check_source_file_caption.slice(1, 10)}...</h5>
                                                        </>
                                                    )
                                                })()}
                                            </div>
                                        })}
                                        </div>
                                    })}
                                </div>

                                {/* REMARK SECTION */}
                                <div className={`${styled_check_details.remarkSection}`}>
                                    <h6 className={`${styled_check_details.headeRemark}`}>Remarks:
                                    {checkDetailsOne?.map((remarks,index) => {
                                        return <span key={index + 2}>
                                                {remarks.case_check_remarks.length == 0 ? <span className={`${styled_check_details.remarksMess}` + " " + "mb-0" }>No remarks yet</span> : false}
                                        </span>
                                    })} </h6>
                                    {checkDetailsOne?.map((remarks) => {
                                        return <div key={remarks.check.chk_id}>
                                            {remarks.case_check_remarks?.map((data,index) => {
                                                if(index == 0){
                                                    return <div  className={`${styled_check_details.remarkBox}`} key={data.case_check_remark_id} style={{backgroundColor: "#F9F9F9"}}>
                                                        <h5 className="" >
                                                             <span>{data.case_check_remarks_added_by.first_name}</span>
                                                             <Moment fromNow ago date={data.created_at}  className={`${styled_check_details.remarkUpdateTime}`}/>
                                                         </h5>
                                                        <p>{data.case_check_remark_description}</p>
                                                    </div>
                                                    } else if(index > 0){
                                                            return <div  className={`${styled_check_details.remarkBox}`} key={data.case_check_remark_id}>
                                                            <h5 className="" >
                                                                 <span>{data.case_check_remarks_added_by.first_name}</span>
                                                                 <Moment fromNow ago date={data.created_at}  className={`${styled_check_details.remarkUpdateTime}`}/>
                                                             </h5>
                                                            <p>{data.case_check_remark_description}</p>
                                                        </div>
                                                    }
                                            })}
                                        </div>
                                    })}
                                </div>

                                

                                {/* CASE TIMELINE SECTION */}
                                <div className={`${styled_check_details.caseTimeLineSec}`}>
                                <h5>Check Timeline: </h5>
                                {checkDetailsOne?.map((timeLine) => {
                                    return <div key={timeLine.check.chk_id}>
                                        {timeLine.case_check_history?.map((data) => {
                                            // {console.log(data)}
                                            switch (data.case_check_status_type) {
                                                case "remarks":
                                                    return <div key={data.case_check_history_id} className={`${styled_check_details.caseTimeLineBox}`}>
                                                                <div className={`${styled_check_details.caseTimeLineFirstBox}`}>
                                                                    <span>
                                                                        <Moment fromNow ago date={data.created_at} />
                                                                    </span>
                                                                </div>
                                                                <div className={`${styled_check_details.caseTimeLineScdBox}`}>
                                                                    <div className="">
                                                                        <b></b>
                                                                        <p></p>
                                                                    </div>
                                                                </div>
                                                                <div className={`${styled_check_details.caseTimeLineThirdBox}`}>
                                                                    <h4>{data.case_check_status_type}</h4>
                                                                        <span><b>Double Check</b> add the {data.case_check_status_type}</span>
                                                                </div>
                                                            </div>
                                            
                                                case "attachment":
                                                        return <div key={data.case_check_history_id} className={`${styled_check_details.caseTimeLineBox}`}>
                                                        <div className={`${styled_check_details.caseTimeLineFirstBox}`}>
                                                            <span>
                                                                <Moment fromNow ago date={data.created_at} />
                                                            </span>
                                                        </div>
                                                        <div className={`${styled_check_details.caseTimeLineScdBox}`}>
                                                            <div className="">
                                                                <b></b>
                                                                <p></p>
                                                            </div>
                                                        </div>
                                                        <div className={`${styled_check_details.caseTimeLineThirdBox}`}>
                                                            <h4>{data.case_check_status_type}</h4>
                                                                <span><b>Double Check</b> add the {data.case_check_status_type} as evidence</span>
                                                        </div>
                                                    </div>

                                                case "verification":
                                                    return <div key={data.case_check_history_id} className={`${styled_check_details.caseTimeLineBox}`}>
                                                                <div className={`${styled_check_details.caseTimeLineFirstBox}`}>
                                                                    <span>
                                                                        <Moment fromNow ago date={data.created_at} />
                                                                    </span>
                                                                </div>
                                                                <div className={`${styled_check_details.caseTimeLineScdBox}`}>
                                                                    <div className="">
                                                                        <b></b>
                                                                        <p></p>
                                                                    </div>
                                                                </div>
                                                                <div className={`${styled_check_details.caseTimeLineThirdBox}`}>
                                                                    <h4>Goal Post Verification</h4>
                                                                        <span><b>Double Check</b> the {data.new_status.status_label} the goal post value of {data.case_check_status_remarks}</span>
                                                                </div>
                                                            </div>

                                                case "source":
                                                    {
                                                        switch (data.case_check_status_action) {
                                                            case "add|source":
                                                                return <div key={data.case_check_history_id} className={`${styled_check_details.caseTimeLineBox}`}>
                                                                            <div className={`${styled_check_details.caseTimeLineFirstBox}`}>
                                                                                <span>
                                                                                    <Moment fromNow ago date={data.created_at} />
                                                                                </span>
                                                                            </div>
                                                                            <div className={`${styled_check_details.caseTimeLineScdBox}`}>
                                                                                <div className="">
                                                                                    <b></b>
                                                                                    <p></p>
                                                                                </div>
                                                                            </div>
                                                                            <div className={`${styled_check_details.caseTimeLineThirdBox}`}>
                                                                                <h4>{data.case_check_status_type}</h4>
                                                                                    <span>
                                                                                        <b>Double Check</b> add the {data.case_check_status_type}
                                                                                    </span>
                                                                            </div>
                                                                        </div>

                                                            case "delete|source":
                                                                return <div key={data.case_check_history_id} className={`${styled_check_details.caseTimeLineBox}`}>
                                                                            <div className={`${styled_check_details.caseTimeLineFirstBox}`}>
                                                                                <span>
                                                                                    <Moment fromNow ago date={data.created_at} />
                                                                                </span>
                                                                            </div>
                                                                            <div className={`${styled_check_details.caseTimeLineScdBox}`}>
                                                                                <div className="">
                                                                                    <b></b>
                                                                                    <p></p>
                                                                                </div>
                                                                            </div>
                                                                            <div className={`${styled_check_details.caseTimeLineThirdBox}`}>
                                                                                <h4>{data.case_check_status_type}</h4>
                                                                                    <span>
                                                                                        <b>Double Check</b> <li className={`${styled_check_details.delete}`}>delete</li>  the {data.case_check_status_type}
                                                                                    </span>
                                                                            </div>
                                                                        </div>
                                                        
                                                            default:
                                                                break;
                                                        }
                                                    }

                                                case "execution":
                                                    return <div key={data.case_check_history_id} className={`${styled_check_details.caseTimeLineBox}`}>
                                                                <div className={`${styled_check_details.caseTimeLineFirstBox}`}>
                                                                    <span>
                                                                        <Moment fromNow ago date={data.created_at} />
                                                                    </span>
                                                                </div>
                                                                <div className={`${styled_check_details.caseTimeLineScdBox}`}>
                                                                    <div className="">
                                                                        <b></b>
                                                                        <p></p>
                                                                    </div>
                                                                </div>
                                                                <div className={`${styled_check_details.caseTimeLineThirdBox}`}>
                                                                    <h4>{data.new_status.status_label}</h4>
                                                                        <span>
                                                                            <b>Double Check</b> {data.new_status.status_key} the check {data.status_changed_by.first_name}
                                                                        </span>
                                                                </div>
                                                            </div>
                                                        default:
                                                            break;
                                            }
                                        })}
                                        {checkDetailsOne?.map((firstTimeLine) => {
                                            return <div key={firstTimeLine.staff_id} className={`${styled_check_details.caseTimeLineBox}`}>
                                                    <div className={`${styled_check_details.caseTimeLineFirstBox}`}>
                                                        <span>
                                                            <Moment fromNow ago date={firstTimeLine.created_at} />
                                                        </span>
                                                    </div>
                                                    <div className={`${styled_check_details.caseTimeLineScdBox}`}>
                                                        <div className="">
                                                            <b></b>
                                                        </div>
                                                    </div>
                                                    <div className={`${styled_check_details.caseTimeLineThirdBox}`}>
                                                        <h4>Check Created</h4>
                                                        <span>{firstTimeLine.case_check_added_by.first_name} Created the check</span>
                                                    </div>
                                                </div>
                                        })}
                                    </div>
                                })}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
             )}
        </div>
    </div>
  )
}

export default SubjectDetails
