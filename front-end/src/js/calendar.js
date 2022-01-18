let lastScrollTop = 0
let today
let todayFullDate = ''
let year = 0
let month 
let thisHolidays = []
const monthList = ['January','February','March','April','May','June','July','August','September','October','November','December']
const leapYear=[31,29,31,30,31,30,31,31,30,31,30,31]
const notLeapYear=[31,28,31,30,31,30,31,31,30,31,30,31]
let schNo = 1
let draggingSchIdx
let weather

function init() {
    today = new Date()
    year = today.getFullYear()
    month = today.getMonth()
    day = today.getDate()

    drawCalendar()
}

function reset(){
    const $calendar = document.getElementById('calendar')
    let $nowDateOn = document.getElementsByClassName('date on')[0]
    if (!$calendar.contains(event.target)) {
        saveDeleteAllSch()
        resetColspan()
        removeSetLayer()
        if($nowDateOn!==undefined){
            $nowDateOn.classList.toggle('on')
        }
    }
}

function drawCalendar(){ // start of drawCalendar

    getHolidays(year)

    const todayYear = document.getElementById('today__year')
    const todayMonth = document.getElementById('today__month')
    const calendarDate = document.getElementById('calendar__date')

    let pageYear
    let weekCount = 0
    let firstDay = new Date(year, month, 1) // 이번달의 1일의 요일
    firstDay = firstDay.getDay() // 요일의 

    if(year%4==0){ //윤달
        pageYear = leapYear
    }else{
        pageYear = notLeapYear
    }

    if(firstDay==6&&pageYear[month]==30 || firstDay==6&&pageYear[month]==31){ // 토요일이 1일이고 그 달이 30,31일이면 6주, 
        weekCount = 6
    }else if(firstDay==5&&pageYear[month]==31){ // 금요일이 1일이고 그 달이 31일이면
        weekCount = 6
    }else if(firstDay==0&&pageYear==notLeapYear&&month==1){ // 윤달인데 2월이고 1일이 일요일이면 4주
        weekCount = 4
    }else{
        weekCount = 5
    }

    todayYear.innerHTML = year // 연도 넣기
    todayMonth.innerHTML = monthList[month] // 월 넣기
    let tempDay = 1 
    for(let i=0; i<weekCount; i++){
        let $tr = document.createElement('tr') 
        let lastMonthDay = 0
        let nextMonthDay = 1
        for(let j=0; j<7; j++){
            // 요일 인덱스보다 낮으면 빈태그를 넣기
            if(i==0&&j<firstDay){ // 1일이 시작하는 요일 전까지는 빈태그를 넣기
                let $td = document.createElement('td')
                let $span = document.createElement('span')
                if(month==0 && j==0){ // 1월일때
                    lastMonthDay = pageYear[11] - firstDay
                }else if(month!==0 && j==0){ // 1월아닐경우
                    lastMonthDay = pageYear[month-1] - firstDay
                }else{
                    lastMonthDay = lastMonthDay
                }                      
                $span.textContent = lastMonthDay+1
                $span.className = "lastMonth__date"
                $td.appendChild($span) 
                $tr.appendChild($td) 
                lastMonthDay++  
            }else if(tempDay>=pageYear[month]+1){ // 마지막날보다 크면 빈태그를 넣기
                let $td = document.createElement('td')
                let $span = document.createElement('span')
                $span.textContent = nextMonthDay
                $span.className = "nextMonth__date"
                $td.appendChild($span)
                $tr.appendChild($td) 
                nextMonthDay++ 
            }else{
                let $td = document.createElement('td')
                let $tdDiv = document.createElement('div') //날짜를 감싸는 div
                let $tdSpan = document.createElement('span') //날짜를 넣을 span
                // S: 날짜 아이디 추가를 위한 로직
                let idMonth = month+1
                let idDay = "" 
                idMonth = (idMonth<10) ? `0${idMonth}`: idMonth
                idDay =  (tempDay<10) ? `0${tempDay}` : tempDay
                let idName = `${ year }${ idMonth }${ idDay }`
                // E: 날짜 아이디 추가를 위한 로직
                $td.appendChild($tdDiv)
                $tdDiv.appendChild($tdSpan)  
                $tdSpan.textContent = tempDay                         
                $tdSpan.setAttribute("onclick","inputSchedule(this)")
                $tdDiv.className = "date__wrapper"
                $tdSpan.className = "date__text"
                $td.id = idName
                $td.setAttribute('ondrop','dropSchedule(event, this)')
                $td.setAttribute('ondragenter',"return false")
                $td.setAttribute('ondragover',"return false")
                $td.className += "date"
                $td.setAttribute("onclick", "toggleClassOn(this)")
                $tr.appendChild($td) 
                tempDay++
            }                        
        } 
        calendarDate.appendChild($tr) 
    }
    addHolidayClass()
    addBirthdays()
    addSchedules()
    addDataIdx()
    addTodayClass()
} // end of drawCalendar

