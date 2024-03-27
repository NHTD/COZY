import React, { memo } from 'react'

const Button = ({name, handleOnclick, style, iconBefore, iconAfter, fw, handleOnClose}) => {
  return (
    <button
        type='button'
        className={style ? style : `px-4 py-2 rounded-md text-white bg-main text-semibold my-2 ${fw ? 'w-full' : 'w-fit'}`}
        onClick={() => {handleOnclick && handleOnclick()}}
        onClose={() => handleOnClose()}
    >
        {iconBefore}
        <span>{name}</span>
        {iconAfter}
    </button>
  )
}

export default memo(Button) 