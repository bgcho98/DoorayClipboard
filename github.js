let PROJECT_ID = null;
const DOORAY_PROJECT_ID_MAP_NAME = "doorayProjectIdMap"

function initButton(id, buttonTitle, callbackFunc) {
  let button = document.createElement("button");
  button.id = id;
  button.textContent = buttonTitle;
  button.className = "btn btn-danger btn-sm";
  button.addEventListener("click", callbackFunc, false);
  return button;
}


function initSelect(id, target, copyButton) {
  let select = document.createElement("select");
  select.className = "form-select"
  select.id = id;

  select.addEventListener("change", event => {
      PROJECT_ID = event.target.value
	})

  chrome.storage.local.get(DOORAY_PROJECT_ID_MAP_NAME, result => {
	var doorayProjectIds = Object.values(result[DOORAY_PROJECT_ID_MAP_NAME]);

	for(var i = 0; i < doorayProjectIds.length; i++){
	  var option=document.createElement("option");
      option.text = doorayProjectIds[i].text;
      option.value = doorayProjectIds[i].id;
      try {
        select.add(option, select.options[null]);
      } catch (e) {
        select.add(option, null);
      }
	}

    target.insertBefore(
      select,
      copyButton
    );
  })
}

function applyDoorayInfo(responseText) {
  let response = JSON.parse(responseText);
  if (response.header.isSuccessful == false) {
    return;
  }

  let content = response.result.content;
  let projectName = response.result.references.projectMap[PROJECT_ID].code;
  document.querySelector(
    "input[id=pull_request_title]"
  ).value = `#${projectName}/${content.number}: ${content.subject}`;
  document.querySelector(
    "textarea[id=pull_request_body]"
  ).value = `* https://nhnent.dooray.com/popup/project/posts/${
    content.id
  }`;
}

function fillTitle() {
  let postNumberText = document.getElementsByClassName(
    "css-truncate css-truncate-target"
  )[8].textContent;

  let postNumber = postNumberText.split("/").pop().split("-").pop();

  chrome.runtime.sendMessage(
    {
      contentScriptQuery: 'fetchUrl',
      url: `https://nhnent.dooray.com/v2/wapi/projects/!${PROJECT_ID}/posts/${postNumber}`
    },
    response => applyDoorayInfo(response)
  );


  console.log("end send");
}

function appendButtonAndSelect(target) {
  let htmlIds = ["QFD1boxRNX4", "QFD1boxRNX5"];

  // button
  let previousButton = target.querySelector("button[id=" + htmlIds[0] + "]");
  if (previousButton) {
    return;
  }

  var copyButton = initButton(htmlIds[0], "자동완성", fillTitle);

  target.insertBefore(
    copyButton,
    target.firstChild
  );

  // selectbox
  let previousSelect = target.querySelector("select[id=" + htmlIds[1] + "]");
  if (previousSelect) {
    return;
  }

  var copySelect = initSelect(htmlIds[0], target, copyButton);
}


function checkAndAppendButton() {
  let targets = document.getElementsByClassName(
    "js-details-container Details js-compare-pr open"
  );
  for (let i = 0; i < targets.length; i++) {
    appendButtonAndSelect(targets[i]);
  }
}

console.log("loaded");

chrome.storage.local.get(DOORAY_PROJECT_ID_MAP_NAME, result => {
	const map = result[DOORAY_PROJECT_ID_MAP_NAME]
	if(map != null) {
		const list = Object.values(map)
		if(list != null && list.length > 0) {
			PROJECT_ID = list[0].id
			setInterval(() => {
			  checkAndAppendButton();
			}, 1000);
		}
	} else {
		console.log("두레이 프로젝트가 설정되어 있지 않네요. 아래 명령어처럼 좀 수정해서 추가해주세요~ ");
        console.log("바로 위의 Javascript Context는 Dooray Clipboard를 선택 먼저 해야 합니다. ");
		console.log("chrome.storage.local.set({doorayProjectIdMap: {1963480696738741170: { id: \"1963480696738741170\", text: \"클라우드프레임워크개발팀\" }, 2559256945165333868: { id: \"2559256945165333868\", text: \"tc-console\" }}}, () => console.log(\"saved\") )")
	}
})

