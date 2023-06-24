import { TypedUseSelectorHook, useSelector } from 'react-redux'

import { AppRootStateType } from '../store'

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
