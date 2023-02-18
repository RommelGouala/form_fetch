import {render, screen} from '@testing-library/react'
import {user} from '@testing-library/user-event'
import Form from './Form'
import '@testing-library/jest-dom'



test('It should have a Heading, paragraph and a button', () =>{
    
    //Render
    render(<Form/>)

    // Manipulation

    const heading = screen.getByRole('heading', { name: /fetchrewards/i, hidden: true });
    const paragraph = screen.getByText(/snap receipts, earn rewards and connect with friends in the fetch app!/i);
    const link =  screen.getByRole('link', { name: /learn more/i, hidden: true });
    const button = screen.getByRole('button', { name: /learn more/i, hidden: true });


    // Assertion

    expect(heading).toBeInTheDocument()
    expect(paragraph).toBeInTheDocument()
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', 'https://fetch.com/')
    expect(button).toBeInTheDocument()
})

