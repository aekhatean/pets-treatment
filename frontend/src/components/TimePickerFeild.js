import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useFormik } from 'formik';

function TimePickerFeild({ name, value, onChange, from_time, to_time, duration }) {
    const [time, setTime] = React.useState('');
    console.log(time)
    const handleChange = (event) => {
      setTime(event.target.value);
      
    };
    // const formikf = useFormik()

    const generateTimeSteps = () => {
        const result = [];
        result.push(`12 : 00 AM`)
        result.push(`12 : 30 AM`)
        for(let i = 1; i < 12; i++){
            for(let j = 0; j < 2; j++){
                result.push(`${i < 10 ? '0' + i : i } : ${j === 0 ? '00' : 30 * j} AM`);
            }
        }
        for(let i = 1; i < 12; i++){
            for(let j = 0; j < 2; j++){
                result.push(`${i < 10 ? '0' + i : i} : ${j === 0 ? '00' : 30 * j} PM`);
            }
        }
        result.push(`12 : 00 PM`)
        result.push(`12 : 30 PM`)
        return result;
    } 
    // console.log(generateTimeSteps())

    return (
        <div className="mb-3 text-start">
            <label htmlFor="time_field" className="form-label">Pick a Time</label>
            <Box name="time_field" sx={{ width: "150px", marginTop:'10px', marginLeft:'10px' }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Time</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={time}
                label="Time"
                onChange={handleChange}
                >

                {generateTimeSteps().map(m => {
                    return <MenuItem key={m} value={m}>{m}</MenuItem>
                })}

                </Select>
            </FormControl>
            </Box>
            
        </div>
      );
}
export default TimePickerFeild;
