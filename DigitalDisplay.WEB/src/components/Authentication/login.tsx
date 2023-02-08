import { Button, FormControl, Grid, InputAdornment, Paper, TextField, Typography } from "@mui/material";
import { FC, useState } from "react";
import { useNavigate } from "react-router";
import { LoginUser } from "../../models/user";
import { loginUser } from "../../services/auth";

export const Login: FC = () => {
    const errorMessages = {
        empty: 'Empty field!',
    };
    const [emailErrorText, setEmailErrorText] = useState<string>('');
    const [passwordErrorText, setPasswordErrorText] = useState<string>('');

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();

    const checkErrors = () => {
        let flag = true;
        if (email.length === 0) {
            setEmailErrorText(errorMessages.empty);
            flag = false;
        }
        if (password.length === 0) {
            setPasswordErrorText(errorMessages.empty);
            flag = false;
        }
        return flag;
    };
    const isErrored = (errorMessage: string) => {
        return errorMessage !== '';
    };

    const savePanelInfo = async () => {

        console.log(email);
        console.log(password);


        const user: LoginUser = {
            email: email,
            password: password
        };

        const token = await loginUser(user);
        navigate('/Home');

    };
    const formStyle = {
        width: '70%',
        margin: '10px auto',
        padding: '20px',
    };
    return (
        <Grid container spacing={2} component={Paper} sx={formStyle}>
            <Grid item xs={12}>
                <Typography variant="h5">Login into account</Typography>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth>
                    <TextField
                        variant="standard"
                        id="email"
                        label="Email"
                        required
                        onChange={(e) => {
                            const emailInput = e.target.value.trim();
                            setEmail(emailInput);
                        }}
                        error={isErrored(emailErrorText)}
                        helperText={isErrored(emailErrorText) ? emailErrorText : ''}
                    />
                </FormControl>
                <FormControl fullWidth>
                    <TextField
                        id="standard-password-input"
                        label="Password"
                        type="password"
                        required
                        autoComplete="current-password"
                        variant="standard"
                        onChange={(e) => {
                            const passInput = e.target.value.trim();
                            setPassword(passInput);
                        }}
                        error={isErrored(passwordErrorText)}
                        helperText={isErrored(passwordErrorText) ? passwordErrorText : ''}
                    />
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <Button
                    variant="contained"
                    color="success"
                    type="submit"
                    onClick={() => {
                        if (checkErrors()) {
                            savePanelInfo();
                        }
                    }}
                >
                    Submit
                </Button>
            </Grid>
        </Grid>
    );
};