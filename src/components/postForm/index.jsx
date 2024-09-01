import styles from "./styles.module.css";
import UserIcon from "../../assets/icons/user_icon.svg";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import PostContext from "../../context/PostContext";

function PostForm() {
  const { createPost } = useContext(PostContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  function onSubmit(data) {
    const newPost = {
      title: data.title,
      completed: false,
      id: Math.round(Math.random() * 10000),
      content: data.content,
    };
    console.log(newPost);
    createPost(newPost);
    reset();
  }

  return (
    <div className={styles.post_container}>
      <h1 className={styles.heder_text}>Написать пост</h1>
      <div className={styles.post_form_and_foto_container}>
        <img src={UserIcon} alt="user icon" className={styles.user_image} />
        <form
          className={styles.post_form_container}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className={styles.input_container}>
            <label className={styles.label_text}>Заголовок</label>
            <input
              type="text"
              placeholder="Заголовок"
              className={styles.input_header}
              {...register("title", {
                required: "Поле заголовок не должно быть пустым",
              })}
            />
            {errors.title && (
              <p className={styles.errors}>{errors.title.message}</p>
            )}
            <label className={styles.label_text}>Текст поста</label>
            <textarea
              rows="1"
              placeholder="Введите текст..."
              className={styles.text_area}
              {...register("content", {
                required: "Поле текст поста не должно быть пустым",
              })}
            />
            {errors.content && (
              <p className={styles.errors}>{errors.content.message}</p>
            )}
          </div>
          <button className={styles.btn}>Публикация</button>
        </form>
      </div>
    </div>
  );
}

export default PostForm;
