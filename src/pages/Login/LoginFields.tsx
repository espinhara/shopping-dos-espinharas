import { Button, TextField } from '@mui/material';
import { Field, useFormikContext } from 'formik';
import { LoginValues } from '../../interfaces/login';
const LoginFields = () => {
  const formik = useFormikContext<LoginValues>();

  if (!formik) {
    return null; // Ou qualquer fallback apropriado
  }

  const { errors, touched } = formik;

  return (
    <>

      <Field
        as={TextField}
        variant="outlined"
        margin="normal"
        fullWidth
        id="email"
        label="E-mail"
        name="email"
        autoComplete="email"
        autoFocus
        helperText={touched.email && errors.email ? errors.email : ""}
        error={touched.email && Boolean(errors.email)}
      />

      <Field
        as={TextField}
        variant="outlined"
        margin="normal"
        fullWidth
        id="password"
        label="Senha"
        name="password"
        type="password"
        autoComplete="current-password"
        helperText={touched.password && errors.password ? errors.password : ""}
        error={touched.password && Boolean(errors.password)}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        // disabled={isSubmitting}
        sx={{ mt: 3, mb: 2 }}
      >
        Entrar
      </Button>

    </>


  )
}
export default LoginFields;