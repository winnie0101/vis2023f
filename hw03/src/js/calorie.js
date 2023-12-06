const jsonUrl02 = '../json/AerobicData2.json';
let calorieIndex = 0;
let calorieData = null;

function loadjson() {
  fetch(jsonUrl02)
    .then(response => response.json())
    .then(data => {
      calorieData = data;
      updateCalorie()
    })
    .catch(error => console.error('Error fetching JSON:', error));
}

function setNextCalorieIdex() {
  if (calorieIndex < calorieData.length) {
    calorieIndex++;
    updateCalorie()
  } else {
    calorieIndex = 0;
  }
}

function updateCalorie() {
  const point = calorieData[calorieIndex];
  updateIconPosition(point.X, point.Y);
  updateInfo(point.Time, point.Floor, point.Distance, point.Calorie);
  console.log(point);
}

// 新增一個函數用來更新資訊
function updateInfo(time, floor, distance, calorie) {
  const timeInfo = document.getElementById('time-info');
  const distanceInfo = document.getElementById('distance-info');
  const calorieInfo = document.getElementById('calories-info');

  // 在這裡可以加上計算速度、卡路里等其他相關邏輯
  const speed = distance / time;

  timeInfo.textContent = `Time: ${time} seconds`;
  distanceInfo.textContent = `Distance: ${distance} meters`;
  calorieInfo.textContent = `Calories: ${calorie} calories`;

  // 這裡可以加上其他相關邏輯
}

// 初始加載icon位置
loadjson();

// 每秒更新一次位置
// setInterval(setNextCalorieIdex, 1000);