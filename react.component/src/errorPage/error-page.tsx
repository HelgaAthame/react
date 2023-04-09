import { Header } from '../app/Header';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

export const ErrorPage = () => {
  const error = useRouteError();
  //if (error) console.log(error);
  return (
    <div id="error-page">
      <Header currentPage="404" />
      <h1>404</h1>
      <p data-testid="error-text">Sorry, this page doesn&apos;t exist.</p>
      <p>
        <i> {isRouteErrorResponse(error) && error.statusText}</i>
      </p>
    </div>
  );
};
