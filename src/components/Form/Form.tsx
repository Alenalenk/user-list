import { memo } from 'react'
import './Form.scss'

type Props = {
  label: string,
  name: string,
  value: string,
  placeholder: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

export const Form: React.FC<Props> = memo(({ label, name, value, placeholder, onChange }) => {
  
  return (
      <label className='form__label'>
        {label}
        <input 
          type="text" 
          name={name}
          className='form__input'
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </label>
  )
})