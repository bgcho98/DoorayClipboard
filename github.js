function initButton(id, buttonTitle, callbackFunc) {
  let button = document.createElement("button");
  button.id = id;
  button.textContent = buttonTitle;
  button.className = "btn btn-danger btn-sm";
  button.addEventListener("click", callbackFunc, false);
  return button;
}

function fillTitle() {
  let postNumberText = document.getElementsByClassName(
    "js-select-button css-truncate css-truncate-target"
  )[3].textContent;
  let postNumber = postNumberText.split("/")[1].split("-")[0];
  let api = `https://nhnent.dooray.com/v2/wapi/projects/!1963480696738741170/posts/${postNumber}`;
  console.log(api);

  var xhr = new XMLHttpRequest();
  xhr.open("GET", api, false);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        let response = JSON.parse(xhr.responseText);
        if (response.header.isSuccessful == false) {
          return;
        }

        let content = response.result.content;
        document.querySelector(
          "input[id=pull_request_title]"
        ).value = `#tc-클라우드개발팀/${content.number}: ${content.subject}`;
        document.querySelector(
          "textarea[id=pull_request_body]"
        ).value = `* https://nhnent.dooray.com/popup/project/posts/${
          content.id
        }`;
      } else {
        alert(xhr.responseText);
      }
    }
  };
  xhr.send();

  console.log("end send");
}

function appendButton(target) {
  let buttonIds = ["QFD1boxRNX4"];

  let previousButton = target.querySelector("button[id=" + buttonIds[0] + "]");
  if (previousButton) {
    return;
  }

  var copyButton = initButton(buttonIds[0], "자동완성", fillTitle);

  target.insertBefore(
    copyButton,
    document.getElementsByClassName("compare-pr-placeholder")[0]
  );
}

function checkAndAppendButton() {
  let targets = document.getElementsByClassName(
    "js-details-container Details compare-pr js-compare-pr open"
  );
  for (let i = 0; i < targets.length; i++) {
    appendButton(targets[i]);
  }
}

console.log("loaded");
setInterval(() => {
  checkAndAppendButton();
}, 1000);
