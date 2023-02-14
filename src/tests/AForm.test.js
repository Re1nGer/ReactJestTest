import AForm from "../pages/AForm";
import { render, screen, act, fireEvent } from '@testing-library/react';

describe("Form", () => {
  it('renders form with two fields', () => {
    const {getByText} = render(<AForm/>);
    expect(getByText(/form/i)).toBeInTheDocument();
  });

  it('render 2 input components', () => {
    render(<AForm />);
    expect(screen.getByTestId('nametest')).toBeInTheDocument();
    expect(screen.getByTestId('surnametest')).toBeInTheDocument();
  });

  it('renders a submit button', () => {
    const {getByText} = render(<AForm/>);
    expect(getByText("Submit")).toBeInTheDocument();
  });
});

 describe("Form behaviour",  () => {
  it('validate user inputs, and provides error messages', async () => {
    const { getByTestId, getByText } = render(<AForm/>)

    await act (async () => {
      fireEvent.change(screen.getByTestId('nametest'), {
        target: {value: ''},
      });

      fireEvent.change(screen.getByTestId('surnametest'), {
        target: {value: ''},
      });

    });

    await act (async () => {
      fireEvent.submit(getByTestId('form'))
    });

    expect(getByText("Name is Required")).toBeInTheDocument();
    expect(getByText("Surname is Required")).toBeInTheDocument();

  });

  it('should submit when form inputs contain text', async () => {
    const { getByTestId, queryByText } = render(<AForm/>)

    await act (async () => {
      fireEvent.change(screen.getByTestId('nametest'), {
        target: {value: 'somename'},
      });

      fireEvent.change(screen.getByTestId('surnametest'), {
        target: {value: 'somevalue'},
      });

    });

    await act (async () => {
      fireEvent.submit(getByTestId('form'))
    });

    expect(queryByText("Name is required")).not.toBeInTheDocument();
    expect(queryByText("Surname is required")).not.toBeInTheDocument();
  });
});