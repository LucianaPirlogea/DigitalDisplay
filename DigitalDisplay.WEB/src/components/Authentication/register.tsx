import { Button, FormControl, Grid, InputAdornment, Paper, TextField, Typography } from "@mui/material";
import { FC, useState } from "react";
import { useNavigate } from "react-router";
import { RegisterUser } from "../../models/user";
import { registerUser } from "../../services/auth";

export const Register: FC = () => {
    const errorMessages = {
        empty: 'Empty field!',
    };
    const [firstNameErrorText, setFirstNameErrorText] = useState<string>('');
    const [lastNameErrorText, setLastNameErrorText] = useState<string>('');
    const [emailErrorText, setEmailErrorText] = useState<string>('');
    const [passwordErrorText, setPasswordErrorText] = useState<string>('');

    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();

    const checkErrors = () => {
        let flag = true;
        if (firstName.length === 0) {
            setFirstNameErrorText(errorMessages.empty);
            flag = false;
        }
        if (lastName.length === 0) {
            setLastNameErrorText(errorMessages.empty);
            flag = false;
        }
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
        const user: RegisterUser = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        };

        await registerUser(user);
        navigate('/Login');
    };
    const formStyle = {
        width: '70%',
        margin: '10px auto',
        padding: '20px',
    };
    return (
        <Grid container spacing={2} component={Paper} sx={formStyle}>
            <Grid item xs={12}>
                <Typography variant="h5">Create an account</Typography>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth>
                    <TextField
                        variant="standard"
                        id="firstName"
                        label="First Name"
                        required
                        onChange={(e) => {
                            const firstNameInput = e.target.value.trim();
                            setFirstName(firstNameInput);
                        }}
                        error={isErrored(firstNameErrorText)}
                        helperText={isErrored(firstNameErrorText) ? firstNameErrorText : ''}
                    />
                </FormControl>
                <FormControl fullWidth>
                    <TextField
                        variant="standard"
                        id="lastName"
                        label="Last Name"
                        required
                        onChange={(e) => {
                            const lastNameInput = e.target.value.trim();
                            setLastName(lastNameInput);
                        }}
                        error={isErrored(lastNameErrorText)}
                        helperText={isErrored(lastNameErrorText) ? lastNameErrorText : ''}
                    />
                </FormControl>
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