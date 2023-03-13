import { Header } from '../app/Header';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

export function ErrorPage() {
  const error = useRouteError();
  console.log(error);
  return (
    <div id="error-page">
      <Header cards={[]} currentPage="404">{undefined}</Header>
      <h1>404</h1>
      <p placeholder='error-text'>Sorry, this page doesn't exist.</p>
      <p>
        <i> {isRouteErrorResponse(error) && error.statusText}</i>
      </p>
    </div>
  );
}
