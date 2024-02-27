import logo from "./logo.svg";
import "./App.css";
import api from "./api.service";
import { useState, useEffect } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(1);
  const limit = 5;

  useEffect(() => {
    api.filterProducts({ offset: (page - 1) * limit, limit }, filters).then(({result}) => {
      setProducts(result);
    });
  }, [page, filters]);

  const applyFilter = ($event) => {
    setFilters({...filters, ...{[$event.target.name]: $event.target.name === 'price' ? parseFloat($event.target.value) : $event.target.value}})
  }

  return (
    <div className="App">
      <h2>Test</h2>
      <table>
        <tr>
          <th>id</th>
          <th>названи</th>
          <th>цена</th>
          <th>бренд</th>
        </tr>
        <tr>
          <td>filter</td>
          <td>
            <input
              type="text"
              id="id"
              name="product"
              onChange={applyFilter}
              size="10"
              placeholder="названи"
            />
          </td>
          <td>
            <input
              type="text"
              id="id"
              name="price"
              onChange={applyFilter}
              size="10"
              placeholder="цена"
            />
          </td>
          <td>
            <input
              type="text"
              id="id"
              name="brand"
              onChange={applyFilter}
              size="10"
              placeholder="бренд"
            />
          </td>
        </tr>
        {products.map(item => (
          <tr>
          <td>{ item.id }</td>
          <td>{ item.product }</td>
          <td>{ item.price }</td>
          <td>{ item.brand }</td>
        </tr>
        ))}
      </table>
      <div className="button-block">
        {page > 1 ? <div onClick={() => {setPage(page - 1)}} className="button-div">
          <p>Prev</p>
        </div> : null}
        <div onClick={() => {setPage(page + 1)}} className="button-div">
          <p>Next</p>
        </div>
      </div>
    </div>
  );
}

export default App;
