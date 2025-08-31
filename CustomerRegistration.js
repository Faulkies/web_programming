import {Box, FormLabel, FormControl, FormGroup, FormControlLabel,
        TextField, Button, RadioGroup, Radio, Typography, Rating, OutlinedInput} from '@mui/material';
import { useState } from 'react';


    
    const CustomerRegistration = () => {
        const [value, setValue] =  useState(2);

        return (
            <Box display="flex" justifyContent="center">
                <Box
                    width={300}
                    alignItems="center"
                    sx=
                    {{
                        '.MuiTextField-root, .MuiFormControl-root': { m: 1, ml: 0 },
                        '.MuiButton-root': {m: 1},
                    }}>
                    <h1>Customer Registration</h1>
                    <FormControl>
                        <FormLabel>Customer details</FormLabel>
                        <FormGroup>
                            <TextField id="fname-field" label="First name" variant="outlined" />
                            <TextField id="lname-field" label="Last name" variant="outlined" />
                            <TextField id="lname-field" label="Last name" variant="outlined" />
                            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                    <OutlinedInput
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                            aria-label={
                                                showPassword ? 'hide the password' : 'display the password'
                                            }
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            onMouseUp={handleMouseUpPassword}
                                            edge="end"
                                            >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                        }
                                        label="Password"
                                    />
                            </FormControl>
                            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                    <OutlinedInput
                                        id="confirm-password"
                                        type={showPassword ? 'text' : 'password'}
                                        endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                            aria-label={
                                                showPassword ? 'hide the password' : 'display the password'
                                            }
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            onMouseUp={handleMouseUpPassword}
                                            edge="end"
                                            >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                        }
                                        label="Confirm Password"
                                    />
                            </FormControl>
                        </FormGroup>
                        <FormGroup>
                            <TextField
                                id="filled-multiline-flexible"
                                label="Details"
                                multiline
                                maxRows={4}
                                
                            />
                        </FormGroup>
                    </FormControl>
                    <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label">Purchase Location</FormLabel>
                            <RadioGroup 
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="in-store"
                                name="radio-buttons-group">
                                <FormControlLabel value="in-store" control={<Radio />} label="In-store" />
                                <FormControlLabel value="app" control={<Radio />} label="On App" />
                                <FormControlLabel value="website" control={<Radio />} label="Website" />
                            </RadioGroup>
                    </FormControl>
                    <Box>
                        <FormControl>
                            <FormLabel id="demo-radio-buttons-group-label">Experience</FormLabel>
                            <Rating
                                name="simple-controlled"
                                value={value}
                                precision={0.5}
                                onChange={(event, newValue) => {
                                setValue(newValue);
                            }}/>
                        </FormControl>
                    </Box>
                    <Box >
                        <Button variant="outlined">Submit</Button>
                        <Button variant="outlined">Cancel</Button>
                    </Box>
                </Box>
            </Box>);
}
export default CustomerRegistration;