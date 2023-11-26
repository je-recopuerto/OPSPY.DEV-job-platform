'use client'

import {useState} from "react";
import {Button, Card, Datepicker, Label, TextInput} from "flowbite-react";
import {setOnboarding} from "@/app/actions";
import {OnboardProps} from "../../../types/props";
import {HiArrowRight} from "react-icons/hi";
import {onboardingSchema} from "@/schemas/onboardingSchema";
import {ZodError, ZodIssue} from "zod";

type PageProps = {
  state: OnboardProps,
  setState: (o: OnboardProps) => void,
  validate: () => void,
  moveNext: () => void,
  submit: () => Promise<void>
}

export default function OnboardingCard() {
  const [page, setPage] = useState(1)
  const [errors, setErrors] = useState<ZodIssue[]>([])
  const [state, setState] = useState<OnboardProps>({
    firstName: "",
    lastName: "",
    dateOfBirth: new Date(),
  } as OnboardProps);

  function validate(): ZodIssue[] {
    console.log("Validating")
    try {
      onboardingSchema.parse(state);
    } catch (e) {
      if (e instanceof ZodError) {
        return e.errors;
      }
    }

    return [];
  }

  const moveNext = () => {
    const validationErrors = validate()
    setErrors(validationErrors)

    if (validationErrors.length === 0) {
      setPage(page + 1)
    }
  }

  return (
    <Card className="format lg:format-md max-w-2xl m-auto">
      <p className="text-2xl font-semibold text-gray-900 dark:text-white">Let&rsquo;s get started!</p>

      <ul>
        {errors?.map((error) => {
          return (
            <li key={error.code}>{error.message}</li>
          )
        })}
      </ul>

      {page === 1 && <PageOne
        state={state}
        validate={validate}
        setState={setState}
        moveNext={moveNext}
        submit={() => setOnboarding(state)}
      />}

      {page === 2 && <PageTwo
        state={state}
        validate={validate}
        setState={setState}
        moveNext={moveNext}
        submit={() => setOnboarding(state)}/>}
    </Card>
  )
}

function PageOne(props: PageProps) {
  return (
    <>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email1" value="First name"/>
        </div>
        <TextInput
          id="email1"
          type="text"
          placeholder="Bob"
          value={props.state.firstName}
          onChange={(e) => props.setState({
            ...props.state,
            firstName: e.target.value
          })}
          required/>
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="email1" value="Last name"/>
        </div>
        <TextInput
          id="email1"
          type="text"
          placeholder="Smith"
          value={props.state.lastName}
          onChange={(e) => props.setState({
            ...props.state,
            lastName: e.target.value
          })}
          required/>
      </div>

      <div>
        <div className="mb-1 block">
          <Label htmlFor="email1" value="Date of birth"/>
        </div>

        <Datepicker
          onSelectedDateChanged={(e) => props.setState({
            ...props.state,
            dateOfBirth: e
          })}
        />
      </div>

      <div className="flex flex-row gap-2 justify-end">
        {/*<Button onClick={() => props.moveNext()}>Next</Button>*/}
        <Button onClick={() => props.submit()}>
          Next

          <HiArrowRight className="ml-2" />
        </Button>
      </div>
    </>
  )
}

function PageTwo(props: PageProps) {
  return (
    <>Hello!</>
  )
}