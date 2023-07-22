import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate('/', { replace: true });
    }, 5000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      style={{
        margin: '150px auto 0px auto',
        textAlign: 'center',
      }}
    >
      <h2>Oops, this page is not found =(</h2>
      <p style={{ marginTop: 50 }}>
        You will be redirected to Home page in 5 seconds
      </p>
    </div>
  );
};

export default NotFound;
