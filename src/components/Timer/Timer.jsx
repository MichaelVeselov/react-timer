import classes from './Timer.module.css';

import { useState, useEffect, useRef } from 'react';
import Button from '../UI/button/Button';

const setCounterInitialValue = () => {
  const userCount = localStorage.getItem('count');
  return userCount ? Number(userCount) : 0;
};

function Timer() {
  const [count, setCount] = useState(setCounterInitialValue);
  const [isCounting, setCounting] = useState(false);

  const timerIdRef = useRef(null);

  const onClickStart = () => {
    setCounting(true);
  };

  const onClickStop = () => {
    setCounting(false);
  };

  const onClickReset = () => {
    setCount(0);
    setCounting(false);
  };

  useEffect(() => {
    localStorage.setItem('count', count);
  }, [count]);

  useEffect(() => {
    if (isCounting) {
      timerIdRef.current = setInterval(() => {
        setCount((count) => count + 1);
      }, 1000);
    }

    return () => {
      timerIdRef.current && clearInterval(timerIdRef.current);
      timerIdRef.current = null;
    };
  }, [isCounting]);

  return (
    <div>
      <h2 className={classes.title}>Timer:</h2>
      <h2 className={classes.counter}>{count}</h2>
      {!isCounting ? (
        <Button onClick={onClickStart} feature={'start'}>
          Start
        </Button>
      ) : (
        <Button onClick={onClickStop} feature={'stop'}>
          Stop
        </Button>
      )}
      <Button onClick={onClickReset} feature={'reset'}>
        Reset
      </Button>
    </div>
  );
}

export default Timer;
