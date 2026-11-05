import SearchBar from "../components/SearchBar";
import styles from "./Home.module.css";

function Home() {
    // BrowserRouter 는 주소 감지 능력
    // Routes는 그 안에 있는 것들 중에 하나로 사용자를 떨궈주는 것
    // Route는 그냥 조건 (if)

    return (
        <div className={styles.container}>
            <span className={styles.title}>Google Books 검색</span>
            <SearchBar keyword={""} />
        </div>
    );
}

export default Home;
