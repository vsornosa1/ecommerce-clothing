import { Outlet } from 'react-router-dom';
import Categories from "../../components/categories/categories.component";

const Home = () => {
	return (
		<div>
			<Outlet />
			<Categories />
		</div>
	)
}

export default Home;
