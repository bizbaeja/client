import { useState, useEffect } from "react";
import axios from "../api/axios";
import styled from "styled-components";

function Board() {
  const storeId = window.location.pathname.split("/")[3];
  const CORPORATION_URL = `${process.env.REACT_APP_BASE_URL}/popups/search/${storeId}`;
  const [corporationData, setCorporationData] = useState([]);

  useEffect(() => {
    axios
      .get(CORPORATION_URL)
      .then((response) => {
        setCorporationData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [CORPORATION_URL]);
  console.log(corporationData);

  const corporationItems = (
    <>
      <img src={corporationItems.image} alt="corporation" />
      <span>{corporationData.contents}</span>
    </>
  );
  return <Wrap>{corporationItems}</Wrap>;
}

export default Board;

const Wrap = styled.div`
  position: absolute;
  display: flex;
  width: 600px;
  height: 300px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;

  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  left: 50%;
  transform: translate(-50%);
  top: 120%;
  margin: 40px 0px;
`;
