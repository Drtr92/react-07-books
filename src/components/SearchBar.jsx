import { useState } from "react";
import { useNavigate } from "react-router";
import styles from "./SearchBar.module.css";

function SearchBar() {
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();

    const onChangeHandler = event => setKeyword(event.target.value);

    const onSubmitHandler = event => {
        event.preventDefault();
        const k = keyword.trim();
        if (!k) return;

        navigate(`/search?keyword=${encodeURIComponent(k)}`);
    }; // <= onSubmitHandler end.

    return (
        <form onSubmit={onSubmitHandler} className={styles.form}>
            <input className={styles.input} onChange={onChangeHandler} value={keyword} />
            <button type={"submit"} className={styles.button}>
                검색
            </button>
        </form>
    );
}

export default SearchBar;