const icon = document.getElementById('icon');
const grid = document.getElementById('grid');
const jsonUrl = '../json/userLocationData.json';
const traceContainer = document.getElementById('trace-container'); // 假設有一個元素用於容納移動痕跡
let currentIndex = 0;
let currentFloor = '1F'; // 新增 currentFloor 變數
let jsonDataList = [];
let currentPoint = {};

function calculatePosition(x, y) {
  const minX = 10.45;
  const maxX = 60.47;
  const minY = -11.64;
  const maxY = 15.91;

  const iconX = ((x - minX) / (maxX - minX)) * 100;
  const iconY = ((y - minY) / (maxY - minY)) * 100;
  
  return { x: iconX, y: iconY };
}

function updateIconPosition(x, y) {
  const { x: iconX, y: iconY } = calculatePosition(x, y);
  const X = grid.offsetWidth * (iconX /100)
  const Y = grid.offsetHeight * (iconY /100)

  if (currentFloor === '2F') {
    X = X + grid.offsetWidth/2;
  }
  else if (currentFloor === '3F') {
    X = X + grid.offsetWidth/2;
    Y = Y + grid.offsetHeight/2;
  }
  else if (currentFloor === '4F') {
    Y = Y + grid.offsetHeight/2;
  }

  icon.style.left = `${X}px`;
  icon.style.top = `${Y}px`;

  // 繪製移動痕跡
  const tracePoint = document.createElement('div');
  tracePoint.className = 'trace-point';
  tracePoint.style.left = `${X}px`;
  tracePoint.style.top = `${Y}px`;
  traceContainer.appendChild(tracePoint);
}

function loadjson() {
  fetch(jsonUrl)
    .then(response => response.json())
    .then(data => {
      if (data && data.dataList.length > 0) {
        jsonDataList = data.dataList;
        setCurrentPoint()
      }
    })
    .catch(error => console.error('Error fetching or parsing JSON:', error));
}

function setCurrentPoint() {
  if(currentIndex >= jsonDataList.length) {
    currentIndex = 0;
  }
  currentPoint = jsonDataList[currentIndex];

  if (currentPoint.Floor !== currentFloor) {
    // 換樓層時的處理，這裡可以添加你的樓層切換相關邏輯
    console.log(`Switched to Floor ${currentPoint.Floor}`);
    currentFloor = currentPoint.Floor;
  }

  updateIconPosition(currentPoint.X, currentPoint.Y);
  currentIndex++;

  // 如果資料到達末尾，重新從頭開始
  if (currentIndex >= jsonDataList.length) {
    currentIndex = 0;
  }
}

function setNextPoint() {
  currentIndex++;
  setCurrentPoint()
}

// 初始加載 icon 位置
loadjson();

// 每秒更新一次位置
setInterval(setNextPoint, 100);