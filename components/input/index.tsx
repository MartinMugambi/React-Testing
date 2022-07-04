//styles
import styles from '../../styles/Input.module.css'

interface InputProps {
	type: string
	placeholder: string
	name: string
	value?: string
	onChange: (event: React.FormEvent<HTMLInputElement>) => void
}

const Input = (props: InputProps) => {
	return (
		<section className={styles.container}>
			<input
				type={props.type}
				placeholder={props.placeholder}
				name={props.name}
				value={props.value}
				onChange={props.onChange}
			/>
		</section>
	)
}

export default Input
