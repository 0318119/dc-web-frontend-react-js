import React, { useEffect, useRef, useState } from 'react';
import InputMask from "react-input-mask";
import plus_icon from './images/plus.svg';
import user_icon from './images/User_light.svg'
import styled_fields from './css/check-fields.module.css'
import Arrow_icon from "./images/arrow.svg"



function CheckFields(props) {
    let [isOpen, setIsOpen] = useState(false);
    const refOne = useRef();

    useEffect(() => {
        document.addEventListener("mousedown", maybeHandler);
    }, [])

    const maybeHandler = (e) => {
        if (!refOne.current.contains(e.target)) {
            setIsOpen(false)
        }
    }

    return (
        <div className={`${styled_fields.mianFlex}`}>
            <div className={`${styled_fields.staticBox}`}>
                <InputMask className="form-control"
                    mask="99999-9999999-9" placeholder='Staff CNIC'
                    onChange={props.CNICHandler} value={props.stafCNIC}
                    name="stafCNIC"
                />

                <input type="text"
                    value={props.stafName} name="stafName" placeholder='Staff Full Name'
                    onChange={props.staffNameHandler}
                />

                <div className={`${styled_fields.select_menu}`} ref={refOne}>
                    <div className={`${styled_fields.inner_box}`} onClick={() => setIsOpen((isOpen) => !isOpen)}>
                        <div className={`${styled_fields.select_value}`}>
                            {props.targetImg && (
                                <img src={props.targetImg} />
                            )}
                            <span required>{props.targetDataValue ? props.targetDataValue : <h5 className={`${styled_fields.placeHolder_default}`}>Select Job Description</h5>}</span>
                        </div>

                        <img src={Arrow_icon} alt="" className={`${styled_fields.dropDownIcon}`} />
                    </div>

                    <div className={`${styled_fields.scrolable_box}`}>
                        {isOpen && (
                            <div>
                                <input type="search" placeholder='Search Job Description' onChange={props.searchHandler} />
                                <div className={`${styled_fields.scroll_Box}`}>
                                <div className={`${styled_fields.get_list}`}>
                                    {props.jobsData.map((items) => {
                                        if (items !== undefined) {
                                            return (
                                                        <span
                                                            key={items.job_description_id} onClick={props.selectVal_Handler}
                                                            data-img={items.job_description_image_url} data-value={`${items.job_description_name}`}
                                                            data-id={`${items.job_description_id}`}
                                                        >
                                                            {items.job_description_image_url ? <img src={items.job_description_image_url} alt="" /> : false}
                                                            <h6>{items.job_description_name ? items.job_description_name : false}
                                                                <p className={`${styled_fields.staftCount}`}>
                                                                    {items.job_description_id ? `(${items.job_description_staff_count} Staff member)` : false}
                                                                </p>
                                                            </h6>
                                                        </span>
                                                )
                                        } else if (items == undefined) {
                                            // return (
                                            //     <span>
                                            //         <p className={`${styled_fields.staftCount}`}>
                                            //             No data found
                                            //         </p>
                                            //     </span>
                                            // )
                                        }
                                    })}
                                </div>
                                </div>
                            </div>)}
                    </div>

                </div>
            </div>

            <div className={`${styled_fields.files_input}`}>
                <div className={`${styled_fields.file_box}`}>
                    <input type="file"
                        onChange={props.frontPicture_handler}
                    />
                    <img src={props.frontPicture ? props.frontPicture : plus_icon} alt="" />
                    <label htmlFor="">Upload CNIC Front</label>
                </div>

                <div className={`${styled_fields.file_box}`}>
                    <input type="file"
                        onChange={props.backPicture_handler}
                    />
                    <img src={props.backPicture ? props.backPicture : plus_icon} alt="" />
                    <label htmlFor="">Upload CNIC Back</label>
                </div>

                <div className={`${styled_fields.file_box} ${styled_fields.profile_box}`}>
                    <input type="file"
                        onChange={props.userPicture_handler}
                    />
                    <img src={props.profile ? props.profile : user_icon} alt="" />
                    <label htmlFor="">Profile Picture</label>
                </div>
            </div>
        </div>
    )
}

export default CheckFields
