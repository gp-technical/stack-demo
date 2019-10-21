import React from 'react'
import TextField from '@material-ui/core/TextField'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

const style = {
  margin: 20,
  padding: 20,
  borderColor: 'lightgray',
  borderStyle: 'solid',
  borderWidth: 1,
  backgroundColor: 'White'
}

class component extends React.PureComponent {
  state = {
    name: 'Cat in the Hat',
    value: 'female',
    checked: false,
    age: 10
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value })
  }

  dataTestIsChecked = target => {
    return this.state.value === target ? 'checked' : ''
  }

  isCheckBoxChecked = () => {
    return this.state.checked ? 'checked' : ''
  }

  render() {
    return (
      <div style={style}>
        <h2>Example for form testing</h2>
        <form noValidate autoComplete="off">
          <TextField
            inputProps={{ 'data-test': 'text-input' }}
            id="standard-name"
            label="Name"
            value={this.state.name}
            onChange={this.handleChange('name')}
            margin="normal"
          />

          <RadioGroup
            aria-label="Gender"
            name="gender1"
            value={this.state.value}
            onChange={this.handleChange('value')}
          >
            <FormControlLabel
              value="female"
              control={
                <Radio
                  inputProps={{ 'data-test': `option1 ${this.dataTestIsChecked('female')}` }}
                />
              }
              label="Female"
            />
            <FormControlLabel
              value="male"
              control={
                <Radio inputProps={{ 'data-test': `option2 ${this.dataTestIsChecked('male')}` }} />
              }
              label="Male"
            />
            <FormControlLabel
              value="other"
              control={
                <Radio inputProps={{ 'data-test': `option3 ${this.dataTestIsChecked('other')}` }} />
              }
              label="Other"
            />
          </RadioGroup>

          <div>
            <Checkbox
              checked={this.state.checkedF}
              onChange={this.handleChange('checked')}
              value="checked"
              inputProps={{ 'data-test': `check-box ${this.isCheckBoxChecked()}` }}
            />
          </div>

          <div>
            <FormControl>
              <InputLabel htmlFor="age-simple">Age</InputLabel>
              <Select
                value={this.state.age}
                onChange={this.handleChange('age')}
                inputProps={{
                  'data-test': 'select'
                }}
              >
                <MenuItem value="" data-test="select-option-1">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10} data-test="select-option-2">
                  Ten
                </MenuItem>
                <MenuItem value={20} data-test="select-option-3">
                  Twenty
                </MenuItem>
                <MenuItem value={30} data-test="select-option-4">
                  Thirty
                </MenuItem>
              </Select>
            </FormControl>
          </div>
        </form>
      </div>
    )
  }
}

export default component
