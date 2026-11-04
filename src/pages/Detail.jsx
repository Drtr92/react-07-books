import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { API_KEY } from "./Search.jsx";

function Detail () {
    const navigate = useNavigate();
    // 사용자에게 원하는 책의 상세를 출력

    // 사용자가 원하는 책은 무엇인가 => 책의 ID 를 알아야 되는구나

    const { id } = useParams();

    // 백엔드에게 정보를 요청, 받아서, 가공하고, 저장해서, 출력
    const [book, setBook] = useState(null);

    useEffect(() => {
        fetch(`https://www.googleapis.com/books/v1/volumes/${id}?key=${API_KEY}`)
            .then(res => res.json())
            .then(json => setBook(json))
            .catch(err => console.log(err));
    },[id])

    // Search 컴포넌트에서는 list가 초기값도 [], 값이 도착해도 [], 값이 도착하지 않아도 []
    // loading 상태를 사용자에게 보여주기 위해서는 따로 loading이라는 state를 세웠어야 됐었음

    // Detail 컴포넌트 에서는 book 초기값이 null, 값이 도착하면 책 정보 객체, 값이 도착하지 않으면 null
    // book의 값이 있는지 없는지만 체크해줘도 화면을 달리 그려줄 수 있음

    if (!book) {
        return <div>loading...</div>
    }

    return <div>
        <button onClick={() => {
            // 사용자를 이동시키기 위해 뭘 써야되느냐
            navigate(-1);
        }}>&larr; 뒤로가기</button>
        <h2>{book.volumeInfo.title}</h2>
        {book.volumeInfo.imageLinks ? (
            <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} />
        ) : (
            <div>No cover</div>
        )}
        <p>{book.volumeInfo.authors?.join(", ")}</p>
        {/*
            태그들에게 dangerouslySetInnerHTML 속성을 사용할 수 있음
            - 기본적으로 리액트 에서는 '개발자'가 사용한 태그 외에는
              태그 형식이더라도 string으로 처리하여 화면에 출력함
            - 외부에서 제공된 태그는 악성코드의 위험이 존재함
            - 이 속성을 사용할 때에는 주의가 필요함 => 필요하면 그냥 하는거

            사용법 : dangerouslySetInnerHTML={{ __html: 내용 }}
        */}
        <p dangerouslySetInnerHTML={{ __html: book.volumeInfo.description }}></p>
    </div>;
}

export default Detail