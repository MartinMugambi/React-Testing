import styles from '../../styles/Button.module.css'
interface ButtonProps{
    title: string
    bgColor: string
    color: string
}

const Button = (props: ButtonProps) =>{

    const buttonColorStyle = {
        color: props.color,
        backgroundColor: props.bgColor
    }
    return (
        <>
         <button className={styles.button} style={buttonColorStyle}>{props.title}</button>
        </>
    );
}

export default Button