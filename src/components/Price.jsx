import React,{useContext} from 'react'
import { stateData } from "../App";
const Price = () => {
  const {totalCount, setTotalCount}=useContext(stateData)


  return (
    <div>
        <h3 className='font-bold text-lg pb-4'>Select variations and quantity</h3>
        <p className='font-bold text-base'>Price before shipping</p>
        <div className='flex justify-between mt-5 pb-5 border-b border-[#e6e7eb]'>
            <div>
                <h4 className='text-[#666]'>2 - 99 pieces</h4>
                <p className={ `${totalCount > 0 && totalCount<= 99?'text-[#d1490a]':'text-black'} text-[28px] font-bold`}>$2.40</p>
            </div>
            <div>
            <h4 className='text-[#666]'>100 - 999 pieces</h4>
            <p className={ `${totalCount >= 100 && totalCount <= 999?'text-[#d1490a]':'text-black'} text-[28px] font-bold`}>$1.90</p>
            </div>
            <div>
            <h4 className='text-[#666]'>1000 - 9999 pieces</h4>
            <p className={ `${totalCount >= 1000 && totalCount <= 9999?'text-[#d1490a]':'text-black'} text-[28px] font-bold`}>$1.40</p>
            </div>
            <div>
            <h4 className='text-[#666]'>{`>= 10000 pieces`}</h4>
            <p className={ `${totalCount >= 10000 ?'text-[#d1490a]':'text-black'} text-[28px] font-bold`}>$0.90</p>
            </div>
            
        </div>
       
    </div>
  )
}

export default Price