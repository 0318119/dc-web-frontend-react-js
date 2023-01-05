import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import BaseURl from "../components/BaseURl";
import axios from 'axios';
import styled_dashboard from '../assets/css/dashboard.module.css';
import styled_modal from '../components/modals/css/modal-check-details.module.css';
import Arrow_icon from "./images/arrow.svg"
import info_user_icon from "./images/info_user.svg"
import ModalCheckDetails from './modals/ModalCheckDetails';

function DpChecks(props) {
    const [loading, setLoading] = useState(true);
    const [contentLoader, setContentLoader] = useState(false);
    const [modalLoader, setModalLoader] = useState(true)
    const [modalShown, toggleModal] = useState(false);
    const [error, setError] = useState()
    const navigate = useNavigate()
    const [modalDataGoalpostRequirement, setModalDataRequirement] = useState([]);
    const [modalDataCheckGoalpostFields, setModalDataGoalpostFields] = useState([]);

    let isLogin = "AUTH_TOKEN" in localStorage && "AUTH_TOKEN" !== null;

    async function getResults() {
        <BaseURl />
        const acess_token = JSON.parse(localStorage.getItem("AUTH_TOKEN"));
        await axios({
            method: "get",
            url: '/api/v01/checks',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${acess_token}`
            },
            params: {
                'application_type': 'double_check'
            }
        })
            .then((response) => {
                props.setdata(response.data.success.data.data)
                setError(false)
            }).catch((response) => {
                setError("Something went wrong")
            }).finally(() => {
                setLoading(false);
            });
    }

    useEffect(() => {
        if (isLogin){
            getResults()
        }
    }, [])

    const modalHandler = async (e) => {
        setModalLoader(true);
        toggleModal(!modalShown);
        e.stopPropagation();
        const checksid = e.currentTarget.getAttribute('data-id');
        try {
            <BaseURl />;
            const acess_token = JSON.parse(localStorage.getItem("AUTH_TOKEN"));
            await axios({
                method: 'post',
                url: '/api/b2c/v01/dashboard/check-detail',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${acess_token}`
                },
                data: {
                    "check_id": checksid,
                },
            }).then((response) => {
                
                setTimeout(() => {
                    setModalDataRequirement(response.data.success.data.check_goalpost_requirement_fields)
                    setModalDataGoalpostFields(response.data.success.data.check_goalpost_fields)
                    setModalLoader(false);
                   
                }, 1000);
            }).catch(() => {}).finally(() => { setContentLoader(true)});
        }
        catch (response){}
    }

 
    const setModal = modalShown ? `${styled_modal.showModal}` : '';
    const createChecksHandler = async (e) => {
        e.preventDefault();
        const checksid = e.currentTarget.getAttribute('data-id');
        navigate(`/AddCheck/${checksid}`);
    }
        
    return (
        <>
        
             {loading && (
                <div className="setLoaderGlobal">
                    <div className="spinner-border text-primary d-block" role="status"></div>
                </div>
              )}

            <ul className="text-danger mb-0">
                  {error && (
                      <div className="setLoaderGlobal">
                          <p className='error_msg'>{`${error}`}</p>
                      </div>
                  )}
              </ul>
                {props.data.map((items) => {
                    return <div key={items.chk_id} className={`${styled_dashboard.columnBox}`} onClick={createChecksHandler} data-id={`${items.chk_id}`}>
                            <div className={`${styled_dashboard.innerColumnBox}`}>
                                <div className={`${styled_dashboard.infoBox}`}>
                                    <h5 className={`${styled_dashboard.priceTag}`}>
                                        <span>{items.chk_base_price_pkr}</span>
                                        <span>PKR</span>
                                    </h5>
                                    <h4 className={`${styled_dashboard.check_Heading}`}
                                        style={{ color: items.chk_color }}>{items.chk_name}</h4>
                                    <h6 className={`${styled_dashboard.detailsTag}`}
                                    >
                                        <span>Create Check</span>
                                        <img src={Arrow_icon} alt="" />
                                    </h6>
                                </div>
                                <div className={`${styled_dashboard.iconBox}`}>
                                    <img src={items.chk_image_url} alt="" className={`${styled_dashboard.checkIcon}`}/>
                                    <img src={info_user_icon} alt="" className={`${styled_dashboard.infoIcon}`}  data-id={`${items.chk_id}`} onClick={modalHandler}/>
                                </div>
                            </div>
                        </div>
                })}

            

            <ModalCheckDetails shown={modalShown} showLoader={modalLoader} showContent={contentLoader} close={() => {toggleModal(false)}} set={setModal}
             {...{modalDataGoalpostRequirement,modalDataCheckGoalpostFields}}/>
        </>
    )
}

export default DpChecks
