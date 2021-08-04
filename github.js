let PROJECT_ID = null;

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
  select.id = id;

  select.addEventListener("change", event => {
    chrome.storage.local.get("doorayProjectIdMap", result => {
		PROJECT_ID = result["doorayProjectIdMap"][event.target.value].id
	})
  }, false);

  var doorayProjectIdMap = {}
  chrome.storage.local.get("doorayProjectIdMap", result => {doorayProjectIdMap = result})
  var doorayProjectIdMap = {}
  chrome.storage.local.get("doorayProjectIdMap", result => {
	doorayProjectIdMap = result['doorayProjectIdMap'] || {}

	var doorayProjectIds = Object.values(doorayProjectIdMap);

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
  )[7].textContent;
  let postNumber = postNumberText.split("/")[1].split("-")[0];

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

chrome.storage.local.get("doorayProjectIdMap", result => {
	const map = result["doorayProjectIdMap"]
	if(map != null) {
		const list = Object.values(map)
		if(list != null && list.length > 0) {
			PROJECT_ID = list[0].id
			setInterval(() => {
			  checkAndAppendButton();
			}, 1000);
		}
	} else {
		console.log("no project is saved");
	}
})

