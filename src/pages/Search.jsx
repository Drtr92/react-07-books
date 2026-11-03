import { useSearchParams } from "react-router";
import { useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

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
    }, []);

    return (
        <div>
            <h3>검색결과 : {keyword}</h3>

            {loading ? (
                <div>로딩 중입니다...</div>
            ) : (
                list.length === 0 ? (<div>검색 결과가 없습니다.</div>) : (<></>)
            )}
        </div>
    );
}

export default Search;
