import styled from "styled-components";

export const MainNav = styled.main`
  width: 100%;
  height: 80px;
  background: linear-gradient(to right bottom, #fffc, #000);
  padding: 0px calc(var(--ten-px) * 1.5);
`;

export const MainTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 700;
  color: #222;
  padding: 0px calc(var(--seven-px) * 1.3);
`;

export const Button = styled.div`
  width: fit-content;
  padding: calc(var(--ten-px) * 1.5) calc(var(--ten-px) * 2);
  border-radius: 30px;
  border: 1px solid
    ${({
      theme: {
        colors: { blue01 },
      },
    }) => blue01};
  cursor: pointer;

  &:hover {
    background-color: ${({
      theme: {
        colors: { blue01 },
      },
    }) => blue01};
    color: #eee;

    b {
      color: #ddd;
    }
  }
`;
