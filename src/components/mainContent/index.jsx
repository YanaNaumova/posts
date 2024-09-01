import styles from "./styles.module.css";
import PostForm from "../postForm/index";
import PostList from "../postList/index";

function MainContent() {
  return (
    <div className={styles.mainContext_container}>
      <PostList />
      <PostForm />
    </div>
  );
}

export default MainContent;
