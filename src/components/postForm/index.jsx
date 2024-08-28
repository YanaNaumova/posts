import styles from "./styles.module.css";
import UserIcon from "../../assets/icons/user_icon.svg";

function PostForm() {
  return (
    <div className={styles.post_container}>
      <h1 className={styles.heder_text}>Написать пост</h1>
      <div className={styles.post_form_and_foto_container}>
        <img src={UserIcon} alt="user icon" className={styles.user_image} />
        <form className={styles.post_form_container}>
          <div className={styles.input_container}>
            <label className={styles.label_text}>Заголовок</label>
            <input
              type="text"
              placeholder="Заголовок"
              className={styles.input_header}
            />
            <label className={styles.label_text}>Текст поста</label>
            <textarea
              rows="1"
              placeholder="Введите текст..."
              className={styles.text_area}
            />
          </div>
          <button className={styles.btn}>Публикация</button>
        </form>
      </div>
    </div>
  );
}

export default PostForm;