function addTodayClass(){
    let todayNow = new Date()
    todayMonth = todayNow.getMonth()+1+""
    todayMonth = todayMonth.length < 2 ? "0"+todayMonth : todayMonth
    todayDate = todayNow.getDate()+""
    todayDate = todayDate.length < 2 ? "0"+todayDate : todayDate
    todayFullDate = todayNow.getFullYear()+""+todayMonth+""+todayDate
    let $today = document.getElementById(todayFullDate)
    if($today!==null){
        $today.classList.add('today')
    }
}

function addDataIdx(){
    const dayList = [1,2,3,4,5,6,7]
    dayList.map(function (day) {
        let daySelect = 'tr td:nth-child('+day+')'
        let $this = calendar.querySelectorAll(daySelect)
        $this = Object.values($this)
        $this.map(function(item){
            item.setAttribute("data-col-order", day)
        })
    })
}

function emptyCalendar() {
    const calendarDate = document.getElementById('calendar__date')
    while ( calendarDate.hasChildNodes() ) { 
        calendarDate.removeChild( calendarDate.firstChild ) 
    }
}

function drawTodayCalendar(){
    thisHolidays = []
    emptyCalendar()
    today = new Date()
    year = today.getFullYear()
    month = today.getMonth()
    day = today.getDate()
    resetAllColspan()
    drawCalendar() 
}

function drawPrevCalendar() {
    thisHolidays = []
    emptyCalendar()
    today = new Date(year, month-1)
    year = today.getFullYear()
    month = today.getMonth()
    // getHolidays()
    resetAllColspan()
    drawCalendar() 
}

function drawNextCalendar() {
    thisHolidays = []
    emptyCalendar()
    today = new Date(year, month+1)
    year = today.getFullYear()
    month = today.getMonth()
    // getHolidays()
    resetAllColspan()  
    drawCalendar() 
}

function resetAllColspan(){
    // 모든 colspan 제거하기
    let $td = document.querySelectorAll('td')
    $td = Object.values($td)
    $td.map(function(item){
        item.removeAttribute('colspan')
    })
    let $th = document.querySelectorAll('th')
    $th = Object.values($th)
    $th.map(function(item){
        item.removeAttribute('colspan')
    })
}

function resetColspan(){
    // .date.on의 colspan 제거하기
    let $dateOn = document.getElementsByClassName('date on')[0]
    if (typeof $dateOn == "undefined") {
        return
    }else{
        let colspanIdx = $dateOn.getAttribute('data-col-order')
        let tdText = 'tr td:nth-child(' + colspanIdx + ')'
        let $tdOnIdx = document.querySelectorAll(tdText)
        $tdOnIdx = Object.values($tdOnIdx)
        $tdOnIdx.map(function(item){
            item.removeAttribute('colspan')
        })
        let thText = 'tr th:nth-child(' + colspanIdx + ')'
        let $thOnIdx = document.querySelectorAll(thText)
        $thOnIdx = Object.values($thOnIdx)
        $thOnIdx.map(function(item){
            item.removeAttribute('colspan')
        })
    }
}

function toggleClassOn(elm){
    let $prevDateOn = document.getElementsByClassName('date on')
    if( $prevDateOn[0] !== undefined && $prevDateOn[0] !== null){
        resetColspan() 
        removeSetLayer()
        if(elm!==$prevDateOn[0]){
            saveDeleteAllSch()
        }     
        $prevDateOn[0].classList.toggle('on')
    }
    elm.classList.toggle('on')
    addColspan(elm)
}

function inputSchedule(elm){ // 스케쥴 넣기
    let id = elm.parentElement.parentElement.id
    let $idTag = document.getElementById(id)
    let schInput =  elm.parentElement.getElementsByClassName('schedule__input')
    if(schInput.length == 0){
        let $inputWrapper = document.createElement('div')
        let $input = document.createElement('input')
        $inputWrapper.className = "schedule__wrapper"
        $input.className = "schedule__input"
        // 엔터키를 입력하면 저장 및 삭제
        $input.setAttribute("onkeypress","javascript:if(event.keyCode==13){this.value==''?this.parentElement.remove():saveSchedule(this,'input')}")
        $idTag.children[0].appendChild($inputWrapper)
        $inputWrapper.appendChild($input)
        $input.focus()
    }else{
        schInput[0].focus()
    }
}

