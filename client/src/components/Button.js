import React, { memo } from 'react'

const Button = ({name, handleOnclick, style, type='button', fw, handleOnClose}) => {
  return (
    <button
        type={type}
        className={style ? style : `px-4 py-2 rounded-md text-white bg-main text-semibold my-2 ${fw ? 'w-full' : 'w-fit'}`}
        onClick={() => {handleOnclick && handleOnclick()}}
        onClose={() => handleOnClose()}
    >
        <span>{name}</span>
    </button>
  )
}

export default memo(Button) 