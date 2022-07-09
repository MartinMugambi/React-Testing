//styles
import styles from '../../styles/Button.module.css'

interface ButtonProps {
	title: string
	bgColor: string
	color: string
	onClick: () => void
	type: 'reset' | 'button' | 'submit'
	disabled?: boolean
}

const Button = (props: ButtonProps) => {
	const buttonColorStyle = {
		color: props.color,
		backgroundColor: props.disabled ? '#cccccc' : props.bgColor,
	}
	return (
		<>
			<button
				className={styles.button}
				style={buttonColorStyle}
				type={props?.type}
				disabled={props.disabled}
				onClick={props.onClick}>
				{props.title}
			</button>
		</>
	)
}

export default Button
