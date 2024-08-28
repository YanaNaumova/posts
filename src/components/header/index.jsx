import styles from "./styles.module.css";
import Logo from "../../assets/icons/logo_icon.svg";

function Header() {
  return (
    <header className={styles.header_container}>
      <img src={Logo} alt="logo" />
      <nav className={styles.nav_container}>
        <a href="#">Главная </a>
        <a href="#">Музыка</a>
        <a href="#">Сообщества</a>
        <a href="#">Друзья</a>
      </nav>
    </header>
  );
}

export default Header;
