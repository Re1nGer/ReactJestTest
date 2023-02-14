import { useForm } from "react-hook-form";

function AForm() {
 const { register, handleSubmit, formState: { errors } } = useForm();

  const handleFormSubmit = (data) => {
    console.log('form submited', data);
  }

  return (
    <div>
        <h1>Form</h1>
      <form onSubmit={handleSubmit(handleFormSubmit)} data-testid='form'>
        <label htmlFor="name" id="nameLabel">Name</label>
        <input data-testid='nametest' aria-labelledby="nameLabel" type={'text'} {...register("name", { required: "Name is Required" })} />
        { errors['name'] ? <small>{errors['name']?.message}</small> : null }
        <br />

        <label htmlFor="surname" id="surnameLabel">Surname</label>
        <input data-testid='surnametest' aria-labelledby="surnameLabel" type={'text'} {...register("surname", { required: "Surname is Required" })} />
        { errors['surname'] ? <small>{errors['surname']?.message}</small> : null }
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default AForm;