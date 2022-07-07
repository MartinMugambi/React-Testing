//styles
import styles from '../../styles/Button.module.css'

interface ButtonProps {
	title: string
	bgColor: string
	color: string
	onClick?: () => void
	type: 'reset' | 'button' | 'submit'
}

const Button = (props: ButtonProps) => {
	const buttonColorStyle = {
		color: props.color,
		backgroundColor: props.bgColor,
	}
	return (
		<>
			<button className={styles.button} style={buttonColorStyle} type={props?.type} onClick={props.onClick}>
				{props.title}
			</button>
		</>
	)
}

export default Button
