import React from 'react'
import usePagination from '../hooks/usePagination'
import PageItems from './PageItems'
import { useSearchParams} from 'react-router-dom'

const Pagination = ({totalCount}) => {
  const [params] = useSearchParams()
  const pagination = usePagination(totalCount, +params.get('page') || 1)  

  const range = () => {
    const currentPage = +params.get('page')
    const pageSize = +process.env.REACT_APP_LIMIT || 2
    const start = Math.min(((currentPage - 1) * pageSize) + 1, totalCount)
    const end = Math.min(currentPage * pageSize, totalCount)

    return `${start} - ${end}`
  }

  return (
    <div className='flex items-center justify-between w-full px-[16px]'>
      {!+params.get('page') ? <span className='text-sm italic'>{`Show users 1 - ${Math.min(+process.env.REACT_APP_LIMIT, totalCount) || 2} of ${totalCount}`}</span> : ''}
      {+params.get('page') ? <span className='text-sm italic'>{`Show users ${range()} of ${totalCount} `}</span> : ''}
      <div className='flex text-center'>
        {pagination?.map(el => (
          <PageItems key={el}>
            {el}
          </PageItems>
        ))}
      </div>
    </div>
  )
}


export default Pagination