import React from 'react'
import { useId } from 'react'

function Select({
    options,
    label,
    className='', 
    ...props
}, ref) {

    const id = useId()
    return (
        <div className='w-full'>
            {label && <label className='' htmlFor={id}>{label}</label>}
            <select
            {...props}
            id={id}
            className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
            ref={ref}
            >
                {options?.map((option , index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}    
            </select>
        </div>    
    )
}

export default React.forwardRef(Select)
