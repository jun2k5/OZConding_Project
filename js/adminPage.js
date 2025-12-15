        // 제품 데이터
    const product_data = [
      { category: "상의", brand: 'Supreme', product: '슈프림 박스로고 후드티', price: '390,000' },
      { category: "하의", brand: 'DIESEL', product: '디젤 트랙 팬츠', price: '188,000' },
      { category: "신발", brand: 'Nike', product: '에어포스 1', price: '137,000' },
      { category: "패션잡화", brand: 'Music&Goods', product: '빵빵이 키링', price: '29,000' },
      //데이터 추가
      { category: "패션잡화", brand: 'Music&Goods', product: '빵빵이 키링', price: '29,000' },
      { category: "패션잡화", brand: 'Music&Goods', product: '빵빵이 키링', price: '29,000' },
      { category: "패션잡화", brand: 'Music&Goods', product: '빵빵이 키링', price: '29,000' },
      { category: "패션잡화", brand: 'Music&Goods', product: '빵빵이 키링', price: '29,000' },
      { category: "패션잡화", brand: 'Music&Goods', product: '빵빵이 키링', price: '29,000' },
      { category: "패션잡화", brand: 'Music&Goods', product: '빵빵이 키링', price: '29,000' },
      { category: "패션잡화", brand: 'Music&Goods', product: '빵빵이 키링', price: '29,000' },
      { category: "패션잡화", brand: 'Music&Goods', product: '빵빵이 키링', price: '29,000' },
      { category: "패션잡화", brand: 'Music&Goods', product: '빵빵이 키링', price: '29,000' },
      { category: "패션잡화", brand: 'Music&Goods', product: '빵빵이 키링', price: '29,000' },
      { category: "패션잡화", brand: 'Music&Goods', product: '빵빵이 키링', price: '29,000' },
      { category: "패션잡화", brand: 'Music&Goods', product: '빵빵이 키링', price: '29,000' },
      { category: "패션잡화", brand: 'Music&Goods', product: '빵빵이 키링', price: '29,000' },      

      // ...
    ];

    // 제품 테이블에 데이터 추가
    const product_data_Table = document.getElementById('product_data_Table');
    //====================================================


    // product_data_temp = product_data.slice(0,7)
    //  product_data_temp.forEach((item) => {
    //     console.log(item.category)
    //  });

    // console.log(product_data.length);
    // // 제품데이터의 길이는 product_data.length
    // // 페이지네이션을 하기 위해서 일단 7을 기준으로 나누기 - 게시물 7개씩 보기
    // // 이전 버튼은 현재 페이지가 2 이상일 때 보이기
    // // 다음 버튼은 페이지수가 끝페이지일때 숨기기
    
    //숫자 버튼을 담는 SPAN태그 가져오기
    const numBtns = document.getElementById("numBtns");
    //이전 버튼 정보 가져오기
    const priviusBtn = document.getElementById("priviusBtn");
    //다음 버튼 정보 가져오기
    const nextBtn = document.getElementById("nextBtn");
    //표시할 아이템 수
    const itemsPerPage = 7;
    //현재 페이지
    let currentPage = 1;
    //전체 게시물 수
    const totalItemsNum = product_data.length;
    //전체 페이지 수
    const totalPagesNum = Math.ceil(totalItemsNum / itemsPerPage)


    function updatePage(page){
        //시작인덱스
        const startIndex = (page - 1) * itemsPerPage;
        //끝인덱스
        const endIndex = startIndex + itemsPerPage;

        //보여줄 항목 빼내기
        const showItems = product_data.slice(startIndex, endIndex);

        //테이블 초기화
        product_data_Table.innerHTML = '';
    
        //테이블에 데이터 넣기
        showItems.forEach((item) => {
            const row = product_data_Table.insertRow();
            row.insertCell(0).innerHTML = item.category;
            row.insertCell(1).innerHTML = item.brand;
            row.insertCell(2).innerHTML = item.product;
            row.insertCell(3).innerHTML = item.price;
        });
    }

    //이전 버튼 다음 버튼을 보여주는 함수
    function updateBtns() {
        //1페이지면 이전버튼 없애기
        if(currentPage === 1){
            priviusBtn.disabled=true;
            priviusBtn.classList.add("d-none")
        } else {
            priviusBtn.disabled=false;
            priviusBtn.classList.remove("d-none")
        }

        //끝페이지면 다음버튼 없애기
        if(currentPage === totalPagesNum){
            nextBtn.disabled=true;
            nextBtn.classList.add("d-none")
        } else {
            nextBtn.disabled=false;
            nextBtn.classList.remove("d-none")
        }

        //페이지 숫자 버튼들 스타일 업데이트 <- 인터넷 이용
        const pageButtons = numBtns.querySelectorAll('button');
        pageButtons.forEach(btn => {
            // Bootstrap 스타일 클래스를 사용하여 현재 페이지 강조
            if (parseInt(btn.innerText) === currentPage) {
                btn.classList.remove("btn-outline-secondary");
                btn.classList.add("btn-primary");
            } else {
                btn.classList.remove("btn-primary");
                btn.classList.add("btn-outline-secondary");
            }
        });

    }

    function pagination() {
        numBtns.innerHTML = ''; 

        // 페이지 번호 버튼 생성
        for (let i = 1; i <= totalPagesNum; i++) {
            const numBtn = document.createElement("button");
            // Bootstrap 버튼 클래스 추가
            numBtn.classList.add("me-2", "btn", "btn-outline-secondary", "btn-sm"); 
            numBtn.innerText = i;
            numBtn.onclick = function() {
                currentPage = i;
                updatePage(currentPage);
                updateBtns();
            };
            numBtns.append(numBtn);
        }

        // 이전 버튼 클릭함수 추가
        priviusBtn.onclick = function() {
            //0보다 작아지는 변수 차단
            if (currentPage > 1) {
                //현재 페이지를 이전페이지로 이동
                currentPage -= 1;
                //현재 페이지의 아이템항목으로 업데이트
                updatePage(currentPage);
                //버튼 업데이트
                updateBtns();
            }
        };

        // 다음 버튼 클릭함수 추가
        nextBtn.onclick = function() {
            if (currentPage < totalPagesNum) {
                currentPage += 1;
                updatePage(currentPage);
                updateBtns();
            }
        };
        
        // 버튼 업데이트
        updateBtns();
    }

    pagination()
    updatePage(currentPage)

    // //숫자버튼 생성
    // //페이지 수는 7로 나눈 값 + 1
    // for(i=0;i<pageNum+1;i+=1){
    //     const numBtn = document.createElement("button")
    //     numBtn.classList.add("me-2")
    //     numBtn.onclick = 
    //     numBtn.innerText = i + 1
    //     numBtns.append(numBtn)
    // }



    //======================================================
    // 초기 데이터 로딩
    // product_data.forEach((item) => {
    //   const row = product_data_Table.insertRow();
    //   row.insertCell(0).innerHTML = item.category;
    //   row.insertCell(1).innerHTML = item.brand;
    //   row.insertCell(2).innerHTML = item.product;
    //   row.insertCell(3).innerHTML = item.price;
    // });
    

    //현재시간 출력하기
    function dateTimeUpdate() {

    let date = new Date(); //일시 정보 객체 생성
//    console.log(date)
    const nowDatetime = document.getElementById("nowDatetime")

    let year = date.getFullYear()
    let month = ('0' + (date.getMonth() + 1)).slice(-2) //한자리수일때 앞에 0집어넣어 포멧유지하기
    let day = ('0' + (date.getDate())).slice(-2) //슬라이스를 이용해 두자리수일때 0 없애기
    let today = year+"-"+month+"-"+day

    nowdatetime = today + " " + date.toString().slice(16, -18)
    nowDatetime.innerText = nowdatetime
    }

    dateTimeUpdate();
    setInterval(dateTimeUpdate, 1000);

    // console.log(date) // Mon Dec 15 2025 11:47:43 GMT+0900 (한국 표준시)
    // console.log(date.getMonth());    // 12월인데 11이 나오니 +1을 해주어야한다.
    // console.log(date.toString().slice(16, -18))     //현재 시각


    
    //다크모드
    function darkmode(){
        const body = document.getElementById("body")
        const table = document.getElementById("productTable");

        const currentTheme = body.getAttribute('data-bs-theme');
        if (currentTheme === "dark") {
            body.removeAttribute('data-bs-theme');
        } else {
            body.setAttribute('data-bs-theme', 'dark');
        }
    }

    const darkmodeBtn = document.getElementById("darkmodeBtn")
    darkmodeBtn.addEventListener("click", darkmode) //다크모드 버튼에 이벤트리스너 추가


    const submitBtn = document.getElementById('submitBtn');
    submitBtn.addEventListener('click', function(e) {
        e.preventDefault(); // 새로고침 방지
    });


