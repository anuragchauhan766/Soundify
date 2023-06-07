import { ErrorSharp } from "@mui/icons-material";
import PasswordField from "./PasswordField";
import ValidationError from "./ValidationError";

interface Props {
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type: string;
  name: string;
  id: string;
  label: string;
  handleblur: (e: React.FocusEvent<any>) => void;
  error?: string;
  touched?: boolean;
}

function TextInput({
  value,
  handleChange,
  placeholder,
  type,
  name,
  id,
  label,
  handleblur,
  error,
  touched,
}: Props) {
  return (
    <div className="flex flex-col w-full sm:w-3/4 flex-1 space-y-2">
      <label htmlFor={id} className="text-xl font-bold">
        {label}
      </label>
      {type === "password" ? (
        <PasswordField
          password={value}
          changehandler={handleChange}
          name={name}
          id={id}
          placeholder={placeholder}
          handleBlur={handleblur}
        />
      ) : (
        <input
          type={type}
          name={name}
          id={id}
          value={value}
          onBlur={handleblur}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full text-white text-base font-semibold p-2 rounded-md outline-none border-none appearance-none  bg-[#121212] hover:outline-1 hover:outline-teal-50 shadow-slate-300/40 focus:border-5 focus:border-white"
        />
      )}
      <ValidationError error={error} touched={touched} />
    </div>
  );
}

export default TextInput;
