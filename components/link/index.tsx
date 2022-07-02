//styles
import styles from '../../styles/CustomLink.module.css'

//nextjs
import Link from 'next/link'

interface CustomLinkProps {
	title: string
	href: string
	bgColor: string
	color: string
}

const CustomLink = (props: CustomLinkProps) => {
	const LinkColorStyle = {
		color: props.color,
		backgroundColor: props.bgColor,
	}
	return (
		<Link href={props.href}>
			<a className={styles.customLink} style={LinkColorStyle}>
				{props.title}
			</a>
		</Link>
	)
}

export default CustomLink
