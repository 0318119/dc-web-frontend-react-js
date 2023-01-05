import React from 'react'
import styled_details from './css/check-details.module.css'

function CheckDetails() {
    return (
        <div className={`${styled_details.right_Box}`}>
            <div>
            <h4>Check Requirements</h4>
            <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex quas dolorum, voluptatum accusantium natus, ea cumque assumenda in alias nobis porro quibusdam! Tenetur eos commodi voluptas at iste ut quasi impedit? Distinctio eius beatae, nesciunt reprehenderit esse quo repudiandae eos assumenda voluptas, tempore itaque culpa quasi maxime atque nisi, saepe sapiente ducimus accusantium corrupti ut consequatur est provident. Doloremque, assumenda?
            </p>
            <ul>
                <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</li>
                <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</li>
                <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</li>
            </ul>
            <p className='mt-3'>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Distinctio ratione illo assumenda aliquam magnam dolore ullam quam quia odit libero pariatur ipsum doloremque voluptatum, sunt culpa mollitia fugit! Ullam, eveniet!
            </p>
            </div>
        </div>
    )
}

export default CheckDetails
