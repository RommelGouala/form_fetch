import React from 'react'
import { render, waitFor, fireEvent } from '@testing-library/react'
import Form from './Form'

jest.mock('axios', () => {
return {
get: jest.fn().mockResolvedValueOnce({
data: {
occupations: [
"Head of Shrubbery",
"Interim Substitute Teacher"
],
states: [
{
name: "Alabama",
abbreviation: "AL"
},
{
name: "Alaska",
abbreviation: "AK"
}
]
}
}),
post: jest.fn().mockResolvedValueOnce()
}
})

import axios from 'axios'

describe('Form', () => {
it('should display the form and options when the data is fetched', async () => {
const { getByTestId, getByLabelText } = render(<Form />)


    await waitFor(() => {
        expect(getByTestId('occupation-options')).toContainElement(getByText("Head of Shrubbery"))
        expect(getByTestId('occupation-options')).toContainElement(getByText("Interim Substitute Teacher"))
        expect(getByTestId('state-options')).toContainElement(getByText("AL"))
        expect(getByTestId('state-options')).toContainElement(getByText("AK"))
    })

    // rest of the test

    const nameInput = getByTestId('InputForName')
    const emailInput = getByTestId('InputForEmail')
    const passwordInput = getByTestId('InputForPassword')
    const occupationSelect = getByTestId('occupation-options') 
    const stateSelect =  getByTestId('state-option')
    const submitButton = getByTestId('submit-button')

    fireEvent.change(nameInput, { target: { value: 'John Doe' } })
    fireEvent.change(emailInput, { target: { value: 'johndoe@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    fireEvent.change(occupationSelect, { target: { value: 'Head of Shrubbery' } })
    fireEvent.change(stateSelect, { target: { value: '{"name":"Alabama","abbreviation":"AL"}' } })
    fireEvent.click(submitButton)

    await waitFor(() => {
        expect(axios.post).toHaveBeenCalledWith(
            process.env.NEXT_PUBLIC_Fetch_Form_API,
            {
                name: 'John Doe',
                email: 'johndoe@example.com',
                password: 'password123',
                occupation: 'Head of Shrubbery',
                state: { name: 'Alabama', abbreviation: 'AL' }
            }
        )
    })
})
})