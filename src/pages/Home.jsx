import { useState } from "react";
import styles from "./Home.module.css";
import { useNavigate } from "react-router";

function Home() {
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState("");

    const onChangeHandler = event => setKeyword(event.target.value);
    const onSubmitHandler = event => {
        event.preventDefault();
        const k = keyword.trim();
        if (!k) return;

        navigate(`/search?keyword=${encodeURIComponent(k)}`);
    }; // <= onSubmitHandler end.

    return (
        <div className={styles.container}>
            <span className={styles.title}>Google Books 검색</span>
            <form onSubmit={onSubmitHandler} className={styles.form}>
                <input className={styles.input} onChange={onChangeHandler} value={keyword} />
                <button type={"submit"} className={styles.button}>검색</button>
            </form>
        </div>
    );
}

export default Home;
