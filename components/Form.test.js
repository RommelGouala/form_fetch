import { render, fireEvent } from '@testing-library/react'
import Form from './Form'

jest.mock('axios', () => {
return {
get: jest.fn().mockResolvedValue({
data: {
occupations: ['Developer', 'Designer', 'Product Manager'],
states: [{ name: 'New York', abbreviation: 'NY' }, { name: 'California', abbreviation: 'CA' }]
}
}),
post: jest.fn().mockResolvedValue({ status: 201 })
}
})

import axios from 'axios'

describe('Form', () => {
test('renders the form and options when the data is fetched', async () => {
// mock the fetch API
const { getByTestId } = render(<Form />)


    // wait for the data to be fetched
    await wait(() => {
        const form = getByTestId('form')
        expect(form).toBeInTheDocument()

        const occupationSelect = getByTestId('occupation-select')
        expect(occupationSelect.options.length).toBe(3)

        const stateSelect = getByTestId('state-select')
        expect(stateSelect.options.length).toBe(2)
    })
})

test('submits the form', async () => {
    const { getByTestId } = render(<Form />)

    // fill in the form inputs
    const nameInput = getByTestId('name-input')
    fireEvent.change(nameInput, { target: { value: 'John Doe' } })

    const emailInput = getByTestId('email-input')
    fireEvent.change(emailInput, { target: { value: 'johndoe@example.com' } })

    const passwordInput = getByTestId('password-input')
    fireEvent.change(passwordInput, { target: { value: 'password123' } })

    // submit the form
    const submitButton = getByTestId('submit-button')
    fireEvent.click(submitButton)

    // assert the fetch API was called with the correct data
    expect(axios.post).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: 'password123',
            occupation: '',
            state: []
        })
    )

    // assert the form was submitted successfully
    const message = getByText(/Thanks for submitting!/i)
    expect(message).toBeInTheDocument()
})

test('selects an occupation', () => {
    const { getByTestId } = render(<Form />)
    const occupationSelect = getByTestId('occupation-select')

    // select the "Developer" option
    fireEvent.change(occupationSelect, { target: { value: 'Developer' } })

    // assert the selected value is "Developer"
    expect(occupationSelect.value).toBe('Developer')
})
test('selects state', () => {
    const { getByTestId } = render(<Form />)
    const stateSelect = getByTestId('state-select')
    

    // select the "New York" option
    fireEvent.change(stateSelect, { target: { value: JSON.stringify({name: "New York", abbreviation: "NY"}) } })
    
    // assert the selected value is "New York"
    expect(stateSelect.value).toBe(JSON.stringify({name: "New York", abbreviation: "NY"}))
    })
    
    //end
    })