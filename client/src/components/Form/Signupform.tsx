import { UserType } from "../../types/User";
import GenderOptions from "./GenderInput";
import Datepicker from "./Datepicker";
import TextInput from "./TextInput";
import { useFormik } from "formik";
import { signUpschema } from "../../schemas";
import SubmitButton from "./SubmitButton";
import { useNavigate } from "react-router-dom";

const defaultUserDetails: UserType = {
  name: "",
  email: "",
  gender: "",
  dob: "",
  password: "",
};

function Signupform() {
  const navigate = useNavigate();
  const {
    values,
    touched,
    handleSubmit,
    handleChange,
    setFieldValue,
    errors,
    handleBlur,
    isValid,
    isSubmitting,
    setSubmitting,
  } = useFormik({
    initialValues: defaultUserDetails,
    validationSchema: signUpschema,
    validateOnMount: true,
    onSubmit: (values) => {
      setTimeout(() => {
        console.log("submit");
        console.log(values);
        setSubmitting(false);
        navigate("/auth/signin");
      }, 5000);
    },
  });

  console.log(errors);

  return (
    <form
      className="flex flex-col shrink w-full items-center space-y-7 px-4 sm:p-0"
      onSubmit={handleSubmit}
      autoComplete="off"
      noValidate
    >
      <TextInput
        type="text"
        placeholder="Profile Name"
        id="name"
        name="name"
        label="Profile Name"
        value={values.name ?? ""}
        handleChange={handleChange}
        handleblur={handleBlur}
        error={errors.name}
        touched={touched.name}
      />

      <TextInput
        type="email"
        placeholder="Your Email"
        id="email"
        name="email"
        label="Email"
        value={values.email ?? ""}
        handleChange={handleChange}
        handleblur={handleBlur}
        error={errors.email}
        touched={touched.email}
      />

      <TextInput
        type="password"
        placeholder="Password"
        id="password"
        name="password"
        label="Password"
        value={values.password ?? ""}
        handleChange={handleChange}
        handleblur={handleBlur}
        error={errors.password}
        touched={touched.password}
      />

      <div className="flex flex-col w-full sm:w-3/4 flex-1 space-y-2">
        <Datepicker
          value={values.dob ?? ""}
          setFieldValue={setFieldValue}
          handleblur={handleBlur}
          error={errors.dob}
          touched={touched.dob}
        />
      </div>
      <div className="flex flex-col w-full sm:w-3/4 flex-1 space-y-2">
        <GenderOptions
          value={values.gender ?? ""}
          onChange={handleChange}
          handleblur={handleBlur}
          error={errors.gender}
          touched={touched.gender}
        />
      </div>
      <div className="w-full sm:w-1/2">
        <SubmitButton
          disabled={!isValid}
          text="Sign up"
          isSubmitting={isSubmitting}
        />
      </div>
    </form>
  );
}

export default Signupform;
