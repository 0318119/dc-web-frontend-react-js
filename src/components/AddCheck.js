import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import BaseURl from "./BaseURl";
import axios from 'axios'
import 'antd/dist/antd.css';
import { DatePicker, Space } from 'antd';
import Config from './Config'
import DashSidebar from './DashSidebar'
import styled_dashboard from '../assets/css/dashboard.module.css'
import styled_fields from './css/check-fields.module.css'
import styled_check from './css/add-check.module.css'
import ReactPhoneInput from "react-phone-input-2";
import CheckDetails from './CheckDetails';
import Tick_icon from '../components/images/tick_9132.svg'
import Cross_icon from '../components/images/cross.svg'
import Err_icon from '../components/images/err.svg'
import Bubbles_icon from '../components/images/Red_bubbles.svg'
import AddCheck_StafSelect from './AddCheck_StafSelect';
import AddCheck_InputFields from './AddCheck_InputFields';
import AddCheck_UsersPictures from './AddCheck_UsersPictures';


function AddCheck() {
    const [loading, setLoading] = useState(true);
    const [checkData, setcheckData] = useState([]);
    const [topBarData, settopBarData] = useState();
    const [error, setError] = useState();
    const [Isactive, setActive] = useState(false);
    const [formArray, setFormArray] = useState([])
    const [stafCNIC, setstafCNIC] = useState();
    const [removeUnderScores, setRemoveUnderScores] = useState();
    const [stafName, setstafName] = useState("");
    const [jobsData, setjobsData] = useState([]);
    const [jobId, setJobId] = useState([]);
    const [frontPicture, setfrontPicture] = useState("");
    const [backPicture, setbackPicture] = useState("");
    const [profile, setprofile] = useState("");
    const [CNICfrontPicture, setCNICfrontPicture] = useState("");
    const [CNICbackPicture, setCNICbackPicture] = useState("");
    const [userProfile, setuserProfile] = useState("");
    const [checkTransferSucc, setCheckTransferSucc] = useState(false)
    const [checkTransferErr, setCheckTransferErr] = useState(false)
    const [errMessage, setErrMessage] = useState([])
    const [IsdataExist, setIsdataExist] = useState(false)
    const [dataErr, setDataErr] = useState()
    let params = useParams();

    const { RangePicker } = DatePicker;
    const { DatePickerProps } = DatePicker;
    let isLogin = "AUTH_TOKEN" in localStorage && "AUTH_TOKEN" !== null;

    const CNICHandler = (e) => {
        setstafCNIC(e.target.value)
        const getResult = stafCNIC?.replaceAll('-', '');
        setRemoveUnderScores(getResult)
    }
    const staffNameHandler = (e) => {
        setstafName(e.target.value)
    }
    const frontPicture_handler = (e) => {
        const picture = e.target.files[0];
        setfrontPicture(URL.createObjectURL(picture))
        setCNICfrontPicture(e.target.files[0])
    }
    const backPicture_handler = (e) => {
        const picture = e.target.files[0];
        setbackPicture(URL.createObjectURL(picture))
        setCNICbackPicture(e.target.files[0])
    }
    const userPicture_handler = (e) => {
        const picture = e.target.files[0];
        setprofile(URL.createObjectURL(picture))
        setuserProfile(e.target.files[0])
    }
    async function getResults() {
        <BaseURl />;
        const acess_token = JSON.parse(localStorage.getItem("AUTH_TOKEN"));
        await axios({
            method: "get",
            url: `/api/b2c/v01/bucket/form/generate/${params.checksid}`,
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${acess_token}`,
            },
        })
            .then((response) => {
                setcheckData(response.data.results.check.check_goalpost_requirement_fields)
                settopBarData(response.data.results.check)
                setError(false)
                setActive(true)

                const LetCheckData = response.data.results.check.check_goalpost_requirement_fields;
                LetCheckData.forEach((items) => {
                    if (items.goal_post_data_type == "input") {
                        items.value = "";
                        items.fields_id = "";
                        items.error = false;
                    } else if (items.goal_post_data_type == "contact") {
                        items.value = "";
                        items.fields_id = "";
                        items.error = false;
                    } else if (items.goal_post_data_type == "file") {
                        items.file = '';
                        items.fields_id = "";
                        items.error = false;
                    } else if (items.goal_post_data_type == "files") {
                        items.files = {};
                        items.fields_id = "";
                        items.error = false;
                    } else if (items.goal_post_data_type == "calender") {
                        items.value = 0;
                        items.fields_id = "";
                        items.error = false;
                    } else if (items.goal_post_data_type == "dateRange") {
                        items.value = 0;
                        items.fields_id = "";
                        items.error = false;
                    }
                })
                setFormArray(LetCheckData)

            }).catch((response) => {
                setError("Something went wrong")
            }).finally(() => {
                setLoading(false);
            });
    }
    async function getTypesJobs() {
        <BaseURl />;
        const acess_token = JSON.parse(localStorage.getItem("AUTH_TOKEN"));
        await axios({
            method: "get",
            url: `/api/b2c/v01/jdrecommendation/jobdescription-with-staff`,
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${acess_token}`,
            },
        })
            .then((response) => {
                setjobsData(response.data.results.data)
            }).catch((response) => {
            }).finally(() => {
                setLoading(false);
            });
    }
    useEffect(() => {
        if(isLogin){
            getResults();
            getTypesJobs();
        }
    }, [])

    const dynamic_check_handler = async (e) => {
        e.preventDefault();
        try {
            let tempArray_fields = [];
            let obj_fields = {};
            let obj_files_id;
            let obj_files = {};
            let final_obj;

            const checkFormFields = formArray.forEach((item) => {
                if (item.value) {
                    obj_fields[item.fields_id] = item.value;
                    tempArray_fields.push(obj_fields);
                }
                if (item.file) {
                    // obj_files_id = item.fields_id;
                    // obj_files = item.file
                    // final_obj = `${item.fields_id}` + " : " + obj_files
                    obj_files[item.fields_id] = item.file;
                }
            });

            let payload_text_fields = {
                check_id: params.checksid,
                staff_cnic: removeUnderScores,
                staff_full_name: stafName,
                staff_job_description_id: jobId,
                subject_cnic_front_image: CNICfrontPicture,
                subject_cnic_back_image: CNICbackPicture,
                subject_profile_image: userProfile,
                generate_option: "generate_case",
                check_form_fields: JSON.stringify(...tempArray_fields),
                check_form_files: obj_files
                // check_form_files[gpdId-1][0]
            };

            <BaseURl />;
            const acess_token = JSON.parse(localStorage.getItem("AUTH_TOKEN"));
            await axios({
                method: 'POST',
                url: '/api/b2c/v01/dc-web/submit-dc-check-form',
                headers: {
                    "Content-Type": "multipart/form-data",
                    'Authorization': `Bearer ${acess_token}`,
                },
                data: payload_text_fields
            }).then((response) => {
                if(response.data.error == false){
                    setCheckTransferSucc(true)
                }else if(stafCNIC == "" || stafName == "" || jobId == ""){
                    setCheckTransferErr(true)
                    setErrMessage(response.data.message)
                }else if(response.data.error == true){
                    setIsdataExist(true)
                    setDataErr(response.data.message)
                }
            })
        } catch (response) {  }
    }

    const CloseSuccess = () => {
        setCheckTransferSucc(false)
    }
    const handlerHiddenErrBox = () => {
        setCheckTransferErr(false)
        setIsdataExist(false)
    }
    return (
        <>
            <div className="wrapperBox">
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
                    {Isactive && (
                        <>
                            <div className={`${styled_dashboard.dashBoardTopBar}`}>
                                <div className={`${styled_check.styled_check}`}>
                                    <div className={`${styled_check.iconBox}`}>
                                        <img src={topBarData.chk_image_url} alt="" />
                                    </div>
                                    <h5>{topBarData.chk_name}</h5>
                                </div>
                            </div>

                            <div className={`${styled_check.mainBox}`}>
                                <div className={`${styled_check.innerBox}`}>
                                    
                                    <form action="" onSubmit={dynamic_check_handler}>
                                    <div className={`${styled_fields.mianFlex}`}>
                                         <div className={`${styled_fields.staticBox}`}>
                                            <AddCheck_InputFields {...{
                                                stafCNIC, setstafCNIC, CNICHandler,
                                                stafName, setstafName,  staffNameHandler,
                                            }}/>
                                            <AddCheck_StafSelect  {...{
                                                 jobsData, setjobsData,setJobId
                                            }}/>
                                         </div>
                                         <AddCheck_UsersPictures {...{
                                            frontPicture, setfrontPicture, backPicture,
                                            setbackPicture, profile, setprofile, frontPicture_handler, backPicture_handler,
                                            userPicture_handler
                                         }}/>
                                    </div>

                                        <div className='mt-5 mb-3'>
                                        {checkData.map((items, index) => {
                                            switch (items.goal_post_data_type) {

                                                case "contact":
                                                    return <div key={items.goal_post_data_id}>
                                                        <div className="form-group mt-3">
                                                            <label>{items.goal_post_data_name}</label>
                                                            <ReactPhoneInput
                                                                defaultCountry="pk"
                                                                specialLabel={false}
                                                                placeholder="92-_ _ _-_ _ _ _ _ _"
                                                                onChange={
                                                                    (value, target, name) => {
                                                                        let tempArry = [...formArray];
                                                                        tempArry[index].value = value;
                                                                        tempArry[index].fields_id = name.target.name;
                                                                        setFormArray(tempArry)
                                                                    }
                                                                }
                                                                inputProps={{
                                                                    name: `gpdId-${items.goal_post_data_id}`
                                                                }}
                                                                onlyCountries={["pk"]}
                                                                masks={{
                                                                    pk: "..-... ..-..-.",
                                                                }}
                                                            />
                                                        </div>
                                                    </div>;

                                                case "input":
                                                    return <div key={items.goal_post_data_id}>
                                                        <div className="form-group mt-3">
                                                            <label>{items.goal_post_data_name}</label>
                                                            <input type="text" className="form-control" required={items.is_required == 1 ? true : false}
                                                                onChange={(e) => {
                                                                    let tempArry = [...formArray];
                                                                    tempArry[index].value = e.target.value;
                                                                    tempArry[index].fields_id = e.target.name;
                                                                    setFormArray(tempArry)
                                                                }
                                                                }
                                                                name={`gpdId-${items.goal_post_data_id}`}
                                                            />
                                                        </div>
                                                    </div>;

                                                case "file":
                                                    return <div key={items.goal_post_data_id}>
                                                        <div className="form-group mt-3">
                                                            <label className="mb-2">{items.goal_post_data_name}</label>
                                                            <input type="file" className="form-control" required={items.is_required == 1 ? true : false}
                                                                // accept="image/x-png,image/jpeg,image/jpg,image/pdf"
                                                                onChange={(e) => {
                                                                    let tempArry = [...formArray];
                                                                    let checkfiles = [e.target.files[0]]
                                                                    tempArry[index].file = checkfiles;
                                                                    tempArry[index].fields_id = e.target.name;
                                                                    setFormArray(tempArry)
                                                                }
                                                                }
                                                                name={`gpdId-${items.goal_post_data_id}`}
                                                            />
                                                        </div>
                                                    </div>;

                                                case "files":
                                                    return <div key={items.goal_post_data_id}>
                                                        <div className="form-group mt-3">
                                                            <label className="mb-2">{items.goal_post_data_name}</label>
                                                            <input type="file" multiple={true} className="form-control" required={items.is_required == 1 ? true : false}
                                                                accept="image/x-png,image/jpeg,image/jpg,image/pdf,image/pdf/.doc,.docx,application/msword,application/.xls,.xlsx,application,excel,application"
                                                                onChange={(e) => {
                                                                    let tempArry = [...formArray];
                                                                    const picture = [e.target.files[0]][0];
                                                                    tempArry[index].files = picture
                                                                    tempArry[index].fields_id = e.target.name;
                                                                    setFormArray(tempArry)
                                                                    console.log(items)


                                                                    // Array.from(e.target.files).forEach(file => {
                                                                    //     const picture = file;
                                                                    //     const uploaded = uploadedFiles;
                                                                    //     uploaded.push(picture);
                                                                    //     setUploadedFiles(uploaded)
                                                                    //     const pickFile = uploaded.forEach(url => {
                                                                    //          let mulTipleFlies = URL.createObjectURL(url);
                                                                    //          tempArry[index].value = {'Pictures': mulTipleFlies}
                                                                    //          console.log(items.value)
                                                                    //     });
                                                                    //     tempArry[index].fields_id = e.target.name;
                                                                    // });
                                                                }
                                                                }
                                                                name={`"gpdId-${items.goal_post_data_id}"`}
                                                            />
                                                        </div>
                                                    </div>;

                                                case "calender":
                                                    return <div key={items.goal_post_data_id}>
                                                        <div className="form-group mt-3">
                                                            <label className="mb-2">{items.goal_post_data_name}</label>
                                                            <br />
                                                            <DatePicker  style={{ width: '100%', height: "40px", borderRadius: '6px' }}
                                                                name={`"gpdId-${items.goal_post_data_id}"`}
                                                                required
                                                                type
                                                                format="DD-MMM-YYYY" 
                                                                onChange={
                                                                    (value, dateString) => {
                                                                        let tempArry = [...formArray];
                                                                        tempArry[index].value = dateString
                                                                        tempArry[index].fields_id = `"gpdId-${items.goal_post_data_id}"`;
                                                                        setFormArray(tempArry)
                                                                        console.log(items)
                                                                    }
                                                                }
                                                            />
                                                        </div>
                                                    </div>;

                                                case "dateRange":
                                                    return <div key={items.goal_post_data_id}>
                                                        <div className="form-group mt-3">
                                                            <label className="mb-2">{items.goal_post_data_name}</label>
                                                            <Space direction="vertical" style={{ width: '100%' }}>
                                                                <RangePicker  style={{ width: '100%', height: "40px",borderRadius: '6px' }}
                                                                 format="DD-MMM-YYYY"
                                                                 onChange={
                                                                    (value, dateString) => {
                                                                        let tempArry = [...formArray];
                                                                        const one = dateString[0];
                                                                        const two = dateString[1];
                                                                        tempArry[index].value = one + " " + " " + "To :" + " " + two;
                                                                        tempArry[index].fields_id = `"gpdId-${items.goal_post_data_id}"`;
                                                                        setFormArray(tempArry)
                                                                    }
                                                                }
                                                              
                                                                />
                                                            </Space>
                                                        </div>
                                                    </div>;
                                                default:
                                                    break;
                                            }
                                        })}</div>
                                        <div className="d-flex justify-content-end">
                                            <button type="submit" className="btn btn-primary mb-5" id={`${styled_check.btnSubmit}`}>Add</button>
                                        </div>
                                    </form>

                                    {/* ========================== */}
                                    {checkTransferSucc && (
                                        <div className={`${styled_check.successBox}`}>
                                            <div className={`${styled_check.successIconBox}`}>
                                                <img src={Tick_icon} alt="" />
                                            </div>
                                            <div className={`${styled_check.successContentBox}`}>
                                                <span>Done !</span>
                                                <p>Check transfer successfully</p>
                                            </div>
                                            <div className={`${styled_check.successCrossIconBox}`}>
                                                <img src={Cross_icon} alt="" onClick={CloseSuccess}/>
                                            </div>
                                        </div>
                                    )}

                                    {/* ================================= */}
                                    {checkTransferErr && (
                                        <div className={`${styled_check.ErrBox}`} onClick={handlerHiddenErrBox}>
                                            <div className={`${styled_check.InnerErrBox}`}>

                                                <div className={`${styled_check.contentBody}`} onClick={e => {e.stopPropagation();}}>

                                                    <div className={`${styled_check.errIconBox}`}>
                                                        <img src={Err_icon} alt="" />
                                                    </div>
                                                    <div className={`${styled_check.contentBox}`}>
                                                        <div className={`${styled_check.userMess}`}>
                                                            <h5>Oh Snap !</h5>
                                                            {errMessage?.map((item,index)=>{
                                                                return (
                                                                    <p key={index + 1}>{item}</p>
                                                                )
                                                            })}
                                                        </div>
                                                        <div className={`${styled_check.okeyBtnBox}`} onClick={handlerHiddenErrBox}>
                                                            <span>ok</span>
                                                        </div>
                                                    </div>
                                                   <div className={`${styled_check.errIconBubblesBox}`}>
                                                        <img src={Bubbles_icon}  alt=""/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                     {/* ================================= */}
                                     {IsdataExist && (
                                        <div className={`${styled_check.ErrBox}`} onClick={handlerHiddenErrBox}>
                                            <div className={`${styled_check.InnerErrBox}`}>

                                                <div className={`${styled_check.contentBody}`} onClick={e => {e.stopPropagation();}}>

                                                    <div className={`${styled_check.errIconBox}`}>
                                                        <img src={Err_icon} alt="" />
                                                    </div>
                                                    <div className={`${styled_check.contentBox}`}>
                                                        <div className={`${styled_check.userMess}`}>
                                                            <h5>Oh Snap !</h5>
                                                            <p>{dataErr}</p>
                                                            
                                                        </div>
                                                        <div className={`${styled_check.okeyBtnBox}`} onClick={handlerHiddenErrBox}>
                                                            <span>ok</span>
                                                        </div>
                                                    </div>
                                                    <div className={`${styled_check.errIconBubblesBox}`}>
                                                        <img src={Bubbles_icon} alt=""/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    
                                    <CheckDetails />
                                    <div className="mt-3 d-flex justify-content-center align-items-center">
                                        <p className='text-center lead p-0 m-0 h6 mb-3 mt-4'>
                                            <b className={`${styled_check.botLine}`}>Copyright © 2022 Double Check. All rights reserved | Powered by Tech Exc</b>
                                        </p>
                                    </div>
                                </div>
                               
                            </div>
                            
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

export default AddCheck
