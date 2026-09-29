import { createContext, useState } from "react";

export const dishes = [
  {
    id: 0,
    name: "Uthappizza",
    category: "mains",
    label: "Hot",
    price: 4.99,
    description:
      "A unique combination of Indian Uthappam and Italian pizza, topped with olives, tomatoes, onion, chillies and Buffalo Paneer.",
  },
  {
    id: 1,
    name: "Zucchipakoda",
    category: "appetizer",
    label: "",
    price: 1.99,
    description:
      "Deep-fried zucchini coated with mildly spiced chickpea flour, served with sweet-tangy tamarind sauce.",
  },
  {
    id: 2,
    name: "Vadonut",
    category: "appetizer",
    label: "New",
    price: 1.99,
    description:
      "A quintessential ConFusion experience: is it a vada or is it a donut?",
  },
  {
    id: 3,
    name: "ElaiCheese Cake",
    category: "dessert",
    label: "",
    price: 2.99,
    description:
      "A delectable semi-sweet New York-style cheesecake with a graham cracker crust and spiced cardamom.",
  },
];

export const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (dish) => {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === dish.id);

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }

      return [...currentItems, { ...dish, quantity: 1 }];
    });
  };

  const removeFromCart = (dishId) => {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.id !== dishId),
    );
  };

  const clearCart = () => setCartItems([]);
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        itemCount,
        totalPrice,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
