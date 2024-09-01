import styles from "./styles.module.css";
import Post from "../post";
import { useContext } from "react";
import PostContext from "../../context/PostContext";

function PostList() {
  const { currentPosts, loadMorePosts, isloading, error, isEdit } =
    useContext(PostContext);

  return (
    <div className={styles.post_list_container}>
      <h1>Список постов</h1>
      {isloading && <p>Загрузка постов...</p>}
      {error ? (
        <p>Произошла ошибка</p>
      ) : (
        currentPosts &&
        currentPosts.map((post, ind) => {
          return (
            <Post
              key={ind}
              title={post.title}
              id={post.id}
              content={post.content}
            />
          );
        })
      )}

      <div className={styles.btn_container}>
        {!isEdit && (
          <button onClick={loadMorePosts} className={styles.post_list_btn}>
            Далее
          </button>
        )}
      </div>
    </div>
  );
}

export default PostList;
