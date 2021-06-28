import { TextField, Button } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import * as yup from "yup";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../providers/Auth";
import { Container } from "./styles";

interface DataProps {
  username: string;
  password: string;
}

function Login() {
  const { signIn } = useAuth();

  const [error, setError] = useState<boolean>(false);

  const schema = yup.object().shape({
    username: yup.string().required("Campo obrigatório"),
    password: yup
      .string()
      .min(5, "Mínimo de 5 dígitos")
      .required("Campo obrigatório"),
  });

  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DataProps>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: DataProps) => {
    signIn(data, setError, history);
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <TextField
            margin="normal"
            variant="outlined"
            label="Nome de usuário"
            size="small"
            color="primary"
            {...register("username")}
            error={!!errors.username}
            helperText={errors.username?.message}
          ></TextField>
        </div>

        <div>
          <TextField
            margin="normal"
            variant="outlined"
            label="Nome de usuário"
            size="small"
            color="primary"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
          ></TextField>
        </div>
        <Button type="submit" variant="contained" color="primary" size="large">
          Enviar
        </Button>
      </form>
      {error && <span> Usuário ou senha incorretas! </span>}
    </Container>
  );
}

export default Login;
