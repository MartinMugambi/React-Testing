import {ClipboardListIcon} from "@heroicons/react/solid";
import {MoonIcon} from "@heroicons/react/solid"
import  styles from "../../styles/Header.module.css"
const Header = () =>{

    return(
        <header className={styles.header}>
            <section className={styles.todo}>
                <h1>TODO</h1>
                <ClipboardListIcon width={30}  />
            </section>
            <section>
              <MoonIcon width={30} />
            </section>
        </header>
    );
}

export default Header