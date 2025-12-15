import time
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
import sqlite3

# Todo: 데이터베이스 테이블 생성 함수
def create_table():
    conn = sqlite3.connect("products.db")
    cursor = conn.cursor()
    cursor.execute("DROP TABLE IF EXISTS products;")
    cursor.execute(
        # 1. products 테이블을 생성하는 sql 문을 작성합니다.
        """
        CREATE TABLE products(
            product_id INTEGER PRIMARY KEY AUTOINCREMENT,
            category VARCAHR(45) NOT NULL,
            brand VARCAHR(45) NOT NULL,
            product_name VARCAHR(45) NOT NULL,
            price INTEGER
            );

        """
    )
    conn.commit()
    conn.close()

# Todo: 데이터 저장 함수 
def save_to_db(category, brand, product_name, price):
    # 1. 데이터베이스 연결
    conn = sqlite3.connect("products.db")
    # 2. 커서 생성
    cursor = conn.cursor()
    # 3. INSERT 쿼리 실행 (힌트: ?, ?, ?, ? 로 바인딩)
    cursor.execute(f"""
        INSERT INTO products (category, brand, product_name, price) VALUES
        ({category}, {brand}, {product_name}, {price});
    """)
    # 4. 커밋 및 연결 종료
    conn.commit()
    conn.close()
    pass

# 드라이버 설정 함수
def setup_driver():
    header_user = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36"
    options_ = Options()
    options_.add_argument(f"User-Agent={header_user}")
    # options_.add_argument("--headless=new")
    # options_.add_experimental_option("detach", True)  # 브라우저 종료 안함 (디버깅용)
    options_.add_experimental_option('excludeSwitches', ["enable-logging"])  # 불필요한 로그 제거
    return webdriver.Chrome(options=options_)

# 상품 검색 함수 
def search_product(driver, keyword):
    driver.get("https://kream.co.kr/")
    
    # 1. 검색 버튼 클릭
    wait = WebDriverWait(driver, 10)
    search_button = wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, ".btn_search.header-search-button.search-button-margin")))
    search_button.click()
    
    # 2. 검색어 입력
    search_input = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, ".input_search.show_placeholder_on_focus")))
    search_input.clear()
    search_input.send_keys(keyword)
    search_input.send_keys(Keys.ENTER)

    # 3. 페이지 다운 20번 반복
    for _ in range(10):
        driver.find_element(By.TAG_NAME, 'body').send_keys(Keys.PAGE_DOWN)
        time.sleep(0.3)

# Todo: 상품 정보 추출 함수
def extract_product_info(soup, category):
    items = soup.select(".item_inner")

    print(items)
    # for item in items:
    #     # 1. 브랜드, 상품명, 가격을 추출하고 카테고리, 브랜드, 상품명, 가격을 출력 
    #     # product_name = ...
    #     # brand = ...
    #     # price = ...
        
    #     # 2. save_to_db 함수를 이용해 데이터를 저장
    #     pass

def main():
    create_table()
    categories = ["상의", "하의", "신발", "패션잡화"]
    driver = setup_driver()

    for category in categories:
        print(f"===== '{category}' 카테고리 검색 시작 =====")
        search_product(driver, category)
        html = driver.page_source
        soup = BeautifulSoup(html, "html.parser")
        extract_product_info(soup, category)
        print()

    driver.quit()

if __name__ == "__main__":
    main()