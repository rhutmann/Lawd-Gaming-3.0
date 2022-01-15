import Head from "next/head";
import { useState, useEffect } from "react";
import Link from "next/link";
import fetch from "isomorphic-unfetch";
import { Button, Form, Loader, Checkbox } from "semantic-ui-react";
import { useRouter } from "next/router";

import dashboardStyles from "../../styles/dashboard/Index.module.css";

const base_url = process.env.BASE_URL;
const Login = () => {
  const [form, setForm] = useState({
    user_name: "",
    email: "",
    password: "",
    terms: "agreed",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState({});

  const router = useRouter();

  useEffect(() => {
    if (isSubmitting) {
      if (Object.keys(error).length === 0) {
        createUser();

        console.log("success");
      } else {
        setIsSubmitting(false);
      }
    }
  }, [error]);
  // form inputs value
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // submitting req or signing up
  const handleSubmit = (e) => {
    e.preventDefault();

    let err = validator();
    setError(err);

    setIsSubmitting(true);
  };

  const createUser = async () => {
    try {
      const res = await fetch(`${base_url}/api/user`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
        },
        body: JSON.stringify(form),
      });

      router.push("dasboard/login");
    } catch (error) {
      console.log(error);
    }
  };

  const validator = () => {
    let err = {};

    if (!form.user_name) {
      err.user_name = "Please enter your username";
    }
    if (!form.email) {
      err.email = "Please enter your email";
    }
    if (!form.password) {
      err.password = "Please enter your password";
    }
    if (!form.terms) {
      err.terms = "Please do you?";
    }

    return err;
  };

  return (
    <div className={`${dashboardStyles.dashboard} dark:bg-gray-100 text-black`}>
      <Head>
        <title>Sign Up</title>
        <meta name='description' content='Generated by create next app' />
      </Head>

      <main>
        <div className='header'>
          <h1>Already a Member? </h1>
          <Link href='/dashboard/login'>
            <a>Sign In</a>
          </Link>
        </div>

        <div className='form'>
          <Form onSubmit={handleSubmit} loading={isSubmitting}>
            <Form.Input
              fluid
              error={
                error.user_name
                  ? {
                      content: "please enter your username",
                      pointing: "below",
                    }
                  : null
              }
              label='User Name'
              placeholder='username'
              name='user_name'
              onChange={handleChange}
            />
            <Form.Input
              fluid
              id='form-input-control-error-email'
              error={
                error.email
                  ? {
                      content: "please enter your email",
                      pointing: "below",
                    }
                  : null
              }
              type='email'
              label='Email'
              placeholder='example@gmail.com'
              name='email'
              onChange={handleChange}
            />
            <Form.Input
              fluid
              error={
                error.password
                  ? {
                      content: "please enter a password",
                      pointing: "below",
                    }
                  : null
              }
              type='password'
              label='Password'
              placeholder='password'
              name='password'
              onChange={handleChange}
            />
            <Form.Checkbox
              checked
              label='I agree to the Terms and Conditions'
            />
            <Button type='submit'>Create</Button>
          </Form>
        </div>
      </main>
    </div>
  );
};

export default Login;
