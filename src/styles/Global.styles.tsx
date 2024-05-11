import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    * {
        margin: 0px;
        padding: 0px;
        color: #EEE;
        font-family: "Nunito";
        font-size: 1.05rem;
        font-weight: 400;
        box-sizing: border-box;
        transition: 450ms linear;

        /** padding **/
        --three-px: 3px;
        --seven-px: 7px;
        --ten-px: 10px;

        b {
            font-weight: 900;
        }
    }

    body {
        width: 100%;
        background-color: #000;
    }
`;
