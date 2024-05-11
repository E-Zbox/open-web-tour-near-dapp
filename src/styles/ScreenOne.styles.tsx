import styled from "styled-components";
// styles
import { Button } from "./Navbar.styles";

interface ITextInput {
  $showColor: boolean;
}

interface IScroller {
  $width: string;
}

interface IText {
  $color?: string;
  $fontWeight?: number;
}

export const MainScreen = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-top: 40px;
`;

export const MainTitle = styled.h3`
  font-size: 1.5rem;
`;

export const Span = styled.h5`
  font-size: 2rem;
  padding-left: var(--three-px);
`;

export const Card = styled.div`
  position: relative;
  min-height: 400px;
  width: 100%;
  padding: calc(var(--ten-px) * 2);
  border-radius: 10px;
  border: 1px solid #eee;
  margin-top: calc(var(--ten-px) * 4);

  * {
    margin-bottom: calc(var(--ten-px) * 1.5);
  }
`;

export const CardTitle = styled.h3`
  position: absolute;
  top: 0px;
  left: calc(var(--ten-px) * 3);
  font-size: 1.5rem;
  transform: translateY(-50%);
  padding: 0px calc(var(--ten-px) * 1);
  background-color: ${({
    theme: {
      colors: { bgColor },
    },
  }) => bgColor};
`;

export const ArgsText = styled.h3`
  font-size: 0.9rem;
  font-weight: bold;
`;

export const TextInput = styled.input<ITextInput>`
  height: 50px;
  width: 250px;
  border: none;
  border-bottom: 1px solid #eee;
  color: ${({
    $showColor,
    theme: {
      colors: { bgColor },
    },
  }) => ($showColor ? bgColor : "#ddd")};
  background-color: ${({
    $showColor,
    theme: {
      colors: { bgColor },
    },
  }) => ($showColor ? "#fff" : bgColor)};
  font-size: 0.95rem;
  outline: none;
  padding: var(--ten-px) calc(var(--ten-px) * 1.3);
  margin-right: calc(var(--ten-px) * 2);
`;

export const SubmitButton = styled(Button)`
  border-radius: 7px;
  margin-left: var(--ten-px);
  padding: var(--ten-px) calc(var(--ten-px) * 1.5);
  font-size: 0.95rem;
`;

export const MainOutput = styled.main`
  width: 100%;
  background-color: #fff4;
  border-radius: 3px;
  padding: calc(var(--ten-px) * 2) 0px;
`;

export const Scroller = styled.div<IScroller>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  height: fit-content;
  width: ${({ $width }) => $width};
  overflow: scroll hidden;
  flex-wrap: nowrap;
  margin-bottom: var(--ten-px);
  padding: calc(var(--ten-px) * 0.8) 0px;
`;

export const Text = styled.h3<IText>`
  color: ${({ $color }) => $color || "#fff"};
  font-size: 1.05rem;
  font-weight: ${({ $fontWeight }) => $fontWeight || 300};
  height: fit-content;
  width: fit-content;
  margin-bottom: 0px;
`;
