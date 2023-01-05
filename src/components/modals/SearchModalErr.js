import React from 'react'
import styled_modal from "./css/SearchModalErr.module.css"
import warning_Icon from './images/warningIcon.svg'
import warning_bubbles_icon from './images/warningbubbles.svg'

function SearchModalErr(props) {
    const handlerHiddenErrBox = () => {
        props.setShowSearchErr(false)
    }
    
  return (
    <div className={`${styled_modal.ErrBox}`} onClick={handlerHiddenErrBox}>
        <div className={`${styled_modal.InnerErrBox}`}>

            <div className={`${styled_modal.contentBody}`} onClick={e => {e.stopPropagation();}}>

                <div className={`${styled_modal.warningIconBox}`}>
                    <img src={warning_Icon} alt="" />
                </div>
                <div className={`${styled_modal.contentBox}`}>
                    <div className={`${styled_modal.userMess}`}>
                        <h5>Warning</h5>
                        <p>Nothing to search!</p>
                    </div>
                    <div className={`${styled_modal.okeyBtnBox}`} onClick={handlerHiddenErrBox}>
                        <span>ok</span>
                    </div>
                </div>
                <div className={`${styled_modal.warningIconBubblesBox}`}>
                    <img src={warning_bubbles_icon} alt="" />
                </div>

            </div>

        </div>
    </div>
  )
}

export default SearchModalErr
