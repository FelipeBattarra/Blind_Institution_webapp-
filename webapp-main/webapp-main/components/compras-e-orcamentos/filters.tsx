import React from 'react'
import DateFilter from './date-filter'

export default function Filters() {
    return (
        <div className='flex flex-col lg:flex-row items-center gap-y-2 lg:gap-y-0 lg:gap-x-2'>
            <DateFilter />
        </div>
    )
}