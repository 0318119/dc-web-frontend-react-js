import React, {useEffect, useState} from 'react'
import { MultiSelect } from "react-multi-select-component";
import styled_listings from './css/listings.module.css'
import searchIcon from './images/search.svg'


function ListingFilter(props) {
    

    let options = props.checkBox.map(function (items) {
        return  { 
                    label: items.chk_name,
                    value: items.chk_name,
                    id: items.chk_id
                };
      })


    const onChangeMultiSelect = (e) => {
        const ids = e.map(item => item.id);
        
        if(ids.length > 0){
            props.setIdsIntoUrl(encodeURIComponent(JSON.stringify(ids)))
        }else{
            props.setIdsIntoUrl("")
        }
    }

    return (
        <>
            <form className={`${styled_listings.searchForm}`} onSubmit={(e) => {e.preventDefault(); props.searchClick();}}>
                <div className={`${styled_listings.searchBox}`}>
                    <input type="search" placeholder='Emp Id, Emp Name' onChange={props.searchHandler} value={props.targetVal}/>
                    <img src={searchIcon} alt="" />
                </div>

                
                
                <div className={`${styled_listings.checkTypeSearch}`} >
                <MultiSelect
                    value={props.selected}
                    onChange={(e) => {
                        onChangeMultiSelect(e)
                        props.setSelected(e)
                    }}
                    
                    options={options}
                    labelledBy="Select"
                    // formatOptionLabel={options => (
                    //     <div className='d-flex'>
                    //         <div className="">
                    //             <input type="checkbox" id={options.value}/>
                    //             <label htmlFor={options.label}></label>
                    //         </div>
                    //     </div>
                    //   )}
                />
                </div>
                <div className={`${styled_listings.formBtnsGroup}`}>
                    <button type="reset" className="btn btn-outline-secondary" onClick={props.resetForm}>Reset</button>
                    <button  className="btn btn-primary">Search</button>
                </div>
            </form>
        </>
    )
}

export default ListingFilter
