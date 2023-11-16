import { useParams, /* Other hooks */ } from "react-router-dom";

const withRouter = Component => props => {
  const params = useParams();
  // Other hooks, useLocation, useNavigate, etc..
  return <Component {...props} {...{ params, /* other injected props */ }} />;
};

export default withRouter;