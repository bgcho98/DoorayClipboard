# Dooray Post 제목 clipboard copy button

- 클라우드개발팀에서는 흔히 commit 메시지와 pull request 타이틀을 dooray post 번호와 제목으로 하는데 일일이 copy 하는 것이 힘들어 chrome extension 으로
  클립보드에 copy 해주는 버튼을 만들어봄.
- dooray 페이지 로드시 상단의 X 표시 옆에 커밋메시지, Pull 메시지 버튼을 생성.
  - 하지만 sub 로 만들어지는 popup post 에는 버튼은 만들어지지만 copy 는 원본 것이 되니 주의.

# 설치 방법
## github 에서 이 project를 checkout 받습니다.
## chrome 개발자 모드 활성화
![메뉴 선택](https://github.com/bgcho98/DoorayClipboard/blob/master/doc/image/1.PNG)

![메뉴 선택](https://github.com/bgcho98/DoorayClipboard/blob/master/doc/image/2.PNG)

## 확장 프로그램 설치
![메뉴 선택](https://github.com/bgcho98/DoorayClipboard/blob/master/doc/image/3.PNG)

## checkout 받은 폴더를 선택합니다.
![메뉴 선택](https://github.com/bgcho98/DoorayClipboard/blob/master/doc/image/4.PNG)

## 완료되면 아래와 같이 보입니다.
![메뉴 선택](https://github.com/bgcho98/DoorayClipboard/blob/master/doc/image/5.PNG)

# 사용 방법
dooray task를 refresh하면 X 버튼 옆에 두개 버튼이 생성됩니다. 누르면 바로 클립보드로 카피됩니다.
![메뉴 선택](https://github.com/bgcho98/DoorayClipboard/blob/master/doc/image/6.PNG)


# 참조

- 만드는 방법 : https://developer.chrome.com/extensions/content_scripts
- 오픈 소스 사용 : https://www.cssscript.com/minimal-notification-popup-pure-javascript/ 사용함.
