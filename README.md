# 개요
mysql을 이용하여 CRUD를 실습하기 위해 간단한 인터넷 커뮤니티와 같은 게시판 웹서비스를 개발한다. CRUD는  DMBS(database management system)에서 데이터를 다루는 방법인 생성(Create), 조회(Read), 갱신(Update), 삭제(Delete)이다.

<br>

### 기능
로그인 기능 없는 커뮤니티 게시판으로 글과 댓글 작성· 수정에 제약이 없다. 작성자가 아니어도 게시글 및 댓글을 삭제할 수 있으며, 댓글이 있는 게시글도 삭제할 수 있다.

|no.|기능 명|내용
|---|---|---|
|1|전체 게시글 목록 조회| 한 페이지에 10개의 게시글(제목, 작성자명, 게시 날짜)만 표시한다.|
|2|상세 게시글 조회|게시글 제목, 내용, 작성자명, 게시 날짜 및 시간을 표시한다.|
|3|게시글 작성|기입란: 제목, 내용, 작성자명|
|4|게시글 삭제|작성자가 아니어도 삭제할 수 있다.|
|5|댓글 작성|기입란: 내용, 작성자명|
|6|댓글 삭제|작성자가 아니어도 삭제할 수 있다. | 



# 실행
### 실행 명령어
```
>$ node app.js
```

<br>

### 동작
- mainpage
  ![image](https://github.com/Jaden000/simple-general-forum/assets/84056591/177af430-3861-4480-8872-64137d79e8d2)
  - pagination
![image](https://github.com/Jaden000/simple-general-forum/assets/84056591/18116909-82a6-4296-a324-20dcc466f4b3)


- posting page
![image](https://github.com/Jaden000/simple-general-forum/assets/84056591/b7c50b1a-35bb-4ebc-8fd9-105e3a26f935)

- post details page
![image](https://github.com/Jaden000/simple-general-forum/assets/84056591/deb5794c-311f-4701-8ce6-fc38edfac32c)

