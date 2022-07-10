//icons
import { ClipboardListIcon } from '@heroicons/react/solid'
import { MoonIcon, SunIcon } from '@heroicons/react/solid'

//styles
import styles from '../../styles/Header.module.css'

//context
// Global context
import { useErrors } from '../../pages/context/appContext'

const Header = () => {
	const { changeTheme, theme } = useErrors()
	return (
		<header className={styles.header}>
			<section className={styles.todo}>
				<h1>TODO</h1>
				<ClipboardListIcon width={30} />
			</section>
			<section title='☀️ or 🌙'>
				<span onClick={() => changeTheme(theme.isLight)}>
					{theme.theme === 'dark' ? <SunIcon width={30} /> : <MoonIcon width={30} />}
				</span>
			</section>
		</header>
	)
}

export default Header
