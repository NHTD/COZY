import React, { } from 'react'

const InputFields = ({value, setValue, nameKey, type, invalidFields, setInvalidFields}) => {

  // const [focus, setFocus] = useState(false)

  return (
    <div className='w-full relative flex flex-col'>
      {value.trim() !== '' && <label className='text-[10px] animate-slide-top-sm absolute top-0 left-[10px] block bg-white px-1' htmlFor={nameKey}>{nameKey?.slice(0, 1).toUpperCase() + nameKey.slice(1)}</label>}
      <input
        type={type || 'text'}
        className='px-4 py-2 rounded-sm border w-full mt-2 placeholder:text-sm placeholder:italic'
        placeholder={nameKey?.slice(0, 1).toUpperCase() + nameKey.slice(1)}
        value={value}
        onChange={e => setValue(prev => ({...prev, [nameKey]: e.target.value}))}
        onFocus={() => setInvalidFields([])}
      />
      {invalidFields?.some(el => el.name===nameKey) && <small className='text-red-500 text-[10px] italic'>{invalidFields.find(el => el.name===nameKey)?.msg}</small>}
    </div>
  )
}

export default InputFields