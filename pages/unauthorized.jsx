import { useRouter } from 'next/router';
import React from 'react';
import Layout from '../components/Layout';

function Unauthorized() {
  const router = useRouter();
  const { message } = router.query;
  return (
    <Layout title="Unauthorized page">
      <h1 className="text-xl">Access denied</h1>
      {message && <h2 className="text-red-500">{message}</h2>}
    </Layout>
  );
}

export default Unauthorized;
