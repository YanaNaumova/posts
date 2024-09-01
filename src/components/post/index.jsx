import styles from "./styles.module.css";
import Logo from "../../assets/icons/user_icon.svg";
import { useContext } from "react";
import PostContext from "../../context/PostContext";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Edit from "../../assets/icons/edit.svg";
import PropTypes from "prop-types";

function Post({ title, content, id }) {
  const { handleDelete, updatePost, setIsEdit, isEdit } =
    useContext(PostContext);
  const [isChanged, setIsChenged] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    if (isChanged) {
      setValue("newTitle", title);
      setValue("newContent", content);
    }
  }, [isChanged, title, content, setValue]);

  function changedPost() {
    setIsChenged(true);
    setIsEdit(true);
  }

  function onSubmit(data) {
    const newPost = {
      title: data.newTitle,
      completed: false,
      id: { id },
      content: data.newContent,
    };
    updatePost(id, newPost);
    setIsChenged(false);
    setIsEdit(false);
  }

  return isChanged ? (
    <div className={styles.post_container}>
      <div className={styles.user_logo_container}>
        <img src={Logo} alt="user logo" className={styles.user_logo} />
        <p className={styles.user_logo_container_text}>User logo</p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.post_text_container}
      >
        <input
          className={styles.input_header}
          {...register("newTitle", { required: "Поле не должно быть пустым" })}
        />
        {errors.newTitle && (
          <p className={styles.errors}>{errors.newTitle.message}</p>
        )}
        <textarea
          {...register("newContent", {
            required: "Поле не должно быть пустым",
          })}
          className={styles.text_area}
        />
        {errors.newContent && (
          <p className={styles.errors}>{errors.newContent.message}</p>
        )}
        <button className={styles.btn}>Сохранить</button>
      </form>
      <div className={styles.btn_container}>
        <p>{id}</p>
      </div>
    </div>
  ) : (
    <div className={styles.post_container}>
      <div className={styles.user_logo_container}>
        <img src={Logo} alt="user logo" className={styles.user_logo} />
        <p className={styles.user_logo_container_text}>User logo</p>
      </div>
      <div className={styles.post_text_container}>
        <h1>{title}</h1>
        <p className={styles.post_text_container_text}>{content}</p>
      </div>
      <div className={styles.btn_container}>
        <p className={styles.post_text_container_text}>{id}</p>
        <img onClick={changedPost} src={Edit} alt="edit"></img>
        {!isEdit && <button onClick={() => handleDelete(id)}>Удалить</button>}
      </div>
    </div>
  );
}

Post.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default Post;
