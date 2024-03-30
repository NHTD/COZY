import React from 'react'
import {createSearchParams, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import clsx from 'clsx'

const PageItems = ({children}) => {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const location = useLocation()

  const handlePagination = () => {
    const queries = Object.fromEntries([...params])
    if(Number(children)){
      queries.page = children
    }
    navigate({
      pathname: location.pathname,
      search: createSearchParams(queries).toString()
    })
  }

  return (
    <button 
      className={clsx('w-10 h-10 flex justify-center', !Number(children) && 'items-end pb-2', Number(children) && 'items-center hover:bg-gray-500 hover:rounded-full')}
      onClick={handlePagination}
      tupe='button'
      disabled={!Number(children)}
    >
        {children}
    </button>
  )
}

export default PageItems

