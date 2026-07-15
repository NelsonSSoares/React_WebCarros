import type { RegisterOptions, UseFormRegister } from 'react-hook-form';
interface InputProps {
   placeholder: string;
   type: string;
   name: string;
   register?: UseFormRegister<any>;
   errors?: string;
   rules?: RegisterOptions;
}

export function Input({ placeholder, type, name, register, errors, rules }: InputProps) {
    return (
        <div>
            <input
                className="w-full border-2 rounded-md h-11 px-2"
                type={type}
                placeholder={placeholder}
                name={name}
                {...(register ? register(name, rules) : {})}
                id={name}
             />
            {errors && <span className="text-red-500  my-1 text-sm">{errors}</span>}
        </div>
    )

}