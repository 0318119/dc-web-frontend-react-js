import React from 'react'
import styled_modal from './css/modal-check-details.module.css'

function ModalCheckDetails(props) {
  return props.shown ? (
    <div className={`${styled_modal.wholeBoxDetails}`}  id={props.set}
      onClick={() => {
        props.close();
      }}
      >
        {props.showLoader && (
           <div className={`${styled_modal.modalLoaderSet}`}>
            <div className={`${styled_modal.innerDiv}`}>
              <span className={`${styled_modal.first_loader}`}></span>
              <span className={`${styled_modal.second_loader}` + " " + "mt-3"}></span>
              <span className={`${styled_modal.third_loader}` + " " + "mt-3"}></span>
              <span className={`${styled_modal.fourth_loader}` + " " + "mt-3"}></span>

              <span className={`${styled_modal.first_loader}` + " " + "mt-5"}></span>
              <span className={`${styled_modal.second_loader}` + " " + "mt-3"}></span>
              <span className={`${styled_modal.third_loader}` + " " + "mt-3"}></span>
              <span className={`${styled_modal.fourth_loader}` + " " + "mt-3"}></span>
            </div>
          </div>
         )}

        {props.showContent && (
            <div className={`${styled_modal.innerBoxModal}`}>
                <div className={`${styled_modal.modalBody}`}  onClick={e => {e.stopPropagation();}}>
                  <div className={`${styled_modal.modalContent}`}>
                      <h5>Details of check</h5>
                      <div className={`${styled_modal.modalTxt}`}>

                          <h4>Requirements</h4>
                          <ul className={`${styled_modal.upperUl}`}>
                            <ul  className={`${styled_modal.innerUl}`}>
                              {props.modalDataGoalpostRequirement.map((dataItems) => {
                                return <li key={dataItems.goal_post_data_id}>{dataItems.goal_post_data_name}</li>
                              })}
                            </ul>
                              {/* <li>
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis, mollitia facilis! Maiores minus eveniet sunt atque. Assumenda dolore alias ullam in iusto ab, id optio, quam nam odit et! Aliquid?
                              </li> */}
                          </ul>


                          <h4 className='mt-3'>Provided Data</h4>
                          <ul className={`${styled_modal.upperUl}`}>
                            <ul  className={`${styled_modal.innerUl}`}>
                              {props.modalDataCheckGoalpostFields.map((dataItems) => {
                                return <li key={dataItems.goal_post_data_id}>{dataItems.goal_post_data_name}</li>
                              })}
                            </ul>
                          </ul>
                          {/* <p>
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nam nihil aliquam ut minus, sit eveniet.
                          </p> */}

                      </div>
                      <div className={`${styled_modal.btnBox}`}>
                        <button onClick={props.close}>Close</button>
                      </div>
                  </div>
                </div>
            </div>
        )}

    
       
      </div>
  ) : null;


  // return (
  //   <>
  //   {/* id={props.set} */}
  //     <div className={`${styled_modal.wholeBoxDetails}`} 
  //     onClick={() => {
  //       // close modal when outside of modal is clicked
  //       props.close();
  //     }}
  //     >
  //       <div className={`${styled_modal.innerBoxModal}`}>
  //         <div className={`${styled_modal.modalBody}`}>
  //           <div className={`${styled_modal.modalContent}`}>
  //                <h5>Details of check</h5>
  //                <div className={`${styled_modal.modalTxt}`}>

  //                   <h4>Requirements</h4>
  //                   <ul className={`${styled_modal.upperUl}`}>
  //                     <ul  className={`${styled_modal.innerUl}`}>
  //                       {props.modalDataGoalpostRequirement.map((dataItems) => {
  //                         return <li key={dataItems.goal_post_data_id}>{dataItems.goal_post_data_name}</li>
  //                       })}
  //                     </ul>
  //                       {/* <li>
  //                         Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis, mollitia facilis! Maiores minus eveniet sunt atque. Assumenda dolore alias ullam in iusto ab, id optio, quam nam odit et! Aliquid?
  //                       </li> */}
  //                   </ul>


  //                   <h4 className='mt-3'>Provided Data</h4>
  //                   <ul className={`${styled_modal.upperUl}`}>
  //                     <ul  className={`${styled_modal.innerUl}`}>
  //                       {props.modalDataCheckGoalpostFields.map((dataItems) => {
  //                         return <li key={dataItems.goal_post_data_id}>{dataItems.goal_post_data_name}</li>
  //                       })}
  //                     </ul>
  //                   </ul>
  //                   {/* <p>
  //                     Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nam nihil aliquam ut minus, sit eveniet.
  //                   </p> */}

  //                </div>
  //                <div className={`${styled_modal.btnBox}`}>
  //                 <button onClick={props.clickHandler}>Close</button>
  //                </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </>
  // )
}

export default ModalCheckDetails
