import ProductCard from "../../Components/ProductCard/ProductCard";
import Loading from "../../Components/Loading/Loading";
import useProducts from "../../Hooks/useProducts";
import { Helmet } from "react-helmet";

export default function Products() {
  const { data, isLoading, isError } = useProducts();

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <h2>ERROR</h2>;
  }

  return (
    <>
      <Helmet>
        <title>Product</title>
        <meta name="description " content="Welcome To Product Page" />
      </Helmet>

      <div className="grid grid-cols-12 gap-5">
        {data.data.data.map((product) => (
          <ProductCard productInfo={product} key={product._id} />
        ))}
      </div>
    </>
  );
}
