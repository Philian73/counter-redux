import { KeyboardEvent, DetailedHTMLProps, FC, InputHTMLAttributes, ReactNode } from 'react'

import cls from './LabelInputNumber.module.scss'

type DefaultInputPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

type PropsType = Omit<DefaultInputPropsType, 'type'> & {
  children: ReactNode
  error: boolean
  spanClassName?: string
}
export const LabelInputNumber: FC<PropsType> = ({
  children,
  error,
  spanClassName,
  className,
  onKeyDown,
  ...rest
}) => {
  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    onKeyDown?.(e)

    const regex = /[.,]/

    if (regex.test(e.key)) {
      e.preventDefault()
    }
  }

  const styles = {
    span: cls.span + (spanClassName ? ' ' + spanClassName : ''),
    input: cls.input + (error ? ' ' + cls.error : '') + (className ? ' ' + className : ''),
  }

  return (
    <label>
      <span className={styles.span}>{children}</span>
      <input className={styles.input} type="number" onKeyDown={onKeyDownHandler} {...rest} />
    </label>
  )
}
