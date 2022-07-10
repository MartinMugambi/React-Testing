import { createContext, useContext, useState } from 'react'

interface FormError {
	title: boolean
	description: boolean
	date: boolean
}

const StateContext = createContext<any>(null)

const AppContext = ({ children }: any) => {
	const [formErrors, setFormErrors] = useState<FormError>({
		title: false,
		description: false,
		date: false,
	})
	const [theme, setTheme] = useState({
		theme: 'light',
		isLight: true,
	})

	const changeTheme = (option: string | null) => {
		//option is boolean
		if (option) {
			document.body.classList.add('dark-background')
			setTheme({
				theme: 'dark',
				isLight: false,
			})
		} else {
			document.body.classList.remove('dark-background')
			setTheme({
				theme: 'light',
				isLight: true,
			})
		}
	}

	const [loading, setLoading] = useState<boolean>(false)
	return (
		<StateContext.Provider value={{ formErrors, setFormErrors, loading, setLoading, changeTheme, theme }}>
			{children}
		</StateContext.Provider>
	)
}

export const useErrors = () => useContext(StateContext)

export default AppContext
