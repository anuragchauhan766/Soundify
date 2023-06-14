import { Link } from "@mui/material";
import { NavLink as RouterNavLink, useNavigate } from "react-router-dom";
import TextInput from "./TextInput";
import { useFormik } from "formik";
import { logInschema } from "@src/schemas";
import { useAuth } from "@src/context/AuthContext";
import { useState } from "react";
import Error from "./Error";
import SubmitButton from "./SubmitButton";
import EmailVarificationDialog from "./EmailVarificationDialogbox";
import axios from "axios";
import { LoginDataType } from "@src/types/User";

const defaultUserDetails: LoginDataType = {
  email: "",
  password: "",
};

function LoginForm() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { login } = useAuth();
  const [err, seterr] = useState("");
  const {
    values,
    handleSubmit,
    handleChange,
    handleBlur,
    errors,
    touched,
    isValid,
    isSubmitting,
    setSubmitting,
    resetForm,
  } = useFormik({
    initialValues: defaultUserDetails,
    validationSchema: logInschema,
    validateOnMount: true,
    onSubmit: async (value) => {
      try {
        const err = await login(value);
        if (err) {
          seterr(err);
          if (err === "Please Verifiy Your Email and Try again") {
            sendVerficationmail(value.email);
          }
        } else {
          navigate("/");
        }

        setSubmitting(false);
        resetForm();
      } catch (error) {
        console.error(error);
      }
    },
  });
  const sendVerficationmail = async (email: string) => {
    try {
      await axios.post("/auth/send-verification-mail", {
        email,
      });
      setOpen(true);
    } catch (error) {
      console.log(error);
    }
  };
  // useEffect(() => {
  //   if (user) {
  //     if (!user.isVerified) {
  //       sendVerficationmail(user.email as string);
  //     } else {
  //       navigate("/");
  //     }
  //   }
  // }, [user]);

  return (
    <form
      className="flex flex-col shrink w-full items-center space-y-7 px-4 sm:p-0"
      onSubmit={handleSubmit}
    >
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
        // error={errors.password}
        touched={touched.password}
      />
      <div className="flex justify-start w-full sm:w-3/4 text-xl">
        {err ? <Error err={err} /> : null}
      </div>
      <div className="w-full sm:w-1/2">
        <SubmitButton
          disabled={!isValid}
          text="Sign in"
          isSubmitting={isSubmitting}
        />
      </div>
      <EmailVarificationDialog open={open} setOpen={setOpen} />
      <div className="text-sm">
        <Link
          to="/auth/forgotpassword"
          component={RouterNavLink}
          className="text-white underline hover:text-ctc"
        >
          <span>Forgot Your Password?</span>
        </Link>
      </div>
    </form>
  );
}

export default LoginForm;
