const STORAGE_KEY = 'doorayProjectIdMap'

const BUTTON_IDS = {
  number: 'QFD1boxRNX0',
  taskId: 'QFD1boxRNX4',
  commit: 'QFD1boxRNX1',
  pullRequest: 'QFD1boxRNX2',
  deleteProject: 'QFD1boxRNX3'
}

const TASK_DETAIL_SELECTORS = [
  '#task-detail-default',
  '#modal-container > div > div > div > div > div > div',
  '#root > div.css-16sjwg7 > div'
]

const NOTIFICATION_POSITION = 'nfc-top-right'
const NOTIFICATION_DURATION = 3000

function showNotification({ title, message, theme = 'info' }) {
  let container = document.querySelector('.' + NOTIFICATION_POSITION)
  if (!container) {
    container = document.createElement('div')
    container.classList.add('ncf-container', NOTIFICATION_POSITION)
    document.body.appendChild(container)
  }

  const notification = document.createElement('div')
  notification.classList.add('ncf', theme)

  if (title) {
    const titleEl = document.createElement('p')
    titleEl.classList.add('ncf-title')
    titleEl.innerText = title
    notification.appendChild(titleEl)
  }
  if (message) {
    const messageEl = document.createElement('p')
    messageEl.classList.add('nfc-message')
    messageEl.innerText = message
    notification.appendChild(messageEl)
  }

  const dismiss = () => {
    if (notification.parentNode === container) container.removeChild(notification)
    if (container.querySelectorAll('.ncf').length === 0 && container.parentNode) {
      document.body.removeChild(container)
    }
  }

  const timer = setTimeout(dismiss, NOTIFICATION_DURATION)
  notification.addEventListener('click', () => {
    clearTimeout(timer)
    dismiss()
  })

  container.appendChild(notification)
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    showNotification({ title: '클립보드 COPY', message: text })
  })
}

function getProjectMap() {
  return new Promise(resolve => {
    chrome.storage.local.get(STORAGE_KEY, result => resolve(result[STORAGE_KEY] || {}))
  })
}

async function saveProject(project) {
  const map = await getProjectMap()
  map[project.id] = project
  chrome.storage.local.set({ [STORAGE_KEY]: map })
}

async function deleteProject(projectId) {
  const map = await getProjectMap()
  delete map[projectId]
  chrome.storage.local.set({ [STORAGE_KEY]: map })
}

