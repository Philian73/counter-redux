import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react'

import cls from './Button.module.scss'

type PropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
export const Button: FC<PropsType> = ({ children, className, ...rest }) => {
  const buttonStyles = cls.btn + className ? ' ' + className : ''

  return (
    <button className={buttonStyles} {...rest}>
      {children}
    </button>
  )
}
