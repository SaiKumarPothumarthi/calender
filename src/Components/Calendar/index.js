import {Component} from "react"
import Form from "../Form"
import "./index.css"

const monthsList = [
    {id:1,month: "Janauary"},
    {id:2,month: "February"},
    {id:3,month: "March"},
    {id:4,month: "April"},
    {id:5,month: "May"},
    {id:6,month: "June"},
    {id:7,month: "July"},
    {id:8,month: "August"},
    {id:9,month: "Septenber"},
    {id:10,month: "October"},
    {id:11,month: "November"},
    {id:12,month: "December"},
]

const weekNames = [
    {id:"w1",name:"Sun"},
    {id:"w2",name:"Mon"},
    {id:"w3",name:"Tue"},
    {id:"w4",name:"Wed"},
    {id:"w5",name:"Thu"},
    {id:"w6",name:"Fri"},
    {id:"w7",name:"Sat"},
]

let eventsData = [
  
]

class Calendar extends Component{
    state = {
        selectedWeek : "Week",
        startDate: 1,
        endDate:7,
        monthName:monthsList[0].month,
        Year: 2023,
        date: "",
        eventsData
    }

    

    handleWeekChange = (event) => {
        const selectedWeek = event.target.value
       const { startDate, endDate } = this.calculateDateRange(selectedWeek);

        this.setState({
        selectedWeek,
        startDate,
        endDate,
        });
    }

    calculateDateRange = (selectedWeek) => {
        let startDate, endDate;


        const { monthName,Year } = this.state;

        const daysInMonth =
        monthName === "February" && Year % 4 === 0 && (Year % 100 !== 0 || Year % 400 === 0)
        ? 29
        : new Date(Year, monthsList.findIndex((m) => m.month === monthName) + 1, 0).getDate();

    
        switch (selectedWeek) {
          case "Week 1":
            startDate = 1;
            endDate = 7;
            break;
          case "Week 2":
            startDate = 8;
            endDate = 14;
            break;
          case "Week 3":
            startDate = 15;
            endDate = 21;
            break;
          case "Week 4":
            startDate = 22;
            endDate = 30;
            break;
          case "Week":
            startDate = 1;
            endDate = 7;
            break;
          default:
            startDate = 22;
            endDate = 30;
            break;
        }
    
        return {
          startDate,
          endDate,
          daysInMonth
        };
      };

      onClickForward = () => {
    const { selectedWeek, endDate } = this.state;
    const { daysInMonth } = this.calculateDateRange(selectedWeek);

    let newStartDate = endDate + 1;
    let newEndDate = endDate + 7;

    if (newStartDate <= daysInMonth) {
      if (newEndDate > daysInMonth) {
        newEndDate = daysInMonth;
      }

      this.setState({
        startDate: newStartDate,
        endDate: newEndDate,
      });
    }
  };
    
      onClickBackward = () => {
        const { startDate, endDate } = this.state;
    
        const newStartDate = Math.max(startDate - 7, 1);
        const newEndDate = Math.max(endDate - 7, 7);
    
        if (newStartDate >= 1) {
          this.setState({
            startDate: newStartDate,
            endDate: newEndDate,
          });
        }
      };

      changeYear = (amount) => {
        const { Year } = this.state;
        const newYear = Year + amount;
        this.setState({ Year: newYear });
      };
      
      changeMonth = (amount) => {
        const { monthName } = this.state;
        const currentMonthIndex = monthsList.findIndex((m) => m.month === monthName);
        const newMonthIndex = (currentMonthIndex + amount + 12) % 12; 
        const newMonthName = monthsList[newMonthIndex].month;
        this.setState({ monthName: newMonthName });
      };

      addEvent = (event) => {
        const { eventsData } = this.state;
        eventsData.push(event);
        this.setState({ eventsData });
      };

    render(){
        const {selectedWeek,startDate,endDate,monthName,Year} = this.state
        
        const dateRange = [];
        for (let day = startDate; day <= endDate; day++) {
          dateRange.push(day);
        }

        return(
          <>
            <div className="app-container">
                <div className="header-container">
                    <h1 className="heading">Timeline</h1>
                    <div className="button-container">
                        <select className="weekDropdown" value={selectedWeek} onChange={this.handleWeekChange}>
                            <option value="Week">Week</option>
                            <option value="Week 1">Week 1</option>
                            <option value="Week 2">Week 2</option>
                            <option value="Week 3">Week 3</option>
                            <option value="week 4">Week 4</option>
                        </select>
                        <div className="date-range">
                            <p className="date">{startDate}</p>
                            <p>-</p>
                            <p className="date">{endDate}</p>
                            <p className="month">{monthName}</p>
                            <p className="year">{Year}</p>
                        </div>
                        <button className="buttonEle" type="button" onClick={this.onClickBackward}>
                            &lt; 
                        </button>
                        <button className="buttonEle" type="button" onClick={this.onClickForward}>
                            &gt;
                        </button>
                    </div>
                    <div className="year-buttons">
                      <button className="buttonEle" type="button" onClick={() => this.changeYear(-1)}>
                        &lt;
                      </button>
                      <span className="current-year">{Year}</span>
                      <button className="buttonEle" type="button" onClick={() => this.changeYear(1)}>
                        &gt;
                      </button>
                      <button className="buttonEle" type="button" onClick={() => this.changeMonth(-1)}>
                        &lt;
                      </button>
                      <span className="current-month">{monthName}</span>
                      <button className="buttonEle" type="button" onClick={() => this.changeMonth(1)}>
                        &gt;
                      </button>
                    </div>
                </div>
                <div className="date-slide">
                    <ul className="list-container">
                        {weekNames.map((item,index) => (
                            <li className="list-item">
                                <p className="week-name">{item.name}</p>
                                <p className="date-num">{dateRange[index]}</p>
                            </li>
                        ))}
                    </ul>
                </div>
                
            </div>
            <div className="event-con">
                  <div className="form-alignment">
                  <Form addEvent={this.addEvent}/>
                  </div>
                  
                  <div className="event-timeline">
                    {dateRange.map((day) => {
                      const eventsForDay = eventsData.filter((event) => event.date === day);
                      return (
                        <div key={day} className="day-events">
                          {eventsForDay.map((event, index) => (
                            <div
                              key={index}
                              className="event-box"
                              style={{ backgroundColor: event.color }}
                            >
                              <p className="event-data-styles">
                                {event.title}
                              </p> 
                              <p className="event-data-styles">
                                {event.date}
                              </p>
                              <p className="event-data-styles">
                                {event.time}
                              </p>
                            </div>
                          ))}
                        </div>
                      );
                    })}
                  </div>

              </div>
            </>
        )
    }
}

export default Calendar