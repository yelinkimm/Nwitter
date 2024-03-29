import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase/firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { Title, Wrapper, Form, Input, Error, Switcher } from "../components/auto-components";

export default function CreateAccount() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target: { name, value } } = e;
    if (name === 'name') {
      setName(value);
    } else if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (loading && name === "" || email === "" || password === "") {
      return;
    }

    try {
      setLoading(true);

      const credentials = await createUserWithEmailAndPassword(auth, email, password);
      console.log('credentials: ', credentials.user);
      await updateProfile(credentials.user, {
        displayName: name
      });

      navigate("/");
    } catch (error) {
      console.log('error: ', error);
      if (error instanceof FirebaseError) {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }

  }

  return (
    <Wrapper>
      <Title>Join 𝚇</Title>
      <Form onSubmit={onSubmit}>
        <Input onChange={onChange} name="name" value={name} placeholder="Name" type="text" required/>
        <Input onChange={onChange} name="email" value={email} placeholder="Email" type="email" required/>
        <Input onChange={onChange} name="password" value={password} placeholder="Password" type="password" required/>
        <Input type="submit" value={loading ? "Loading..." : "Create Account"}/>
      </Form>
      {error !== "" ? <Error>{error}</Error> : null}
      <Switcher>
       Already have an account? <Link to ="/login" >Log in &rarr;</Link>
      </Switcher>
    </Wrapper>
  )
}
