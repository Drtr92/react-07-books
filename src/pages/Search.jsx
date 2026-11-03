import { useSearchParams } from "react-router";
import {useEffect, useState} from "react";

// VITE 가 불러들여준 환경변수를 꺼낼 때는 function 밖에서!

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

function Search() {
    // Search 컴포넌트가 뜨는 상황은
    // 사용자가 Home에서 뭔가 keyword를 입력했고, 그걸 Home 컴포넌트는
    // 쿼리스트링 keyword=ㅁㄹ머ㅎ 담아서 전달해준 상황

    // 1. 쿼리스트링 keyword=어쩌구 에서 '어쩌구'를 가져와서
    // 2. 백엔드에게 '어쩌구'를 이용하여 결과를 달라고 해서, 받아서, 가공해서, 저장
    // 3. 그걸 화면에 출력

    // 쿼리스트링에서 제공된 값을 가져올 때 써야되는 함수 : useSearchParams()
    // 쿼리스트링에서 값을 꺼내올땐 이렇게 2개 단계를 거쳐야 함
    const [searchParams] = useSearchParams(); // 변형된 state임
    const keyword = searchParams.get("keyword");

    // 동적 라우팅을 통한 params와 searchParams의 큰 차이
    // params는 무조건 있음. searchParams는 있을 수도 있고 없을 수도 있음.

    // 1. /search                  => keyword의 타입 : null
    // 2. /search?a=10             => keyword의 타입 : null
    // 3. /search?keyword=         => keyword의 타입 : ""
    // 4. /search?keyword=Math     => keyword의 타입 : "Math"

    // 백엔드에게 keyword를 이용하여 결과를 달라고 해서, 받아서, 가공해서, 저장
    const [list, setList] = useState([]);

    // Google Books API를 사용할 건데
    // 누구나 사용할 수 있게 공개 API가 아님. 기존에 등록해둔 개발자만 사용할 수 있음
    // 그렇게 등록을 하면 Token을 줌 (Github 과 같은 경우임)
    // 요청을 보낼 때 토큰을 요청에 담아서 보내야 함

    // Token은 "내 신분증"
    // 외부에 노출될 가능성이 100%
    // Token이나, 비밀번호 같은 민감한 정보는 코드에 포함시켜서는 안됨. 절대로.
    // => 이러한 민감한 정보를 코드 상에 사용하지 않도록 존재하는 장치 => "환경변수"

    useEffect(() => {
        fetch(`https://www.googleapis.com/books/v1/volumes?q=${keyword}&maxResults=20&key=${API_KEY}`)
            .then()
            .then( => )},[]);

    return <></>;
}

export default Search;
