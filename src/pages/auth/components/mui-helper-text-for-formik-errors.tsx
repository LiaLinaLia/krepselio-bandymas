import React from 'react';
import { FormikErrors, FormikTouched } from 'formik';
import { styled } from '@mui/material';

type MuiHelperTextForFormikErrorsComponent = <
  T extends { [x: string]: string | string[] | FormikErrors<T>[] },
>
  (props: {
    touched?: FormikTouched<T>[],
    errors?: string | string[] | FormikErrors<T>[]
  }) => JSX.Element;

const isStringArr = (
  errors: any[] | string[],
): errors is string[] => (errors as string[]).every((error) => typeof error === 'string');

const ErrorMsgRow = styled('span')({ display: 'block' });

const MuiHelperTextForArrayOfFormikErrors: MuiHelperTextForFormikErrorsComponent = ({
  touched,
  errors,
}) => {
  // undefined -> undefined
  if (touched === undefined || errors === undefined) return <ErrorMsgRow />;

  // string -> string
  if (typeof errors === 'string') {
    return <ErrorMsgRow>{errors}</ErrorMsgRow>;
  }

  // string[] -> React.ReactNode
  if (isStringArr(errors)) {
    return (
      <>
        {errors.map((categoryString) => (
          <ErrorMsgRow key={categoryString}>{categoryString}</ErrorMsgRow>
        ))}
      </>
    );
  }

  // FormikErrors<Type>[] - -> React.ReactNode
  return (
    <>
      {errors.map((props) => {
        const childErrors = Object.values(props);

        return (
          <ErrorMsgRow key={`${childErrors.join('_')}`}>
            <MuiHelperTextForArrayOfFormikErrors
              touched={[]}
              errors={childErrors}
            />
          </ErrorMsgRow>
        );
      })}
    </>
  );
};

export default MuiHelperTextForArrayOfFormikErrors;
