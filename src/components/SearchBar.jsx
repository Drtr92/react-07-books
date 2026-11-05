import { useState } from "react";
import { useNavigate } from "react-router";
import styles from "./SearchBar.module.css";

function SearchBar({ keyword }) {
    const [inputKeyword, setInputKeyword] = useState(keyword || "");
    const navigate = useNavigate();

    const onChangeHandler = event => setInputKeyword(event.target.value);

    const onSubmitHandler = event => {
        event.preventDefault();
        const k = inputKeyword.trim();
        if (!k) return;

        navigate(`/search?keyword=${encodeURIComponent(k)}`);
    }; // <= onSubmitHandler end.

    /*
        jacaScript 에서 Function 이라고 불렀던 걸, Component라고 부르는 것 처럼,
        javaScript 에서 매개변수로 전달되었던 걸, Props 라고 부름

        component는 화면 요소를 리턴하는 function 이다.

        이 때 , function 과 component의 차이는?
        - function은 매개변수를 몇 개든 받을 수 있음.
        - 매개변수를 하나만 받을 수 있음.
          하나만 받을 수 있지만, 그 하나의 값은 객체이다.
    */

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
