import React from 'react';
import styled_fields from './css/check-fields.module.css'
// import Select from 'react-select/creatable';
import Select from 'react-select';


function AddCheck_StafSelect(props) {
    let options = props.jobsData.map(function (items) {
        return  { 
                    value: items.job_description_staff_count + "", 
                    label: items.job_description_name,
                    image : items.job_description_image_url ,
                    id: items.job_description_id,
                };
                
      })
      const changeDataType = (e) => {
        props.setJobId(e?.id)
      }
     
    return (
        <>
            <Select
                options={options}
                placeholder='Select Job Description'
                onChange={changeDataType}
                isClearable
                noOptionsMessage={({inputValue}) => !inputValue ? inputValue : "No results found"} 
                formatOptionLabel={options => (
                    <div className={`${styled_fields.get_list}`} >
                     <span>
                        <img src={options.image ? options.image : false} />
                        <h6 className={`${styled_fields.staftCount}`}>
                        <span className={`${styled_fields.stafValueName}`}>{options.label ? options.label : false}</span>
                            <span>{options.value ?`(${options.value} member)` : false}</span>
                        </h6>
                     </span>
                    </div>
                  )}
            />
        </>
    )
}

export default AddCheck_StafSelect
