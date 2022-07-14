import React, { useEffect, useState } from "react";
import { Cookie, Open } from "../../assets";
import styled from "styled-components";
import axios from "axios";
import { randomIndex } from "../../utils/Random";

const Cookies = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [fortunes, setFortunes] = useState([]);
  const [fortune, setFortune] = useState("");

  const openHandler = async () => {
    setIsOpen(true);

    try {
      const response = await axios.get(
        "https://fortune-cookie-f6100-default-rtdb.firebaseio.com/fortunes.json"
      );
      const data = response.data;
      const loadedFortunes = [];
      for (const key in data) {
        loadedFortunes.push({
          id: key,
          text: data[key].text,
        });
      }
      setFortunes(loadedFortunes);
    } catch (error) {
      console.log(error);
    }
  };

  const delayOpen = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  };

  useEffect(() => {
    if (!isOpen) return;
    setFortune("loading...");

    const randomNumber = randomIndex(fortunes);
    let fortuneText = fortunes[randomNumber]?.text;

    if (fortuneText) {
      delayOpen().then(() => {
        setFortune(fortuneText);
      });
    }
  }, [isOpen, fortunes]);

  const retryHandler = () => {
    setIsOpen(false);
  };

  return (
    <Styles.Wrap>
      {isOpen && (
        <>
          <div>
            <Open />
          </div>
          <p>{fortune}</p>
          <button onClick={retryHandler}>다시 확인하기</button>
        </>
      )}
      {!isOpen && (
        <>
          <div>
            <Cookie onClick={openHandler} />
          </div>
          <h3>오늘의 운세를 확인하세요</h3>
        </>
      )}
    </Styles.Wrap>
  );
};

// styled
const Styles = {
  Wrap: styled.div`
    width: 100%;
    height: calc(100vh - 267px);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    div {
      cursor: pointer;
    }
    h3 {
      margin-top: 40px;
    }
    p {
      margin-bottom: 40px;
      max-width: 60%;
    }
    button {
      background-color: #fff;
      border: 1px solid #ddd;
      padding: 10px 20px;
      border-radius: 100px;
      cursor: pointer;
      transition: 0.3s;
      &:hover {
        background-color: #6d6d6d;
        color: #fff;
      }
    }
  `,
};

export default Cookies;
