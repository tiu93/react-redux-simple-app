import React, { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { useFormik } from 'formik';
import * as yup from 'yup';
import useStyles from './styles';
import { signIn } from 'features/userSlice';
import history from 'appHistory';

const validationSchema = yup.object({
  userName: yup.string('Enter username').required('Username is required'),
  password: yup.string('Enter password').required('Password is required'),
});

const SignIn = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const userCredentials = useSelector((state) => state.user.userCredentials);
  const [authErr, setAuthErr] = useState(false);
  const FORM_FIELDS = useMemo(
    () => [
      {
        name: 'userName',
        label: `Username (${userCredentials.userName})`,
        type: 'text',
        autoComplete: 'userName',
      },
      {
        name: 'password',
        label: `Password (${userCredentials.password})`,
        type: 'password',
        autoComplete: 'current-password',
      },
    ],
    [userCredentials]
  );

  const auth = ({ userName, password }) => {
    if (
      userCredentials.userName === userName &&
      userCredentials.password === password
    ) {
      dispatch(signIn({ userName }));
      history.push('/main');
    } else {
      setAuthErr(true);
    }
  };

  const formik = useFormik({
    initialValues: {
      userName: userCredentials.userName,
      password: userCredentials.password,
    },
    validationSchema: validationSchema,
    onSubmit: auth,
  });

  return (
    <>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">Sign in</Typography>
        <form onSubmit={formik.handleSubmit} className={classes.form}>
          {FORM_FIELDS.map(({ name, type, label, autoComplete }) => (
            <TextField
              key={name}
              fullWidth
              type={type}
              label={label}
              margin="normal"
              name={name}
              variant="outlined"
              autoComplete={autoComplete}
              value={formik.values[name]}
              onChange={(e) => {
                setAuthErr(false);
                formik.handleChange(e);
              }}
              error={formik.touched[name] && Boolean(formik.errors[name])}
              helperText={formik.touched[name] && formik.errors[name]}
            />
          ))}
          {authErr && (
            <div className={classes.alert}>
              Username or password is not correct
            </div>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
        </form>
      </div>
    </>
  );
};

export default SignIn;
