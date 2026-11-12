import { type SubmitEvent, type ChangeEvent, useState } from "react";
import { useNavigate } from "react-router";
import styles from "./SearchBar.module.css";

/*
    JSX 문법 (정해진 것)

    컴포넌트는,
    실행될 때 속성으로 제공된 것'들'이
    첫번째 매개변수에 객체로서 들어온다
*/

function SearchBar({ keyword } : { keyword: string }) {
    const [inputKeyword, setInputKeyword] = useState(keyword || "");
    const navigate = useNavigate();

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement, HTMLInputElement>) =>
        setInputKeyword(event.target.value);

    const onSubmitHandler = (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        const k = inputKeyword.trim();
        if (!k) return;

        navigate(`/search?keyword=${encodeURIComponent(k)}`);
    };

    return (
        <form onSubmit={onSubmitHandler} className={styles.form}>
            <input className={styles.input} onChange={onChangeHandler} value={inputKeyword} />
            <button type={"submit"} className={styles.button}>
                검색
            </button>
        </form>
    );
}

export default SearchBar;
