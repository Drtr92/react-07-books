import { Link, useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import styles from "./Search.module.css";
import SearchBar from "../components/SearchBar.jsx";

export const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

function Search() {
    const [searchParams] = useSearchParams();
    // useSearchParams 는 변형된 state임
    // react-router는 쿼리스트링을 state를 만들어서 저장하고 있음
    const keyword = searchParams.get("keyword");

    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);

    // useEffect(함수, [의존성배열])
    // 의존성배열은 배열 안에 바뀔 수 있는 값을 갖고 있는 변수(state, 함수)를 요소로 가질 수 있으며,
    // 의존성 배열에 집어넣은 변수가 바뀔 때 마다 useEffect는 함수를 재발동 시킴

    /*
        list 가 바뀔 때 마다 화면이 다시 그려진다
        list 는 백엔드 에게서 받아오는 데이터 목록이다.
        useEffect는 백엔드 에게서 받아오는 데이터 목록을 list에 담는다
        useEffect는 keyword가 바뀔 때 마다 재발동된다.
        keyword는 쿼리스트링의 값이 바뀔 때 마다 값을 갱신한다.
        keyword는 사용자가 입력하여 검색해달라고 한 검색단이다.
    */

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

        컴포넌트가 그려지는 조건은 "주소"이긴 한데, 정확히는 "경로"의 변경
        SearchBar에서 사용자가 키워드를 입력하고 검색을 시키면 주소가

        https://localhost.5173/search?keyword=한글
        ↘
        https://localhost.5173/search?keyword=Math

        경로가 변경되지 않고 쿼리스트링만 바뀌었기 때문에 Search라고 하는 컴포넌트가 다시 그려지지 않음.
        이 말은, 검색을 사용자가 바꾸기 이전에 떠 있던 Search가 그대로 있다는 것
        그렇기 때문에 리렌더링이 되지 않음 => useEffect가 발동되어서 검색 결과를 다시 받아와야 되는데 안함
    */

    return (
        <div className={styles.container}>
            <h3>검색결과 : {keyword}</h3>

            <SearchBar keyword={keyword} />

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
