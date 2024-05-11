import React, { ChangeEvent, useEffect } from "react";
// config
import { HelloNearContract } from "@/config";
// store
import { useStore } from "@/app/layout";
import { useEventStore, useFormStore, useVoteStore } from "@/store";
// styles
import {
  Card,
  CardTitle,
  ArgsText,
  TextInput,
  SubmitButton,
  MainOutput,
  Scroller,
  Text,
} from "@/styles/ScreenOne.styles";
import { FlexContainer } from "@/styles/shared/Container.styles";
// utils
import { screens } from "@/utils/data";
import {
  ADD_EVENT_METHOD,
  ADD_VOTE_METHOD,
  GET_TOTAL_VOTES_METHOD,
  GET_TYPE,
  LIST_EVENTS_METHOD,
  PARENT_EVENT,
  PARENT_VOTE,
  RETURN_TYPE_ARRAY,
  RETURN_TYPE_STRING,
  SET_TYPE,
} from "@/utils/methods";
import { IRecord } from "@/store/interface";

// interface IProps {
//   cardTitle: string;
//   argsText: string;
// }

const LOCAL_STORAGE_EVENTS = "local_storage_events";

const LOCAL_STORAGE_TOTAL_VOTES = "local_storage_total_votes";

export default function () {
  const [eventState, setEventState] = useEventStore((store) => [
    store.state,
    store.setState,
  ]);

  const [formState, setFormState] = useFormStore((store) => [
    store.state,
    store.setState,
  ]);

  const [wallet] = useStore((store) => [store.wallet]);

  const [voteState, setVoteState] = useVoteStore((store) => [
    store.state,
    store.setState,
  ]);

  const { methods } = screens;

  const methodsKey = Object.getOwnPropertyNames(methods);

  const handleChange = ({ target: { name, value } }) => {
    setFormState({ [name]: value });
  };

  const getEvents = async () => {
    if (!wallet) {
      return;
    }
    const events = await wallet.viewMethod({
      contractId: HelloNearContract,
      method: LIST_EVENTS_METHOD,
    });

    // set a state in store with the newly acquired event
    if (events) {
      setEventState(events);
    }
    console.log(JSON.stringify(events));
  };

  const getVotes = async () => {
    if (!wallet) {
      return;
    }
    const totalVotes = await wallet.viewMethod({
      contractId: HelloNearContract,
      method: GET_TOTAL_VOTES_METHOD,
    });

    if (totalVotes) {
      setVoteState(totalVotes);
    }
  };

  const handleEventSubmit = async () => {
    let {
      input_description: description,
      input_estimated_budget: estimated_budget,
      input_title: title,
    } = formState;

    if (!description || !estimated_budget || !title) {
      alert("Some fields are missing for creating 'event'!");
      return;
    }

    estimated_budget = Number(estimated_budget);

    await wallet.callMethod({
      contractId: HelloNearContract,
      method: ADD_EVENT_METHOD,
      args: { description, estimated_budget, title },
    });

    await getEvents();
  };

  const handleVoteSubmit = async () => {
    let { input_id: id } = formState;

    if (!id) {
      alert("No id passed for adding 'vote'");
      return;
    }

    id = Number(id);

    await wallet.callMethod({
      contractId: HelloNearContract,
      method: ADD_VOTE_METHOD,
      args: { id },
    });
  };

  const renderChild = (
    { type, args, return_type, parentType },
    submitFunction,
    // : {
    //   type: string,
    //   args: IRecord[],
    //   return_type: string,
    // },
    index
  ) => {
    console.log({ type, args, return_type, parentType });
    if (type == SET_TYPE) {
      return (
        <>
          <FlexContainer key={index} $flexDirection="row" $flexWrap="wrap">
            {args.map(({ name, type }, argsIndex) => (
              <>
                <TextInput
                  key={name}
                  id={`input_${name}`}
                  name={`input_${name}`}
                  placeholder={`${name.substring(0, 1).toUpperCase()}${name
                    .substring(1)
                    .toLowerCase()
                    .replace("_", " ")}...`}
                  value={formState[`input_${name}`]}
                  onChange={handleChange}
                  type={type === "number" ? "number" : "text"}
                  $showColor={false}
                  required
                />

                {argsIndex == args.length - 1 ? (
                  <SubmitButton onClick={submitFunction}>Submit</SubmitButton>
                ) : (
                  <></>
                )}
              </>
            ))}
          </FlexContainer>
        </>
      );
    }
    if (type == GET_TYPE) {
      if (return_type == RETURN_TYPE_STRING && parentType == PARENT_VOTE) {
        return (
          <MainOutput>
            <FlexContainer
              $flexDirection="column"
              $alignItems="center"
              $justifyContent="center"
              $height="100%"
            >
              <Text>Total Votes</Text>
              <Text $color="#66ccee">{voteState}</Text>
            </FlexContainer>
          </MainOutput>
        );
      }
      if (return_type == RETURN_TYPE_ARRAY && parentType == PARENT_EVENT) {
        console.log("should print");
        return (
          <MainOutput>
            <FlexContainer $alignItems="center">
              <FlexContainer
                $flexDirection="row"
                $justifyContent="center"
                $backgroundColor="#0009"
                $padding="0px 0px 0px 10px"
              >
                <Scroller $width="200px">
                  <Text $color="#999" $fontWeight={700}>
                    Creator
                  </Text>
                </Scroller>
                <Scroller $width="200px">
                  <Text $color="#999" $fontWeight={700}>
                    Date
                  </Text>
                </Scroller>
                <Scroller $width="300px">
                  <Text $color="#999" $fontWeight={700}>
                    Title
                  </Text>
                </Scroller>
                <Scroller $width="150px">
                  <Text $color="#999" $fontWeight={700}>
                    Budget
                  </Text>
                </Scroller>
                <Scroller $width="400px">
                  <Text $color="#999" $fontWeight={700}>
                    Description
                  </Text>
                </Scroller>
                <Scroller $width="200px">
                  <Text $color="#999" $fontWeight={700}>
                    Total votes
                  </Text>
                </Scroller>
              </FlexContainer>
              {eventState.map(
                ({
                  creator,
                  created_at,
                  title,
                  estimated_budget,
                  total_votes,
                  description,
                  votes,
                }) => {
                  const date = new Date(created_at / 1_000_000);
                  const dateText = `${date.getDate()} / ${date.getMonth()} / ${date.getUTCFullYear()}`;

                  return (
                    <FlexContainer
                      $flexDirection="row"
                      $alignItems="center"
                      $backgroundColor="#0009"
                      $padding="0px 0px 0px 10px"
                    >
                      <Scroller $width="200px">
                        <Text>{creator}</Text>
                      </Scroller>
                      <Scroller $width="200px">
                        <Text>{dateText}</Text>
                      </Scroller>
                      <Scroller $width="300px">
                        <Text>{title}</Text>
                      </Scroller>
                      <Scroller $width="150px">
                        <Text>{estimated_budget}</Text>
                      </Scroller>
                      <Scroller $width="400px">
                        <Text>{description}</Text>
                      </Scroller>
                      <Scroller $width="200px">
                        <Text>{total_votes}</Text>
                      </Scroller>
                    </FlexContainer>
                  );
                }
              )}
            </FlexContainer>
          </MainOutput>
        );
      }
    }
  };

  useEffect(() => {
    let localStorageEventExists = localStorage.getItem(LOCAL_STORAGE_EVENTS);
    let localStorageTotalExists = localStorage.getItem(
      LOCAL_STORAGE_TOTAL_VOTES
    );

    if (localStorageEventExists) {
      setEventState(JSON.parse(localStorageEventExists));
    }

    if (localStorageTotalExists) {
      setVoteState(JSON.parse(localStorageTotalExists));
    }

    getEvents();
    getVotes();
  }, []);

  useEffect(() => {
    if (eventState.length > 0) {
      localStorage.setItem(LOCAL_STORAGE_EVENTS, JSON.stringify(eventState));
    }
  }, [eventState]);

  useEffect(() => {
    if (voteState > 0) {
      localStorage.setItem(
        LOCAL_STORAGE_TOTAL_VOTES,
        JSON.stringify(voteState)
      );
    }
  }, [voteState]);

  return methodsKey.map((key, index) => {
    switch (key) {
      case PARENT_EVENT: {
        let childMethodsKey = Object.getOwnPropertyNames(methods[PARENT_EVENT]);
        return (
          <Card key={key}>
            <CardTitle>Event</CardTitle>
            <ArgsText>Create Event</ArgsText>
            {childMethodsKey.map((childKey) => {
              const {
                type: childType,
                args,
                return_type,
              } = methods[PARENT_EVENT][childKey];

              return renderChild(
                {
                  type: childType,
                  args,
                  return_type,
                  parentType: PARENT_EVENT,
                },
                handleEventSubmit,
                index
              );
            })}
          </Card>
        );
      }
      case PARENT_VOTE: {
        let childMethodsKey = Object.getOwnPropertyNames(methods[PARENT_VOTE]);
        return (
          <Card key={key}>
            <CardTitle>Vote</CardTitle>
            <ArgsText>Create Vote</ArgsText>
            {childMethodsKey.map((childKey) => {
              const { type, args, return_type } =
                methods[PARENT_VOTE][childKey];

              return renderChild(
                { type, args, return_type, parentType: PARENT_VOTE },
                handleVoteSubmit,
                index
              );
            })}
          </Card>
        );
      }
      default:
        <></>;
    }
  });
  {
    /*<>
      <Card>
        <CardTitle>Event</CardTitle>
        <ArgsText>Create Event</ArgsText>
        <FlexContainer $flexDirection="row" $flexWrap="wrap">
          <TextInput
            id="input_event"
            name="input_event"
            placeholder="Enter Title"
            $showColor={false}
          />
          <TextInput
            id="input_event"
            name="input_event"
            placeholder="Enter budget"
            $showColor={false}
          />
          <TextInput
            id="input_event"
            name="input_event"
            placeholder="Enter Description"
            $showColor={false}
          />
        </FlexContainer>
        <SubmitButton>Submit</SubmitButton>
        <MainOutput></MainOutput>
      </Card>
  </>*/
  }
}