async function saveSchedule(elm, type){ // 스케쥴 저장하기
    let $schedule = document.createElement('div')
    let $scheduleText = document.createElement('span')
    let $scheduleTextBg = document.createElement('span')
    let $delete =  document.createElement('span')
    $schedule.className = "schedule__fixed border"
    $schedule.setAttribute("draggable","true")
    $schedule.setAttribute("oncontextmenu","setSchedule(this); return false")
    $scheduleText.className = "text"
    $scheduleTextBg.className = "textBg"
    $scheduleTextBg.style.background = elm.getAttribute('data-txtbgcolor')
    $scheduleText.textContent = elm.value
    $scheduleText.setAttribute("onclick","editThis(this)")
    $delete.className = "schedule__delete"
    $delete.textContent = "✖️"
    $delete.setAttribute("onclick","removeThis(this.parentElement)")
    elm.parentElement.appendChild($schedule)
    elm.parentElement.id = "sch__"+schNo
    elm.parentElement.setAttribute("draggable","true")
    elm.parentElement.setAttribute("ondragstart","dragSchedule(event, this)")
    elm.parentElement.setAttribute("oncontextmenu","setSchedule(this); return false")
    $schedule.appendChild($scheduleText)
    $schedule.appendChild($scheduleTextBg)
    $schedule.appendChild($delete)
    if(type=='edit' && elm.parentElement.parentElement.getElementsByClassName('schedule__wrapper').length>=1){
        // scheduleArr 수정 및 저장
            let thisSch = scheduleArr.find( item => item.idx == elm.parentElement.getAttribute('data-schedule-idx'))
            thisSch.text = elm.value
            await editSchedule(thisSch);
        // scheduleArr 수정 및 저장
    }else if(type=='input'){
        let tdId = elm.parentElement.parentElement.parentElement.id
        let tempObj = new Object()
        tempObj = {
            idx:scheduleArr.length, 
            year:Number(tdId.slice(0,4)), 
            month:Number(tdId.slice(4,6)), 
            day:Number(tdId.slice(6,9)), 
            text:elm.value, 
            textBgColor:"",
        }
        elm.parentElement.setAttribute("data-schedule-idx",scheduleArr.length)
        await addSchedule(tempObj);
        scheduleArr.push(tempObj)
    }
    elm.remove()
    schNo++

}

function removeSetLayer(){
    let prevSetLayer = document.getElementsByClassName('sch__setLayer')[0]
    if(prevSetLayer!==undefined){
        prevSetLayer.remove()
    }
}

function setSchedule(elm){
    event.preventDefault()
    toggleClassOn(elm.parentElement.parentElement)
    removeSetLayer()
    const $setLayer = document.createElement('div')
    const $setWrapper = document.createElement('div')
    const $setText = document.createElement('span')
    const $setColor =  document.createElement('span')
    $setColor.className="sch__setColor"
    $setText.className = "sch__setText"
    $setText.textContent = "Pick the color here!"
    $setWrapper.className = "sch__setWrapper"
    $setLayer.className = "sch__setLayer"
    $setWrapper.appendChild($setColor)
    $setWrapper.appendChild($setText)
    $setLayer.appendChild($setWrapper)
    elm.appendChild($setLayer)
    new Picker({
        parent: document.querySelector('.sch__setLayer'),
        popup: 'right',
        defaultColor: '#FFF',
    });
    $setLayer.setAttribute("onclick","changeColor(this)")
}

async function changeColor(elm){
    event.stopPropagation()
    let color = document.getElementsByClassName('picker_sample')[0].style.color
    let $setColor = document.getElementsByClassName('sch__setColor')[0]
    $setColor.style.backgroundImage = 'none'
    $setColor.style.background = color
    let textBg = elm.parentElement.getElementsByClassName('textBg')[0]
    textBg.style.background = color

    // scheduleArr 에 칼라 수정 및 저장
    let thisSch = scheduleArr.find( item => item.idx == elm.parentElement.getAttribute('data-schedule-idx'))
    thisSch.textBgColor = color
    // scheduleArr 에 칼라 수정 및 저장

    await editSchedule(thisSch)
}

function removeNowDateOn(){
    let $nowDateOn = document.getElementsByClassName('date on')[0]
    if($nowDateOn!==undefined){
        $nowDateOn.classList.toggle('on')
    }
}

