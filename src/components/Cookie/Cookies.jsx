import React, { useEffect, useState } from "react";
import { Cookie, Open } from "../../assets";
import styled from "styled-components";
import axios from "axios";
import { randomIndex } from "../../utils/Random";

const Cookies = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fortunes, setFortunes] = useState([]);
  const [fortune, setFortune] = useState(null);

  // cookie open
  const openHandler = async () => {
    try {
      setIsOpen(true);
      setIsLoading(true);
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

      setTimeout(() => {
        setIsLoading(false);
        setFortunes(loadedFortunes);
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  // loading
  useEffect(() => {
    if (!fortunes.length) return;

    const randomNumber = randomIndex(fortunes);
    const fortuneText = fortunes[randomNumber]?.text;

    setFortune(fortuneText);
  }, [fortunes]);

  console.log(fortune);

  // retry
  const retryHandler = () => {
    setIsOpen(false);
    setFortune(null);
  };

  return (
    <Styles.Wrap>
      {!isOpen && (
        <>
          <Styles.Close>
            <Cookie onClick={openHandler} />
          </Styles.Close>
          <h3>오늘의 운세를 확인하세요</h3>
        </>
      )}
      {isOpen && (
        <>
          <Styles.Open>
            <Open />
          </Styles.Open>
          {isLoading ? <p>loading...</p> : <p>{fortune}</p>}
          <button onClick={retryHandler}>RETRY</button>
        </>
      )}
    </Styles.Wrap>
  );
};

// styled
const Styles = {
  Wrap: styled.div`
    width: 100%;
    height: 70vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    h3 {
      margin-top: 40px;
    }
    p {
      margin-bottom: 20px;
      max-width: 80%;
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
  Close: styled.div`
    cursor: pointer;
    svg {
      width: 60%;
    }
  `,
  Open: styled.div`
    cursor: default;
    margin-bottom: 20px;
    svg {
      width: 100%;
    }
  `,
};

export default Cookies;
