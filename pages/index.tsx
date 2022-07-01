import Button from "../components/button";
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
         <section className={styles.buttons}>
          <Button title="Sumbit" bgColor="blue" color="white" />
          <Button title="Cancel" bgColor="grey" color="black" />
         </section>
      </form>
    </main>
  );
}

export default Home;