import { Layout } from "src/components/layouts/Layout";

const NotFoundPage = () => {
  return (
    <Layout meta={{ pageName: "404 Not Found" }}>
      <h2 className="text-3xl">404 Not Found</h2>
    </Layout>
  );
};

export default NotFoundPage;
