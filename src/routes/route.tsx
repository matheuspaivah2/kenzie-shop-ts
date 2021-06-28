import { Redirect, Route as ReactDOMRoute } from "react-router-dom";
import { useAuth } from "../providers/Auth";
// Se a rota for privada e o usuário não ta logado, ele vai pro login
// Se a rota for privada e o usuário logado, ele vai pra rota
// Se a rota não for privada e o usuário estiver logado, ele não precisa ver
// Se a rota não rota for privada e o usuário não estiver logado, ele pode ver

// true true = ok
// true false = vai pro login
// false e true = dashboard
// false e false = ok

interface RouteProps {
  isPrivate: boolean;
  component: () => JSX.Element;
  path: string;
  exact: boolean;
}

const Route = ({
  isPrivate = false,
  component: Component,
  path,
  exact,
  ...rest
}: RouteProps) => {
  const { token } = useAuth();

  return (
    <ReactDOMRoute
      {...rest}
      render={() => {
        return isPrivate === !!token ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? "/" : "/dashboard",
            }}
          />
        );
      }}
    />
  );
};

export default Route;
