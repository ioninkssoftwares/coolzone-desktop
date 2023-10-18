
import { useAxios } from "../../utils/axios";
import { useCookies } from "react-cookie";



export const fetchBanners = async (userToken) => {
  console.log(userToken,"djsfkdsjflds")
  const instance = useAxios(userToken);
  try {
    const response = await instance.get('/banners');
    return { data: response.data };
  } catch (error) {
    console.error('Error fetching banners:', error);
    throw error;
  }
};


export const fetchProductById = async (id) => {
  const instance = useAxios();
  try {
    const response = await instance.get(`/product/${id}`);
    return { data: response.data };
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    throw error;
  }
};



export function createProduct(product) {
  return new Promise(async (resolve) => {
    const response = await fetch('/products/', {
      method: 'POST',
      body: JSON.stringify(product),
      headers: { 'content-type': 'application/json' },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function updateProduct(update) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      '/products/' + update.id,
      {
        method: 'PATCH',
        body: JSON.stringify(update),
        headers: { 'content-type': 'application/json' },
      }
    );
    const data = await response.json();
    resolve({ data });
  });
}

export const fetchProductsByFilters = async (filter) => {
  const instance = useAxios();
  try {
    console.log(filter, "query");
    let queryString = '';

    for (let key in filter) {
      // const categoryValues = filter[key];
      // if (categoryValues.length) {
      queryString += `${key}=${filter[key]}&`;
      // }
    }

    console.log(queryString, "query");

    const response = await instance.get(
      `/products?${queryString}`
    );

    return { data: response.data };
  } catch (error) {
    console.error('Error fetching products by filters:', error);
    throw error;
  }
};



export const fetchProductsByNavbar = async (filter) => {
  const instance = useAxios();
  try {
    let navQuery = filter;
    console.log(navQuery, "navq");

    const response = await instance.get(
      `/products?category=${navQuery}`
    );

    // const totalItems = await response.headers.get('X-Total-Count');
    // return { products: data, totalItems: +totalItems };
    return { data: response.data };
  } catch (error) {
    console.error('Error fetching products by navbar:', error);
    throw error;
  }
};


// export function fetchProductsByFilters(filter, sort, pagination, admin) {
//   // filter = {"category":["smartphone","laptops"]}
//   // sort = {_sort:"price",_order="desc"}
//   // pagination = {_page:1,_limit=10}

//   let queryString = '';
//   for (let key in filter) {
//     const categoryValues = filter[key];
//     if (categoryValues.length) {
//       queryString += `${key}=${categoryValues}&`;
//     }
//   }
//   for (let key in sort) {
//     queryString += `${key}=${sort[key]}&`;
//   }
//   for (let key in pagination) {
//     queryString += `${key}=${pagination[key]}&`;
//   }
//   if(admin){
//     queryString += `admin=true`;
//   }

//   return new Promise(async (resolve) => {
//     const response = await fetch(
//       '/products?' + queryString
//     );
//     const data = await response.json();
//     const totalItems = await response.headers.get('X-Total-Count');
//     resolve({ data: { products: data, totalItems: +totalItems } });
//   });
// }

export const fetchAllProducts = async () => {
  const instance = useAxios();
  try {
    const response = await instance.get("/products");
    return { data: response.data };
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};


export const fetchCategories = async () => {
  const instance = useAxios();
  try {
    const response = await instance.get('/productcategoryList');
    return { data: response.data };
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export const fetchBrands = async () => {
  const instance = useAxios();
  try {
    const response = await instance.get('/brands');
    return { data: response.data };
  } catch (error) {
    console.error('Error fetching brands:', error);
    throw error;
  }
};



// how to make the function using promise

// export function fetchAllProducts() {
//   return new Promise(async (resolve) => {
//     const response = await fetch(`https://coolzonebackend.onrender.com/api/v1/products`);
//     const data = await response.json();
//     resolve({ data });
//   });
// }

