import React, { useState, useEffect } from "react";
import styles from "./Timer.module.css";

import { fromEvent } from "rxjs";
import { timeInterval } from "rxjs/operators";

import Button from "../Buttons/Button";

const Timer = () => {
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [sec, setSec] = useState(0); //count all seconds amount from the start

  useEffect(() => {
    if (isTimerRunning) {
      const interval = setInterval(() => {
        setSec((seconds) => seconds + 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isTimerRunning]);

  const clickHandler = (event) => {
    switch (event.target.name) {
      case "Start/Stop":
        setIsTimerRunning(!isTimerRunning);
        break;

      case "Wait":
        fromEvent(event.target, "mousedown")
          .pipe(timeInterval())
          .subscribe((i) => {
            if (i.interval < 300) {
              setIsTimerRunning(false);
            }
          });
        break;

      case "Reset":
        setSec(0);
        break;

      default:
        break;
    }
  };

  let H = Math.floor(sec / 3600); //count how much hours in our state sec
  let M = Math.floor((sec - H * 3600) / 60); //count how much minutes in our state sec
  let S = Math.floor(sec - H * 3600 - M * 60); //count how much seconds in our state sec
  if (M < 10) {
    M = 0 + M.toString(); //add 0 before value, if value contains only 1 digit
  }
  if (S < 10) {
    S = 0 + S.toString(); //add 0 before value, if value contains only 1 digit
  }

  return (
    <div className={styles.Timer}>
      <div className={styles.TimerValues}> {`${H}:${M}:${S}`}</div>
      <div className={styles.TimerButtons}>
        <Button name="Start/Stop" clickHandler={clickHandler} />
        <Button name="Wait" clickHandler={clickHandler} />
        <Button name="Reset" clickHandler={clickHandler} />
      </div>
    </div>
  );
};

export default Timer;
