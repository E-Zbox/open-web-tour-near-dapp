import styled from "styled-components";

interface IFlexContainer {
  $flexDirection?: string;
  $justifyContent?: string;
  $alignItems?: string;
  $flexWrap?: string;
  $height?: string;
  $width?: string;
  $padding?: string;
  $backgroundColor?: string;
}

export const FlexContainer = styled.div<IFlexContainer>`
  display: flex;
  flex-direction: ${({ $flexDirection }) => $flexDirection || "column"};
  justify-content: ${({ $justifyContent }) => $justifyContent || "flex-start"};
  align-items: ${({ $alignItems }) => $alignItems || "flex-start"};
  height: ${({ $height }) => $height || "100%"};
  width: ${({ $width }) => $width || "100%"};
  flex-wrap: ${({ $flexWrap }) => $flexWrap || "nowrap"};
  padding: ${({ $padding }) => $padding || ""};
  background-color: ${({ $backgroundColor }) =>
    $backgroundColor || "transparent"};
`;
