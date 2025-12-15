// 제출 이벤트를 받는다 (이벤트 핸들링)
const form = document.getElementById("form")


form.addEventListener("submit", (e)=>{
    e.preventDefault()
    
    let userId = e.target.id.value
    let userPw1 = e.target.pw.value
    let userPw2 = e.target.pw2.value
    let userName = e.target.name.value
    let userPhone = e.target.phone.value
    let userGender = e.target.gender.value
    let userEmail = e.target.email.value
    
    // console.log(userId, userPw1,userPw2,userName,userPhone,
    //     userPosition,userGender,userEmail,userIntro
    // )

    if(userId.length < 6){
        alert("아이디가 너무 짧습니다. 6자 이상 입력해주세요.")    
        return
    }

    if(userPw1 !== userPw2){
        alert("비밀번호가 일치하지 않습니다.")
        return
    }

    document.body.innerHTML=""
    document.write(`<h1>${userId}님 환영합니다</h1>`)
    document.write(`<h3>회원 가입 시 입력하신 내역은 다음과 같습니다.</h3>`)
    document.write(`<hr>`)
    document.write(`<p>아이디 : ${userId}</p>`) 
    document.write(`<p>이름 : ${userName}</p>`)
    document.write(`<p>전화번호 : ${userPhone}</p>`)

// 3회차 마무리 과제

// 회원 가입을 완료하면 나타나는 환영 인사를 다음과 같이 만들어보자!

// userId님 환영합니다.
// 회원 가입 시 입력하신 내역은 다음과 같습니다.
// 아이디 : userId
// 이름 : userName
// 전화번호 : userPhone
// 원하는 직무 : userPosition

    function darkmode(){
        const body = document.getElementById("body")
        const table = document.getElementById("container");

        const currentTheme = body.getAttribute('data-bs-theme');
        if (currentTheme === "dark") {
            body.removeAttribute('data-bs-theme');
        } else {
            body.setAttribute('data-bs-theme', 'dark');
        }
    }

    const darkmodeBtn = document.getElementById("darkmodeBtn")
    darkmodeBtn.addEventListener("click", darkmode) //다크모드 버튼에 이벤트리스너 추가


})


// 제출된 입력 값들을 참조한다.

// 입력값에 문제가 있는 경우 이를 감지한다.