import { memo } from "react"


const InputsForm = memo(function InputsForm({ inputs }) {
  console.log(inputs)
  return (
    inputs?.map((i, indx) =>
      <input
        key={indx + 1150}
        type={i.type}
        id={i.name}
        name={i.name}
        placeholder={i.placeholder}
        value={i.value}
        onChange={i.onChange}
        required={i.required || false}
      />)
  )
})

export default InputsForm