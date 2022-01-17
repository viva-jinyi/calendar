const userId = 1;
const apiURL = 'http://localhost:5000';
const axiosConfig = {
  headers: {
  'Content-Type': 'application/json;charset=UTF-8',
  "Access-Control-Allow-Origin": "*",
  }
};

async function getBirthdays(user_id) {
  await axios.get(`${apiURL}/birthday/list/${user_id}`)
    .then((res) => {
      console.log(res.data)
      const lunar = res.data.filter(item => item.isLunar).map(day => {return Resut('entireDate',2021, day.month + day.day, day.name)});
      console.log(lunar)
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
  await axios.post(`${apiURL}/schedule/add`, {data: scheduleObj, userId: 1}, axiosConfig)
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