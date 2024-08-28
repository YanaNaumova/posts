import styles from "./styles.module.css";
import Header from "../../components/header/index";
import MainContent from "../../components/mainContent";

function Home() {
  return (
    <div className={styles.home_container}>
      <Header />
      <MainContent />
    </div>
  );
}

export default Home;
