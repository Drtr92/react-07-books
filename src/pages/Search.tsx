import { Link, useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import styles from "./Search.module.css";
import SearchBar from "../components/SearchBar.tsx";

export type Book = {
    id: string;
    volumeInfo: {
        title: string;
        authors?: string[];
        description?: string;
        imageLinks?: {
            thumbnail: string;
        };
    };
}

// 선택적 프로퍼티를 표기하는 ? 는
// 결국 "값이 애초부터 없다"는 undefined의 다른 말

type ApiResponse = {
    items: Book[];
}

export const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

function Search() {
    // useParams > URL에서 "경로" 에 동적 라우팅으로 분류되는 부분
    //           => useParams를 통해 가져오는 값은 string | Undefined 임
    // useSearchParams > URL에서 "쿼리 스트링" 에 해당하는 부분
    //           => useSearchParams 를 통해 가져오는 값은 string | null
    const [searchParams] = useSearchParams();
    const keyword = searchParams.get("keyword");

    const [list, setList] = useState<Book[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!keyword) return;

        setLoading(true);

        fetch(
            `https://www.googleapis.com/books/v1/volumes?q=${keyword}&maxResults=20&key=${API_KEY}`,
        )
            .then(res => res.json())
            .then((json: ApiResponse) => setList(json.items))
            .catch((err: unknown) => {
                if (err instanceof Error) {
                    console.log(err.message);
                } else {
                    console.log(err);
                }
            })
            .finally(() => setLoading(false));
    }, [keyword]);

    return (
        <div className={styles.container}>
            <h3>검색결과 : {keyword}</h3>

            <SearchBar keyword={keyword || ""} />

            {/*
                useSearchParams, 쿼리스트링에서 가져온 값은 string | null 이기 때문에
                searchBar 받을 수 있는 keyword 속성은 string만 가능함

                에러내용 -----------
                Type string | null is not assignable to type string
                지금 이 자리는 string만 들어올 수 있는데 넣은게 string | null 이라서 안돼,

                1. null 이 되는 상황 파악
                2. 검색 키워드가 없다는거니까, 인풋에 넣을 값이 없다고 해석하면 되는 것
                3. string인 "" 값으로 처리해줘도 아무런 문제가 없겠구나 => 논리합 처리
            */}

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
