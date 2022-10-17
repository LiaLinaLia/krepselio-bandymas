import * as React from 'react';
import {
  TextField,
  Autocomplete,
  Box,
  CircularProgress,
} from '@mui/material';
import CheckboxGroup, { CheckboxOption } from 'components/form-controls/checkbox-group';
import CategoriesService from 'services/categories-service';
import MarketingIntrestsService from 'services/marketing-intrests-service';
import { useFormik } from 'formik';
import * as yup from 'yup';
import AuthService from 'services/auth-service';
import debounce from 'helpers/debounce';
import config from 'config';
import AuthForm from './components/auth-form';
import MuiHelperTextForArrayOfFormikErrors from './components/mui-helper-text-for-formik-errors';

const categoryToCheckboxOption = ({ id, title }: Category): CheckboxOption => ({
  value: id,
  label: title,
});

const checkboxOptionToCategory = ({ value, label }: CheckboxOption): Category => ({
  id: value,
  title: label,
});

const marketingIntrestToCheckboxOption = ({ id, title }: MarketingIntrest): CheckboxOption => ({
  value: id,
  label: title,
});

const checkboxOptionToMarketingIntrest = ({ value, label }: CheckboxOption): MarketingIntrest => ({
  id: value,
  title: label,
});

type RegisterValues = {
  email: string,
  password: string,
  passwordConfirmation: string,
  categories: CheckboxOption[],
  marketingIntrests: CheckboxOption[],
};

type RegisterFormData = {
  email: string,
  password: string,
  passwordConfirmation: string,
  categories: Category[],
  marketingIntrests: MarketingIntrest[],
};

const validationSchema = yup.object({
  email: yup.string()
  .required('paštas privalomas')
  .email('neteisingas pašto formatas'),
  password: yup.string()
    .required('slaptažodis privalomas')
    .min(8, 'mažiausiai 8 simboliai')
    .matches(/[a-z]/, 'nors viena mažoji raidė')
    .matches(/[A-Z]/, 'Nors viena didžioji raidė')
    .matches(/\d/, 'nors vienas skaičius')
    .matches(/[@$!%*?&]/, 'nors vienas specialus simbolis'),
  passwordConfirmation: yup.string()
    .required('slaptažodis privalomas')
    .oneOf([yup.ref('password')], 'Slaptažodžiai nesutampa'),
  categories: yup.array(yup.object({
    value: yup.string().required('privaloma'),
    label: yup.string().required('privaloma'),
  }))
    .required()
    .min(1, 'Pasirinkite mažiausiai 1 kategoriją'),
  marketingIntrests: yup.array(yup.object({
     value: yup.string().required('privaloma'),
     label: yup.string().required('privaloma'),
  })),
});

const EMAIL_TAKEN_ERROR_MSG = 'el. paštas užimtas';

const RegisterPage: React.FC = () => {
  const [categoriesOptions, setCategoriesOptions] = React.useState<CheckboxOption[]>([]);
  const [intrestsOptions, setIntrestsOptions] = React.useState<CheckboxOption[]>([]);
  const [emailTaken, setEmailTaken] = React.useState<boolean>(false);
  const [emailIsBeingCheck, setEmailIsBeingCheck] = React.useState<boolean>(false);

  const {
    values, touched, errors, isValid, dirty,
    handleChange, handleBlur, setFieldValue, handleSubmit,
  } = useFormik<RegisterValues>({
    initialValues: {
      email: '',
      password: '',
      passwordConfirmation: '',
      categories: [],
      marketingIntrests: [],
    },
    onSubmit({ categories, marketingIntrests, ...formikValues }) {
      const formData: RegisterFormData = {
        ...formikValues,
        categories: categories.map(checkboxOptionToCategory),
        marketingIntrests: marketingIntrests.map(checkboxOptionToMarketingIntrest),
      };

      console.log('Siunčiama registracija į serverį:', formData);
    },
    validationSchema,
  });

  const triggedDebouncedEmailValidation = debounce(async (email: string) => {
    const emailAvailable = await AuthService.demoCheckEmail(email);
    setEmailIsBeingCheck(false);
    setEmailTaken(!emailAvailable);
  }, config.userInputDelay);

  React.useEffect(() => {
    (async () => {
      const [
        fetchedCategories,
        fetchedMatketingIntrests,
      ] = await Promise.all([
        CategoriesService.fetchMany(),
        MarketingIntrestsService.fetchMany(),
      ]);
      const formatedIntrests = fetchedMatketingIntrests.map(marketingIntrestToCheckboxOption);

      setCategoriesOptions(fetchedCategories.map(categoryToCheckboxOption));
      setIntrestsOptions(formatedIntrests);
      setFieldValue('marketingIntrests', formatedIntrests);
    })();
  }, []);

  return (
    <AuthForm
      title="Registracija"
      submitText="Registruotis"
      onSubmit={handleSubmit}
      isValid={dirty && isValid && !emailTaken && !emailIsBeingCheck}
    >
      <TextField
        name="email"
        variant="filled"
        label="El. paštas"
        type="email"
        value={values.email}
        onChange={(e) => {
          const newEmail = e.target.value;
          setEmailIsBeingCheck(true);
          setFieldValue('email', newEmail);
          triggedDebouncedEmailValidation(newEmail);
        }}
        InputProps={(emailIsBeingCheck && {
          endAdornment: <Box sx={{ mt: 1 }}><CircularProgress size={30} /></Box>,
        }) || undefined}
        onBlur={handleBlur}
        error={touched.email && (Boolean(errors.email) || emailTaken)}
        helperText={touched.email && (errors.email || (emailTaken && EMAIL_TAKEN_ERROR_MSG))}
      />
      <TextField
        name="password"
        variant="filled"
        label="Slaptažodis"
        type="password"
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.password && Boolean(errors.password)}
        helperText={touched.password && errors.password}
      />
      <TextField
        name="passwordConfirmation"
        variant="filled"
        label="Slaptažodžio pakartojimas"
        type="password"
        value={values.passwordConfirmation}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.passwordConfirmation && Boolean(errors.passwordConfirmation)}
        helperText={touched.passwordConfirmation && errors.passwordConfirmation}
      />
      <Autocomplete
        options={categoriesOptions}
        multiple
        value={values.categories}
        onChange={(_event, newCategories) => setFieldValue('categories', newCategories, true)}
        renderInput={(inputProps) => (
          <TextField
            {...inputProps}
            label="Dominančios kategorijos"
            name="categories"
            variant="filled"
            onBlur={handleBlur}
            error={touched.categories && Boolean(errors.categories)}
            helperText={(
              <MuiHelperTextForArrayOfFormikErrors
                touched={touched.categories}
                errors={errors.categories}
              />
            )}
          />
        )}
      />
      <CheckboxGroup
        label="Dominančios reklamos"
        name="marketingIntrests"
        options={intrestsOptions}
        value={values.marketingIntrests}
        onChange={(_event, newIntrests) => setFieldValue('marketingIntrests', newIntrests, true)}
        error={touched.marketingIntrests && Boolean(errors.marketingIntrests)}
        onBlur={handleBlur}
        helperText={(
          <MuiHelperTextForArrayOfFormikErrors
            touched={touched.marketingIntrests}
            errors={errors.marketingIntrests}
          />
        )}
      />
    </AuthForm>
  );
};

export default RegisterPage;
