//Max and JP
import { useState } from "react";
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  Stack,
  Avatar,
  Alert,
  CircularProgress,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Divider
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {Link} from "react-router-dom";
import validator from "validator";
import { tryAddNewUser, tryLoginUser } from "./CustomerAuth";

function validateLogin(values) {
  const errors = {};
  if (!values.userName) errors.userName = "userName is required";
  if (!values.password) errors.password = "Password is required";
  return errors;
}

function validateRegister(values) {
  const errors = {};
  if (!values.customerName) errors.customerName = "Full name is required";
  if (!values.userName) errors.userName = "userName is required";
  if (!values.password) errors.password = "Password is required";
  else if (values.password.length < 8) errors.password = "Min 8 characters";
  if (!values.confirm) errors.confirm = "Password is required";
  else if (values.confirm !== values.password) errors.confirm = "Passwords do not match";
  return errors;
}



export default function CustomerLogin({
  onLogin, 
  onRegister, 
  initialValues,
}) {
  const [mode, setMode] = useState("login"); 
  const [values, setValues] = useState({
    customerName: "",
    userName: initialValues?.userName ?? "",
    password: "",
    confirm: "",
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");

    const nextErrors = mode === "login" ? validateLogin(values) : validateRegister(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    try {
      setSubmitting(true);
      if (mode === "login") {
        if (onLogin) await onLogin({ userName: values.userName.trim(), password: values.password });
        else{
          tryLoginUser(values.userName, values.password, setUserType)
          console.log("Login:", { userName: values.userName.trim() })}
      } else {
        const payload = {
          customerName: values.customerName.trim(),
          userName: values.userName.trim(),
          password: values.password,
        };
        if (onRegister) await onRegister(payload);
      else {
        tryAddNewUser(payload, setUserType);
        console.log("Registered:", payload)
      };
      }
    } catch (err) {
      setServerError(err?.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleClickShowPassword = () => setShowPassword((s) => !s);
  const handleMouseDownPassword = (e) => e.preventDefault();

  const isLogin = mode === "login";
  const title = isLogin ? "Login" : "Create account";

  return (
    <Box component="section" sx={{ display: "grid", placeItems: "center", py: 6 }}>
      <Paper elevation={2} sx={{ p: 4, width: "min(520px, 92vw)" }}>
        <Stack spacing={2} component="form" onSubmit={handleSubmit} noValidate>
          <Stack direction="row" spacing={2} alignItems="center" justifyContent="center" sx={{ mb: 1 }}>
            <Avatar sx={{ bgcolor: "primary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography variant="h5" fontWeight={700}>{title}</Typography>
          </Stack>

          {serverError ? <Alert severity="error">{serverError}</Alert> : null}

          

          {/* Register-only fields */}
          {!isLogin && (
            <>
              <TextField
                name="customerName"
                label="Full name"
                value={values.customerName}
                onChange={handleChange}
                error={!!errors.customerName}
                helperText={errors.customerName}
                autoComplete="name"
                fullWidth
                required
              />

            </>
          )}
          {/* Shared: userName */}
          <TextField
            name="userName"
            type="userName"
            label="userName"
            value={values.userName}
            onChange={handleChange}
            error={!!errors.userName}
            helperText={errors.userName}
            autoComplete="userName"
            fullWidth
            required
          />

          {/* Password */}
          <FormControl variant="outlined" fullWidth required>
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={values.password}
              onChange={handleChange}
              error={!!errors.password}
              autoComplete={isLogin ? "current-password" : "new-password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
            {errors.password && <Typography variant="caption" color="error">{errors.password}</Typography>}
          </FormControl>
            {!isLogin && (
                <>    
                <FormControl variant="outlined" fullWidth required>
                <InputLabel htmlFor="confirm">Confirm Password</InputLabel>
                <OutlinedInput
                  id="confirm"
                  name="confirm"
                  type={showPassword ? "text" : "password"}
                  value={values.confirm}
                  onChange={handleChange}
                  error={!!errors.confirm}
                  autoComplete="new-password"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Confirm Password"
                />
                {errors.confirm && <Typography variant="caption" color="error">{errors.confirm}</Typography>}
              </FormControl>
            </>
          )}

          <Button type="submit" onClick={handleSubmit} variant="contained" size="large" disabled={submitting}>
            {submitting ? (
              <Stack direction="row" spacing={1} alignItems="center">
                <CircularProgress size={20} />
                <span>{isLogin ? "Signing in…" : "Creating…"}</span>
              </Stack>
            ) : (
              isLogin ? "Login" : "Create account"
            )}
          </Button>

          {isLogin && (
            <>
            <Link to="/ForgotPassword">
              <Button type="button" size="small" > 
                  Forgot Password?
              </Button>
            </Link>

            <Divider sx={{ my: 2 }} />
            </>
          )}

          <Button type="button" size="small" onClick={() => setMode(isLogin ? "register" : "login")}> 
            {isLogin ? "Create an account" : "I already have an account"}
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}
