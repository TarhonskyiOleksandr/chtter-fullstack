import { useGetMe } from "@/entities";

const Home = () => {
  const { data } = useGetMe();

  return (
    <div>
      Home
    </div>
  );
}

export default Home;
