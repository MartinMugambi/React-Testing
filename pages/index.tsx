import Header from "../components/header";
import Input from "../components/header/input";
import styles from '../styles/Home.module.css';
const Home = () =>{

  return (
    <main>
     <Header />
      <form className={styles.form}>
        <Input type="text" placeholder ="Add todo title" />
        <Input type="text" placeholder ="Add todo description" />
        <Input type="date" placeholder ="Select date" />
      </form>
    </main>
  );
}

export default Home;