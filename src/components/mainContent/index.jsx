import styles from "./styles.module.css";
import PostForm from "../postForm/index";

function MainContent() {
  return (
    <div className={styles.mainContext_container}>
      <PostForm />
    </div>
  );
}

export default MainContent;