function saveDeleteAllSch(){
    let $schWrapperArr = document.querySelectorAll('.schedule__wrapper .schedule__input')
    $schWrapperArr = Object.values($schWrapperArr)
    $schWrapperArr.map(function(item){
        item.value==''? item.parentElement.remove(): saveSchedule(item)
    })
}

function editThis(elm){ //스케쥴 수정하기
    let textBgColor;
    event.stopPropagation()
    removeNowDateOn()
    saveDeleteAllSch()
    removeSetLayer()
    elm.parentElement.parentElement.setAttribute('oncontextmenu','return false')
    let thisTd = elm.parentElement.parentElement.parentElement.parentElement
    thisTd.classList.add('on')
    resetAllColspan() 
    addColspan(thisTd)
    let val = elm.textContent
    let $schWrapper = elm.parentElement.parentElement
    let $dateWrapper = $schWrapper.parentElement
    if($dateWrapper.getElementsByClassName('schedule__input').length===0){
        let $input = document.createElement('input')
        $input.className = "schedule__input"
        $input.setAttribute("onkeypress","javascript:if(event.keyCode==13){this.value==''?this.parentElement.remove():saveSchedule(this, 'edit')}")
        $input.value = val
        $schWrapper.appendChild($input)
        $input.focus()
        saveHlColor(elm.parentElement)
        $input.setAttribute('data-txtBgColor',textBgColor)
        elm.parentElement.remove()
    }

    function saveHlColor(elm){
        let $textBg = elm.getElementsByClassName('textBg')[0]
        return textBgColor = $textBg.style.backgroundColor
    }
}

//colspan 추가하기
function addColspan(elm){
    let colspanIdx = elm.getAttribute('data-col-order')
    let tdText = 'tr td:nth-child('+ colspanIdx+')'
    let $tdOnIdx = document.querySelectorAll(tdText)
    $tdOnIdx = Object.values($tdOnIdx)
    $tdOnIdx.map(function(item){
        item.setAttribute("colspan", 2)
    })
    let thText = 'tr th:nth-child(' + colspanIdx + ')'
    let $thOnIdx = document.querySelectorAll(thText)
    $thOnIdx = Object.values($thOnIdx)
    $thOnIdx.map(function(item){
        item.setAttribute("colspan", 2)
    })
}

async function removeThis(elm){ // 스케쥴 remove
    event.stopPropagation()
    elm.parentElement.remove()
    let thisSch = scheduleArr.find(item => item.idx==elm.parentElement.getAttribute('data-schedule-idx'))
    scheduleArr.splice(scheduleArr.indexOf(thisSch),1)
    await deleteSchedule(elm.parentElement.getAttribute('data-schedule-idx'));
}

function dragSchedule(event, elm){
    event.dataTransfer.setData('Text', elm.id)
    draggingSchIdx = elm.getAttribute('data-schedule-idx')
}

async function dropSchedule(event, elm){
    let id = event.dataTransfer.getData('Text')
    elm.getElementsByClassName('date__wrapper')[0].appendChild(document.getElementById(id))
    // drop 한 뒤, schedule arr 수정 및 저장
    let thisSch = scheduleArr.find( item => item.idx == draggingSchIdx)
    thisSch.year = Number(elm.id.slice(0,4))
    thisSch.month = Number(elm.id.slice(4,6))
    thisSch.day = Number(elm.id.slice(6,9))
    // drop 한 뒤, schedule arr 수정 및 저장
    console.log(thisSch)
    await editSchedule(thisSch);
}

function addHolidayClass(){ // 맵으로 바꾸기
    thisHolidays.map(function(item){ 
        let $holiday = document.getElementById(item.date)
        if($holiday!==null && $holiday !== undefined && $holiday !== ''){
            $holiday.className = "date holiday"
            let $hdWrapper = document.createElement('span')
            if(item.name==""){
                $hdWrapper.className = "holiday__wrapper"
            }else{
                $hdWrapper.className = "holiday__wrapper highlight red"
            }
            let $hdName = document.createElement('span')
            $hdName.className = "holiday__name"
            $hdName.textContent = item.name
            $holiday.getElementsByClassName('date__wrapper')[0].appendChild($hdWrapper)
            $hdWrapper.appendChild($hdName)
        }
    })
}

function addBirthdays(){
    let bdResult = bdArr.map(function(item){ 
        if((month+1)==Number(item.month)){
            let thisBd = year + item.month + item.day
            let $thisBd = document.getElementById(thisBd)
            if($thisBd !== null){
                $thisBd = $thisBd.querySelector('.date__wrapper')
                let $bdWrapper = document.createElement('span')
                $bdWrapper.className = "birthday__wrapper highlight yellow"
                let $bdName = document.createElement('span')
                $bdName.className = "birthday"
                $bdName.textContent = item.name
                $thisBd.appendChild($bdWrapper)
                $bdWrapper.appendChild($bdName)
            }
        }
    })
} 

