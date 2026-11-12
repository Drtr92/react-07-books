import SearchBar from "../components/SearchBar";
import styles from "./Home.module.css";

function Home() {

    return (
        <div className={styles.container}>
            <span className={styles.title}>Google Books 검색</span>
            <SearchBar keyword={""} />
        </div>
    );
}

export default Home;
