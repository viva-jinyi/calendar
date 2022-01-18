const apiURL = 'http://localhost:5000';
const axiosConfig = {
  headers: {
  'Content-Type': 'application/json;charset=UTF-8',
  "Access-Control-Allow-Origin": "*",
  }
};

async function login(email, pwd) {
  console.log("here")
  const email = document.getElementById("email").value;
  const pwd = document.getElementById("password").value;
  await axios.post(`${apiURL}/users/login`, {data: {email: email, password: pwd}}, axiosConfig)
    .then((res) => {
      return res;
    })
    .catch((err) => {
    console.log("AXIOS ERROR: ", err);
    })
}

async function getBirthdays(user_id) {
  await axios.get(`${apiURL}/birthday/list/${user_id}`)
    .then((res) => {
      const lunar = res.data.filter(item => item.isLunar).map(day => {return Resut('entireDate',2021, day.month + day.day, day.name)});
      bdArr = res.data;
    })
    .catch((err) => {
      console.log("AXIOS ERROR: ", err);
    })
}

async function addBirthday(birthdayObj) {
  await axios.post(`${apiURL}/birthday/add`, {data: birthdayObj, userId: 1}, axiosConfig)
    .then((res) => {
      return res;
    })
    .catch((err) => {
    console.log("AXIOS ERROR: ", err);
    })
}

async function getSchedules(user_id) {
  await axios.get(`${apiURL}/schedule/list/${user_id}`)
    .then((res) => {
      scheduleArr = res.data;
    })
    .catch((err) => {
      console.log("AXIOS ERROR: ", err);
    })
}

async function addSchedule(scheduleObj) {
  await axios.post(`${apiURL}/schedule/add`, {data: scheduleObj, userId: userId}, axiosConfig)
    .then((res) => {
      return res;
    })
    .catch((err) => {
    console.log("AXIOS ERROR: ", err);
    })
}

async function deleteSchedule(scheduleIdx) {
  await axios.delete(`${apiURL}/schedule/delete`, {data: {userId: userId, scheduleIdx: scheduleIdx}}, axiosConfig)
    .then((res) => {
      return res;
    })
    .catch((err) => {
    console.log("AXIOS ERROR: ", err);
    })
}

async function editSchedule(scheduleObj) {
  await axios.put(`${apiURL}/schedule/edit`, {data: {userId: userId, scheduleObj: scheduleObj}}, axiosConfig)
    .then((res) => {
      return res;
    })
    .catch((err) => {
    console.log("AXIOS ERROR: ", err);
    })
}

async function fetchData() {
  await getSchedules(userId);
  await getBirthdays(userId);
}

fetchData();