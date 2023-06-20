import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react'

import cls from './Button.module.scss'

type PropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
export const Button: FC<PropsType> = ({ children, className, ...rest }) => {
  return (
    <button className={cls.btn + (className ? ' ' + className : '')} {...rest}>
      {children}
    </button>
  )
}
