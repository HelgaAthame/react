import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

export function ErrorPage() {
  const error = useRouteError();
  console.log(error);
  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p placeholder='error-text'>Sorry, an unexpected error has occurred.</p>
      <p>
        <i> {isRouteErrorResponse(error) && error.statusText}</i>
      </p>
    </div>
  );
}
