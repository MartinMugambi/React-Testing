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

	const [loading, setLoading] = useState<boolean>(false)
	return <StateContext.Provider value={{ formErrors, setFormErrors, loading, setLoading }}>{children}</StateContext.Provider>
}

export const useErrors = () => useContext(StateContext)

export default AppContext