const ICONS = {
  hash: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M8.39 12.648a1.32 1.32 0 0 0-.015.18c0 .305.21.508.5.508.266 0 .492-.172.555-.477l.554-2.703h1.204c.421 0 .617-.234.617-.547 0-.312-.188-.53-.617-.53h-.985l.516-2.524h1.265c.43 0 .618-.227.618-.547 0-.313-.188-.524-.618-.524h-1.046l.476-2.304a1.06 1.06 0 0 0 .016-.164.51.51 0 0 0-.516-.516.54.54 0 0 0-.539.43l-.523 2.554H7.617l.477-2.304c.008-.04.015-.118.015-.164a.512.512 0 0 0-.523-.516.539.539 0 0 0-.531.43L6.53 5.484H5.414c-.43 0-.617.22-.617.532 0 .312.187.539.617.539h.906l-.515 2.523H4.609c-.421 0-.609.219-.609.531 0 .313.188.547.61.547h.976l-.516 2.492c-.008.04-.015.125-.015.18 0 .305.21.508.5.508.265 0 .492-.172.554-.477l.555-2.703h2.242l-.515 2.492zm-1-3.562l.515-2.523h2.242l-.515 2.523H7.39z"/></svg>',
  tag: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M1 7.775V2.75C1 1.784 1.784 1 2.75 1h5.025c.464 0 .91.184 1.238.513l6.25 6.25a1.75 1.75 0 0 1 0 2.474l-5.026 5.026a1.75 1.75 0 0 1-2.474 0l-6.25-6.25A1.75 1.75 0 0 1 1 7.775Zm1.5 0c0 .066.026.13.073.177l6.25 6.25a.25.25 0 0 0 .354 0l5.025-5.025a.25.25 0 0 0 0-.354l-6.25-6.25a.25.25 0 0 0-.177-.073H2.75a.25.25 0 0 0-.25.25ZM6 5a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z"/></svg>',
  commit: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M11.93 8.5a4.002 4.002 0 0 1-7.86 0H.75a.75.75 0 0 1 0-1.5h3.32a4.002 4.002 0 0 1 7.86 0h3.32a.75.75 0 0 1 0 1.5Zm-1.43-.75a2.5 2.5 0 1 0-5 0 2.5 2.5 0 0 0 5 0Z"/></svg>',
  pullRequest: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M1.5 3.25a2.25 2.25 0 1 1 3 2.122v5.256a2.251 2.251 0 1 1-1.5 0V5.372A2.25 2.25 0 0 1 1.5 3.25Zm5.677-.177L9.573.677A.25.25 0 0 1 10 .854V2.5h1A2.5 2.5 0 0 1 13.5 5v5.628a2.251 2.251 0 1 1-1.5 0V5a1 1 0 0 0-1-1h-1v1.646a.25.25 0 0 1-.427.177L7.177 3.427a.25.25 0 0 1 0-.354ZM3.75 2.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm0 9.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm8.25.75a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0Z"/></svg>',
  trash: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M11 1.75V3h2.25a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1 0-1.5H5V1.75C5 .784 5.784 0 6.75 0h2.5C10.216 0 11 .784 11 1.75zM4.496 6.675l.66 6.6a.25.25 0 0 0 .249.225h5.19a.25.25 0 0 0 .249-.225l.66-6.6a.75.75 0 0 1 1.492.149l-.66 6.6A1.748 1.748 0 0 1 10.595 15h-5.19a1.75 1.75 0 0 1-1.741-1.575l-.66-6.6a.75.75 0 1 1 1.492-.15zM6.5 1.75V3h3V1.75a.25.25 0 0 0-.25-.25h-2.5a.25.25 0 0 0-.25.25z"/></svg>',
  pullRequestTrash: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><g fill="currentColor"><path d="M1.5 3.25a2.25 2.25 0 1 1 3 2.122v5.256a2.251 2.251 0 1 1-1.5 0V5.372A2.25 2.25 0 0 1 1.5 3.25Zm5.677-.177L9.573.677A.25.25 0 0 1 10 .854V2.5h1A2.5 2.5 0 0 1 13.5 5v5.628a2.251 2.251 0 1 1-1.5 0V5a1 1 0 0 0-1-1h-1v1.646a.25.25 0 0 1-.427.177L7.177 3.427a.25.25 0 0 1 0-.354ZM3.75 2.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm0 9.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm8.25.75a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0Z"/></g><g stroke="#e02828" stroke-width="1.6" stroke-linecap="round"><line x1="2" y1="2" x2="14" y2="14"/><line x1="14" y1="2" x2="2" y2="14"/></g></svg>'
}

function createButton({ id, icon, title, onClick }) {
  const button = document.createElement('div')
  button.id = id
  button.className = 'css-d7aocq dooray-clipboard-button'
  button.setAttribute('role', 'button')
  button.setAttribute('tabindex', '0')
  button.innerHTML = icon
  button.addEventListener('click', onClick, false)
  attachTooltip(button, title)
  return button
}

function attachTooltip(element, text) {
  let tooltip = null
  let showTimer = null

  const show = () => {
    tooltip = document.createElement('div')
    tooltip.className = 'dooray-clipboard-tooltip'
    tooltip.textContent = text
    document.body.appendChild(tooltip)

    const rect = element.getBoundingClientRect()
    tooltip.style.top = `${rect.bottom + 6}px`
    tooltip.style.left = `${rect.left + rect.width / 2}px`
  }

  const hide = () => {
    clearTimeout(showTimer)
    if (tooltip) {
      tooltip.remove()
      tooltip = null
    }
  }

  element.addEventListener('mouseenter', () => {
    showTimer = setTimeout(show, 400)
  })
  element.addEventListener('mouseleave', hide)
  element.addEventListener('click', hide)
}

