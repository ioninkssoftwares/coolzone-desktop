import { useAxios } from "../../utils/axios";

const instance = useAxios();


export const addToCart = async (item) => {
    try {
      const response = await instance.post('/addtomycart', item);
    //   const data = response.data;
    //   return { data };
      return { data: response.data };
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  };

  
  // export function fetchItemsByUserId() {
  //   return new Promise(async (resolve) => {
  //     const response = await fetch('/cart');
  //     const data = await response.json();
  //     resolve({ data });
  //   });
  // }

  export async function fetchItemsByUserId() {
    try {
      const response = await fetch('/cart');
      const data = await response.json();
      return { data };
    } catch (error) {
      console.error('Error fetching items by user ID:', error);
      throw error;
    }
  }
  
  
  export function updateCart(update) {
    return new Promise(async (resolve) => {
      const response = await fetch('/cart/' + update.id, {
        method: 'PATCH',
        body: JSON.stringify(update),
        headers: { 'content-type': 'application/json' },
      });
      const data = await response.json();
      resolve({ data });
    });
  }
  
  export function deleteItemFromCart(itemId) {
    return new Promise(async (resolve) => {
      const response = await fetch('/cart/' + itemId, {
        method: 'DELETE',
        headers: { 'content-type': 'application/json' },
      });
      const data = await response.json();
      resolve({ data: { id: itemId } });
    });
  }
  
  export function resetCart() {
    // get all items of user's cart - and then delete each
    return new Promise(async (resolve) => {
      const response = await fetchItemsByUserId();
      const items = response.data;
      for (let item of items) {
        await deleteItemFromCart(item.id);
      }
      resolve({ status: 'success' });
    });
  }
  