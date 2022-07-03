//types
import { TodoType } from '../../../pages'

//nextjs
import Link from 'next/link'


//styles

import styles from '../../../styles/Alltodo.module.css'

//icons

import {PencilAltIcon} from "@heroicons/react/solid"
import {TrashIcon} from "@heroicons/react/solid"
interface AllTodosProps {
	todo: TodoType
}

const AllTodos = (props: AllTodosProps) => {
	const { id, todoTitle, todoDescription, todoDate } = props.todo
	return (
		<section className={styles.container}>
		
			 <section className={styles.first}>
			   <section className={styles.second}>
			   <input type="checkbox" id='check' name='check' className={styles.checkbox} />
			<Link href={'/' + id}>
				<a>
					<h3>{todoTitle}</h3>
				</a>
			</Link>
			   </section>
			   <section className={styles.third}>
			   <PencilAltIcon width={30} color="blue" />
			<TrashIcon width={30} color="red" />
			   </section>
			 </section>
			
			<section className={styles.fourth}>
			<div>{todoDescription}</div>
			<div>{todoDate}</div>
			</section>
		</section>
	)
}

export default AllTodos
