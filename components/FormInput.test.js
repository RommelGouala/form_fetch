import { render, screen, within, waitFor, fireEvent} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FormInput from './FormInput'
import '@testing-library/jest-dom'
import { rest } from 'msw'
import {setupServer} from 'msw/node'

const handlers = [
    rest.get('https://frontend-take-home.fetchrewards.com/form',(req, res, ctx) =>{
        return res(
            ctx.json({
                
                occupations:["Head of Shrubbery","Interim Substitute Teacher"],
                states:[{"name": "Wisconsin", "abbreviation": "WI"},{"name": "Wyoming", "abbreviation": "WY"}]
            
            })
        )
    }),
    rest.post('https://frontend-take-home.fetchrewards.com/form', (req, res, ctx)=>{
        console.log('mock endpoint called');
    return res(
            ctx.json({
                occupations:["Head of Shrubbery"],
                states:[{"name": "Wisconsin", "abbreviation": "WI"}]
            })
        )
    })
]

const server = setupServer(...handlers)


beforeAll(() =>{
    server.listen()
})
afterEach(()=>{
    server.resetHandlers()
})
afterAll(()=>{
        server.close()
})



test("It should have 5 Input and a Button, a H1 and Paragrapth", async () =>{

    // Render

    render(<FormInput/>)

    //Manipulate 
const input = screen.getAllByRole('textbox')
const inputPassword = screen.getByPlaceholderText(/password/i)
const select= screen.getAllByRole('combobox')           
const button = screen.getByRole('button')
const heading = screen.getByRole('heading', {name: /hi there!/i})
const paragrapth = screen.getByText(/welcome/i)
const options = await screen.findAllByRole('option')


    //Assertion
    expect(heading).toBeInTheDocument()
    expect(paragrapth).toBeInTheDocument()
    expect(input).toHaveLength(3)
    expect(inputPassword).toBeInTheDocument()
    expect(select).toHaveLength(2)
    expect(options).toHaveLength(4)


    expect(button).toBeInTheDocument()

})





test("User should be able to type inside the input and pick option from the select element, and onlcick button should work", async  () =>{
    render(<FormInput/>)

       //Manipulation 
    
    const [inputName, inputEmail] = screen.getAllByRole('textbox')
    const inputPassword = screen.getByPlaceholderText(/password/i)
    const button = screen.getByRole('button')
    const optionsOccupation = await screen.findByTitle(/occupations/i)
    const optionsStates = await screen.findByTitle(/states/i);


    await waitFor(() => expect(optionsOccupation).toBeInTheDocument())
    await waitFor(() => expect(optionsStates).toBeInTheDocument())


    // userEvent.selectOptions(optionsOccupation, 'Head of Shrubbery')

    fireEvent.change(optionsOccupation, { target: { value: 'Head of Shrubbery' } });
    fireEvent.change(optionsStates, {
        target: { value: JSON.stringify({name:"Wisconsin",abbreviation:"WI"}) },
    });

    
    






    userEvent.click(inputName)
    userEvent.type(inputName, 'Jane')

    userEvent.click(inputEmail)
    userEvent.type(inputEmail, 'Jane@Jane.com')

    userEvent.click(inputPassword)
    userEvent.type(inputPassword, '1234')

        // Assertion

        server.use(
            rest.post("https://frontend-take-home.fetchrewards.com/form", (req, res, ctx) => {
            console.log("mock endpoint called");
            return res(ctx.json({ success: true }));
            })
        );
        
        userEvent.click(button);
        
          // Assertion
    



    
})