function addSchedules(){
    let filterSch = scheduleArr.filter( item => {
        return item.year == year && item.month == month+1
    })
    filterSch.map(function(item){
        let schMonth
        let schDay
        schMonth = (item.month<10) ? `0${item.month}`: item.month
        schDay = (item.day<10) ? `0${item.day}` : item.day
        let tempDate = item.year+""+schMonth+""+schDay
        let $schDate = document.getElementById(tempDate)
        let $schWrapper = document.createElement('div')
        let $schedule = document.createElement('div')
        let $scheduleText = document.createElement('span')
        let $scheduleTextBg = document.createElement('span')
        let $delete =  document.createElement('span')
        $schWrapper.className = "schedule__wrapper"
        $schWrapper.id = "sch__"+schNo
        $schWrapper.setAttribute("draggable","true")
        $schWrapper.setAttribute("ondragstart","dragSchedule(event, this)")
        $schWrapper.setAttribute("oncontextmenu","setSchedule(this); return false")
        $schWrapper.setAttribute("data-schedule-idx",item.idx)
        $schedule.className = "schedule__fixed border"
        $scheduleText.className = "text"
        $scheduleTextBg.className = "textBg"
        $scheduleTextBg.style.background = item.textBgColor
        $scheduleText.textContent = item.text
        $scheduleText.setAttribute("onclick","editThis(this)")
        $delete.className = "schedule__delete"
        $delete.textContent = "✖️"
        $delete.setAttribute("onclick","removeThis(this.parentElement)")
        $schDate.getElementsByClassName('date__wrapper')[0].appendChild($schWrapper)
        $schWrapper.appendChild($schedule)
        $schedule.appendChild($scheduleText)
        $schedule.appendChild($scheduleTextBg)
        $schedule.appendChild($delete)
        schNo++
    })
}

async function inputBdList(){ 
    const $iptBdTxt = document.getElementById('birthday__inputTxt') 
    const $iptBdMonth = document.getElementById('birthday__monthSelect') 
    const $iptBdDay = document.getElementById('birthday__daySelect')
    if ($iptBdTxt.value=='' || $iptBdMonth.value =='Month' || $iptBdDay.value=='Day' ){
        event.preventDefault()
        alert('빈칸은 No🙅‍♀️! 모두 입력해주세요.')
    }else{
        let tempObj = {
            idx:bdArr[bdArr.length-1].idx, 
            name:$iptBdTxt.value, 
            month:$iptBdMonth.value, 
            day:$iptBdDay.value>9?$iptBdDay.value:"0"+$iptBdDay.value
        }
        bdArr.push(tempObj);
        await addBirthday(tempObj);
        if((month+1)==Number($iptBdMonth.value)){    
            let tempDay = $iptBdDay.value>9?$iptBdDay.value:"0"+$iptBdDay.value
            let thisBd = year + $iptBdMonth.value + tempDay
            let $thisBd = document.getElementById(thisBd)
            if($thisBd !== null){
                $thisBd = $thisBd.querySelector('.date__wrapper')
                let $bdWrapper = document.createElement('span')
                $bdWrapper.className = "birthday__wrapper highlight yellow"
                let $bdName = document.createElement('span')
                $bdName.className = "birthday"
                $bdName.textContent = $iptBdTxt.value
                if($thisBd.getElementsByClassName('holiday__wrapper')[0] == undefined ){
                    $thisBd.getElementsByClassName('date__text')[0].insertAdjacentElement('afterend', $bdWrapper)
                }else{
                    $thisBd.getElementsByClassName('holiday__wrapper')[0].insertAdjacentElement('afterend', $bdWrapper)
                }
                $bdWrapper.appendChild($bdName)
            }
        }
        $iptBdTxt.value = ''
        $iptBdMonth.value = 'Month'
        $iptBdDay.value = 'Day'
    }
}

function drawDayOptions(elm){
    let doMonth = Number(elm.value)
    let doDayCnt = leapYear[doMonth-1]
    let $daySelect = document.getElementById('birthday__daySelect')
    for(let i=1; i<=doDayCnt; i++){
        let $dayOption = document.createElement('option')
        $dayOption.value = i
        $dayOption.textContent = i
        $daySelect.append($dayOption)
    }
}

setTimeout(() => {init()}, 350);