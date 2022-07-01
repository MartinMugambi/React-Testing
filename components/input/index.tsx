import styles from "../../styles/Input.module.css"

interface InputProps{
    type: string 
    placeholder: string 
}

const Input =(props: InputProps) =>{

    return ( 
        <section className={styles.container}>
          <input type={props.type} placeholder={props.placeholder} />
        </section>   
      
    
    );
}

export default Input