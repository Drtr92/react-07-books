import { Link, useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import styles from "./Search.module.css";
import SearchBar from "../components/SearchBar.jsx";

export const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

function Search() {
    const [searchParams] = useSearchParams();
    const keyword = searchParams.get("keyword");

    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!keyword) return;

        setLoading(true);

        fetch(
            `https://www.googleapis.com/books/v1/volumes?q=${keyword}&maxResults=20&key=${API_KEY}`,
        )
            .then(res => res.json())
            .then(json => setList(json.items))
            .catch(err => console.log(err))
            .finally(() => setLoading(false));
    }, [keyword]);

    /*
        검색 결과를 담당하는 Search 컴포넌트에서도 검색이 가능하도록
        설계 변경 하니, Home에 있는 내용과 다르지 않음을 확인
                      => Home에서 컴포넌트를 분리해서 수입 시켜야겠구나
    */

    return (
        <div className={styles.container}>
            <h3>검색결과 : {keyword}</h3>

            <SearchBar />

            {loading ? (
                <div className={styles.message}>로딩 중입니다...</div>
            ) : list.length === 0 ? (
                <div className={styles.message}>검색 결과가 없습니다.</div>
            ) : (
                list.map((item, i) => {
                    return (
                        <Link key={i} to={`/detail/${item.id}`} className={styles.book}>

                            {item.volumeInfo.imageLinks ? (
                                <img
                                    className={styles.cover}
                                    src={item.volumeInfo.imageLinks.thumbnail}
                                    alt={item.volumeInfo.title}
                                />
                            ) : (
                                <div className={styles.no_cover}>No cover</div>
                            )}

                            <div>
                                <div className={styles.title}>{item.volumeInfo.title}</div>

                                <div className={styles.authors}>
                                    {item.volumeInfo.authors?.join(", ")}
                                </div>
                            </div>
                        </Link>
                    );
                })
            )}
        </div>
    );
}

export default Search;
