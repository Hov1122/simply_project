import { Alert, TextField } from "@mui/material";
import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom'
import { useFormik } from 'formik';
import * as Yup from "yup";
// import { recoverPasswordRequest } from "../../../state-management/users/requests";
// import { usersSelector } from "../../../state-management/users/selectors";
// import Loading from "../../common/Loading";
import "./Reset.css";


const Reset = () => {
    const {id, recovery_token} = useParams();
    console.log(id, recovery_token)

    const [validateError, setValidateError] = useState(false)

    const userPasswordResetForm = useFormik({
        initialValues: {
          password: '',
          changepassword: ''
        },
        onSubmit: values => {
          alert(JSON.stringify(values, null, 2));
        },
        validationSchema: Yup.object().shape({
            password: Yup.string().required("This field is required"),
            changepassword: Yup.string().when("password", {
              is: val => (val && val.length > 0 ? true : false),
              then: Yup.string().oneOf(
                [Yup.ref("password")],
                () => {
                    setValidateError(true)
                }
              )
            })
          })
    });
    
    // const [recoveryMail, setrecoveryMail] = useState("");
    // const dispatch = useDispatch();
    // const { loading,error } = useSelector(usersSelector);
    // const [success, setSuccess] = useState(false);
  
    return (
      <div className="reset-page">
        <div className="reset-component">
          <h2 style={{ marginBottom: 20 }}>Reset your account password.</h2>
          {validateError && <Alert severity="error" sx={{margin: "15px auto"}}>Both fields need to be the same!</Alert>}
          <form >
            <TextField
                variant="outlined"
                label="Type new password..."
                name="password"
                type="password"
                value={userPasswordResetForm.values.password}
                onChange={userPasswordResetForm.handleChange}
            >
            </TextField>
            <TextField
                variant="outlined"
                label="Repet your new password..."
                name="changepassword"
                type="password"
                value={userPasswordResetForm.values.changepassword}
                onChange={userPasswordResetForm.handleChange}
            >
            </TextField>
          </form>
          {/* { success && !error && <Alert severity="success" sx={{margin: "15px auto"}}>Your password changed successfully</Alert>} */}
          {/* { error && <Alert severity="error" sx={{margin: "15px auto"}}>Your recovery link expired!</Alert>} */}
          
        </div>
      </div>
    );
    


    // const {id, recovery_token} = useParams();
    // console.log(id, recovery_token)
    // return (
    //     <div>
    //         asd
    //     </div>
    // )
}

export default Reset;