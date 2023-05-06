import React, { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import { useContext } from "react";
import { QuizContext } from "../contexts/QuizProvider";
import axios from 'axios';
import '../Home.css';


const Home = () => {
  const [shikenKubuns, setShikenKubuns] = useState([]);
  const [shikenDays, setShikenDays] = useState([]);
  const [dayKubuns, setDayKubuns] = useState([]);


  const [shiken_kubun, set_shiken_kubun] = useState("");
  const [shiken_day, set_shiken_day] = useState("");
  const [day_kubun, set_day_kubun] = useState("");


  const shikenKubunEl = useRef();
  const shikenDayEl = useRef();
  const dayKubunEl = useRef();

  const [quizState] = useContext(QuizContext);


  const onChange_shiken_kubun = (event) => {
    const value = event.target.value;
    set_shiken_kubun(value);
  };

  const onChange_shiken_day = (event) => {
    const value = event.target.value;
    set_shiken_day(value);
  };

  const onChange_day_kubun = (event) => {
    const value = event.target.value;
    set_day_kubun(value);
  };

  useEffect(async () => {
    const getShikenKubuns = async () => {
      const response = await axios.get('http://localhost:5000/api/get_shiken_kubuns');
      //console.log(response.data)
      return response.data;
    };

    const getShikenDays = async (shiken_kubun) => {
      const response = await axios.get('http://localhost:5000/api/get_shiken_days',{params: {shiken_kubun: shiken_kubun}});
      //console.log(response.data)
      return response.data;
    };

    const getDayKubuns = async (shiken_kubun, shiken_day) => {
      const response = await axios.get('http://localhost:5000/api/get_shiken_day_kubuns',{params: {shiken_kubun: shiken_kubun, shiken_day: shiken_day,}});
      //console.log(response.data)
      return response.data;
    };


    const shiken_kubuns = await getShikenKubuns();              //全試験区分
    //console.log("shiken_kubuns:", shiken_kubuns);
    const shiken_days = await getShikenDays(shiken_kubuns[0]); //最初の試験区分で全試験日
    //console.log("shiken_days:", shiken_days);
    const day_kubuns = await getDayKubuns(shiken_kubuns[0], shiken_days[0]?.shiken_day);    //最初試験日の最初時間区分
    //console.log("day_kubuns:", day_kubuns);

    setShikenKubuns(shiken_kubuns);
    setShikenDays(shiken_days);
    setDayKubuns(day_kubuns);

    set_shiken_kubun(shiken_kubuns[0]);
    set_shiken_day(shiken_days[0]?.shiken_day);
    set_day_kubun(day_kubuns[0]);
    //console.log(quizState);

  },[]);

  return (
    <>
      <div className="container">
        <div className="row">
          <label htmlFor="shikenKubun">試験区分:</label>
          <select id="shikenKubun" className="combo" ref={shikenKubunEl} onChange={onChange_shiken_kubun}>
            {shikenKubuns.map((shikenKubun, index) => {
              return <option value={shikenKubun} key={index}>{shikenKubun}</option>
            })}
          </select>
        </div>

        <div className="row">
          <label htmlFor="shikenDay">試験日:　</label>
          <select id="shikenDay" className="combo" ref={shikenDayEl} onChange={onChange_shiken_day}>
            {shikenDays.map( (shikenDay, index) => {
              return <option value={shikenDay.shiken_day} key={index}>{shikenDay.wareki}</option>
            })}
          </select>
        </div>

        <div className="row">
          <label htmlFor="dayKubun">時間区分:</label>
          <select id="dayKubun" className="combo" ref={dayKubunEl} onChange={onChange_day_kubun}>
            {dayKubuns.map( (dayKubun, index) => {
              return <option value={dayKubun} key={index}>{dayKubun}</option>
            })}
          </select>
        </div>

        <div className="row">
          <Link to="/Quiz"  state={{ "shiken_kubun": shiken_kubun, "shiken_day" : shiken_day, "day_kubun" : day_kubun }}>
            <button className="btn">テスト開始</button>
          </Link>
        </div>

      </div>
    </>
  );
}

export default Home;
