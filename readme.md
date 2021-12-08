# Dooray Post 제목 clipboard copy button

- 클라우드개발팀에서는 흔히 commit 메시지와 pull request 타이틀을 dooray post 번호와 제목으로 하는데 일일이 copy 하는 것이 힘들어 chrome extension 으로
  클립보드에 copy 해주는 버튼을 만들어봄.
- dooray 페이지 로드시 상단의 X 표시 옆에 커밋메시지, Pull 메시지 버튼을 생성.
- github 페이지에서도 pull request 생성시 자동완성 버튼으로 제목과 내용을 자동으로 넣어줄수 있는 버튼 생성

# 설치 방법

## github 에서 이 project 를 checkout 받습니다.

## chrome 개발자 모드 활성화

![메뉴 선택](https://github.com/bgcho98/DoorayClipboard/blob/master/doc/image/1.PNG)

![메뉴 선택](https://github.com/bgcho98/DoorayClipboard/blob/master/doc/image/2.PNG)

## 확장 프로그램 설치

![메뉴 선택](https://github.com/bgcho98/DoorayClipboard/blob/master/doc/image/3.PNG)

## checkout 받은 폴더를 선택합니다.

![메뉴 선택](https://github.com/bgcho98/DoorayClipboard/blob/master/doc/image/4.PNG)

## 완료되면 아래와 같이 보입니다.

![메뉴 선택](https://github.com/bgcho98/DoorayClipboard/blob/master/doc/image/5.PNG)

# 설치 방법(MAC용)

![mac_install_1](https://github.com/bgcho98/DoorayClipboard/blob/master/doc/image/mac_install_1.png)

![mac_install_1](https://github.com/bgcho98/DoorayClipboard/blob/master/doc/image/mac_install_2.png)

- 클릭하고 확장 프로그램 부분을 선택합니다.

![mac_install_1](https://github.com/bgcho98/DoorayClipboard/blob/master/doc/image/mac_install_3.png)

- 확장 프로그램 부분에서 개발자 모드를 클릭합니다.
- 개발자 모드를 활성화 시킨 후 처음에 Clone한 프로젝트를 "압축해제된 확장 프로그램을 로드합니다." 버튼을 통해 로드합니다.

![mac_install_1](https://github.com/bgcho98/DoorayClipboard/blob/master/doc/image/mac_install_4.png)

- 로드가 정상적으로 되었으면 확장프로그램 목록에 Dooray Clipboard가 로드된 것을 확인할 수 있습니다.

![mac_install_1](https://github.com/bgcho98/DoorayClipboard/blob/master/doc/image/mac_install_5.png)

- 두레이 프로젝트를 들어가서 refresh를 하면 위와 같이 "커밋메세지", "pull메세지", "메세지+링크"가 추가된 것을 확인할 수 있습니다.

# 사용 방법

## Dooray 버튼
dooray task 를 refresh 하면 X 버튼 옆에 두개 버튼이 생성됩니다. 누르면 바로 클립보드로 카피됩니다.
![mac_install_1](https://github.com/bgcho98/DoorayClipboard/blob/master/doc/image/mac_install_6.png)

## Github 자동완성 버튼

* Dooray 의 프로젝트 업무 화면에서 `PULL메시지`버튼을 클릭하면 자동으로 추가가 됩니다.
* 수동으로 하는 경우 아래처럼 작업을 해야 합니다.

Dev Tools 의 콘솔에서 DoorayClipboard를 선택 후 Dooray의 프로젝트 정보를 입력해서 콤보 박스로 선택을 할 수 있게 합니다. 
```
chrome.storage.local.set({doorayProjectIdMap: {1963480696738741170: { id: "1963480696738741170", text: "클라우드프레임워크개발팀" }, 2559256945165333868: { id: "2559256945165333868", text: "tc-console" }}}, () => console.log("saved") )
```

# 참조

- 만드는 방법 : https://developer.chrome.com/extensions/content_scripts
- 오픈 소스 사용 : https://www.cssscript.com/minimal-notification-popup-pure-javascript/ 사용함.
