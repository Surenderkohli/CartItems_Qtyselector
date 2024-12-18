import React,{useContext} from 'react'
import { stateData } from "../App";
const Price = () => {
  const {totalCount, setTotalCount}=useContext(stateData)

  return (
    <div>
        <h3>Select variations and quantity</h3>
        <p>Price before shipping</p>
        <div className='flex justify-between'>
            <div>
                <h4>2 - 99 pieces</h4>
                <p className={ `${totalCount > 0 && totalCount<= 99?'text-[#d1490a]':'text-black'}`}>$2.40</p>
            </div>
            <div>
            <h4>100 - 999 pieces</h4>
            <p className={ `${totalCount >= 100 && totalCount <= 999?'text-[#d1490a]':'text-black'}`}>$1.90</p>
            </div>
            <div>
            <h4>1000 - 9999 pieces</h4>
            <p className={ `${totalCount >= 1000 && totalCount <= 9999?'text-[#d1490a]':'text-black'}`}>$1.40</p>
            </div>
        </div>
        <p>{totalCount}</p>
    </div>
  )
}

export default Price