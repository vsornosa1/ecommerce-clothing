import './App.scss';
import { Routes, Route } from 'react-router-dom';
import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';


const Shop = () => {
  return (
    <h2> Welcome to the shop </h2>
  );
}

const App = () => {
  return (
   /*  <Categories /> */
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
      </Route>
    </Routes>
  );
}


export default App;