function injectButtonStyle() {
  const styleId = 'dooray-clipboard-button-style'
  if (document.getElementById(styleId)) return
  const style = document.createElement('style')
  style.id = styleId
  style.textContent = `
    .dooray-clipboard-button {
      width: 28px !important;
      padding: 0 !important;
      margin: 0 !important;
      display: inline-flex !important;
      align-items: center !important;
      justify-content: center !important;
      color: #555 !important;
      position: relative !important;
    }
    .dooray-clipboard-button + .dooray-clipboard-button {
      margin-left: -6px !important;
    }
    .dooray-clipboard-tooltip {
      position: fixed;
      transform: translateX(-50%);
      background: #333;
      color: #fff;
      padding: 5px 8px;
      border-radius: 3px;
      font-size: 12px;
      line-height: 1.4;
      white-space: nowrap;
      z-index: 999999;
      pointer-events: none;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
    }
  `
  document.head.appendChild(style)
}

injectButtonStyle()

function readTaskInfo(target) {
  const info = target.querySelector('div[data-task-extension="detail-header"]')
  if (!info) return null

  const title = info.getAttribute('data-subject')
  const postNumber = info.getAttribute('data-task-number')
  if (!title || !postNumber) return null

  return {
    title,
    postNumber,
    taskId: info.getAttribute('data-task-id'),
    projectName: info.getAttribute('data-project-code'),
    projectId: info.getAttribute('data-project-id')
  }
}

function removeExistingButtons(target, buttonBar) {
  Object.values(BUTTON_IDS).forEach(id => {
    const button = target.querySelector(`#${id}`)
    if (button && button.parentNode === buttonBar) buttonBar.removeChild(button)
  })
}

async function appendButton(target) {
  const task = readTaskInfo(target)
  if (!task) return

  const previousNumberButton = target.querySelector(`#${BUTTON_IDS.number}`)
  if (previousNumberButton && previousNumberButton.dataset.postNumber === task.postNumber) return

  const buttonBar = target.querySelector('div[role="navigation"][data-not-print="true"]')
  if (!buttonBar) return

  if (previousNumberButton) removeExistingButtons(target, buttonBar)

  const firstButton = buttonBar.firstChild

  const numberButton = createButton({
    id: BUTTON_IDS.number,
    icon: ICONS.hash,
    title: `업무 번호 복사 (${task.postNumber})`,
    onClick: () => copyToClipboard(task.postNumber)
  })
  numberButton.dataset.postNumber = task.postNumber

  const taskIdButton = createButton({
    id: BUTTON_IDS.taskId,
    icon: ICONS.tag,
    title: '업무 ID 복사',
    onClick: () => copyToClipboard(task.taskId)
  })

  const commitButton = createButton({
    id: BUTTON_IDS.commit,
    icon: ICONS.commit,
    title: '커밋 메시지 복사',
    onClick: () => copyToClipboard(`${task.postNumber} ${task.title}`)
  })

  const pullRequestButton = createButton({
    id: BUTTON_IDS.pullRequest,
    icon: ICONS.pullRequest,
    title: 'PR 메시지 복사 + GitHub PR 프로젝트 선택 목록에 추가',
    onClick: () => {
      saveProject({ id: task.projectId, text: task.projectName })
      copyToClipboard(`#${task.projectName}/${task.postNumber}: ${task.title}`)
    }
  })

  buttonBar.insertBefore(numberButton, firstButton)
  buttonBar.insertBefore(taskIdButton, firstButton)
  buttonBar.insertBefore(commitButton, firstButton)
  buttonBar.insertBefore(pullRequestButton, firstButton)

  await appendDeleteProjectButton({ buttonBar, firstButton, task })
}

async function appendDeleteProjectButton({ buttonBar, firstButton, task }) {
  const map = await getProjectMap()
  if (!map[task.projectId]) return

  const button = createButton({
    id: BUTTON_IDS.deleteProject,
    icon: ICONS.pullRequestTrash,
    title: 'GitHub PR 프로젝트 선택 목록에서 제거',
    onClick: async () => {
      await deleteProject(task.projectId)
      showNotification({ title: 'Chrome Storage 삭제', message: task.projectId })
      if (button.parentNode === buttonBar) buttonBar.removeChild(button)
    }
  })

  buttonBar.insertBefore(button, firstButton)
}

function checkAndAppendButton() {
  TASK_DETAIL_SELECTORS
    .map(selector => document.querySelector(selector))
    .filter(target => target != null)
    .forEach(appendButton)
}

setInterval(checkAndAppendButton, 1000)
