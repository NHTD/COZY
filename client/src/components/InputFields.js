import React, { memo } from 'react'
import clsx from 'clsx'

const InputFields = ({value, setValue, nameKey, type, invalidFields, setInvalidFields, style, fullWidth, placeholder, isHideLabel}) => {

  // const [focus, setFocus] = useState(false)

  return (
    <div className={clsx('w-full relative flex flex-col', fullWidth && 'w-full')}>
      {!isHideLabel && value?.trim() !== '' && <label className='text-[10px] animate-slide-top-sm absolute top-0 left-[10px] block bg-white px-1' htmlFor={nameKey}>{nameKey?.slice(0, 1).toUpperCase() + nameKey.slice(1)}</label>}
      <input
        type={type || 'text'}
        className={clsx('px-4 py-2 rounded-sm border w-full mt-2 placeholder:text-sm placeholder:italic outline-none', style)}
        placeholder={placeholder || nameKey?.slice(0, 1).toUpperCase() + nameKey.slice(1)}
        value={value}
        onChange={e => setValue(prev => ({...prev, [nameKey]: e.target.value}))}
        onFocus={() => setInvalidFields && setInvalidFields([])}
      />
      {invalidFields?.some(el => el.name===nameKey) && <small className='text-red-500 text-[10px] italic'>{invalidFields.find(el => el.name===nameKey)?.msg}</small>}
    </div>
  )
}

export default memo(InputFields)