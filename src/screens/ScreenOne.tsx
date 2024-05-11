"use client";
import React from "react";
// components
import CardList from "@/components/CardList.jsx";
// styles
import {
  ArgsText,
  Card,
  CardTitle,
  MainOutput,
  MainScreen,
  MainTitle,
  Span,
  SubmitButton,
  TextInput,
} from "@/styles/ScreenOne.styles";
import { FlexContainer } from "@/styles/shared/Container.styles";

const ScreenOne = () => {
  return (
    <MainScreen>
      <FlexContainer $width="80%">
        <FlexContainer $flexDirection="row" $alignItems="center">
          <MainTitle>Let's call some contract methods</MainTitle>
          <Span>🤔</Span>
        </FlexContainer>
        <CardList />
      </FlexContainer>
    </MainScreen>
  );
};

export default ScreenOne;
