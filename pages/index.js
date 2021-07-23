import Link from "next/link";
import axios from "axios";
import { connectToDatabase } from "../util/mongodb";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import About from "../components/About";
import create from "zustand";
import { persist } from "zustand/middleware";
export const useStore = create(
  persist((set) => ({
    cart: [],
    addToCart: (id) =>
      set((state) => {
        const isPresent = state.cart.find((product) => product.id === id);
        if (!isPresent) {
          return {
            ...state,
            cart: [...state.cart, { id, count: 1 }],
          };
        }
        const updatedCart = state.cart.map((product) =>
          product.id === id ? { ...product, count: product.count + 1 } : product
        );
        return {
          ...state,
          cart: [updatedCart],
        };
      }),
    removeFromCart: (id) =>
      set((state) => {
        const isPresent = state.cart.findIndex((product) => product.id === id);

        if (isPresent === -1) {
          return {
            ...state,
          };
        }

        const updatedCart = state.cart
          .map((product) =>
            product.id === id
              ? { ...product, count: Math.max(product.count - 1, 0) }
              : product
          )
          .filter((product) => product.count);

        return {
          ...state,
          cart: updatedCart,
        };
      }),
  }))
);
export default function Home({ isConnected }) {


  const [buildItems, setBuildItems] = useState([]);
  useEffect(() => {
    axios.get("/api/materials").then(function (response) {
      const data = response.data;

      const newData = data.reduce((arr, el) => {
        if (el.Level === "1") {
          // If el is pushed directly it would be a reference
          // from the original data object
          arr.push({ ...el, child: [] });
        } else {
          arr[arr.length - 1].child.push({ ...el });
        }

        return arr;
      }, []);

      const testData = newData.reduce((arr, el) => {
        const newTestData = el.child.reduce((array, element) => {
          if (element.Level === "2") {
            array.push({ ...element, child: [] });
          } else {
            array[array.length - 1].child.push({ ...element });
          }
          return array;
        }, []);

        arr.push({ ...el });
        arr[arr.length - 1].child = newTestData;

        return arr;
      }, []);
      testData.push(
        { Description: "Other Materials" },
        { Description: "More Materials" },
        { Description: "Building Materials" }
      );
      setBuildItems(testData);
    });
  }, []);

  return (
    <div className="overflow-x-hidden">
      <Header />
      <About />
      <div className="py-32 px-6 md:px-0">
        <h1 className="text-semibold   text-6xl text-gray-900 text-center py-8 ">
          What we provide.
        </h1>
        <p className="text-center text-xl text-gray-900">
          In aliquam sem fringilla ut morbi tincidunt vestibulum mattis augue.
        </p>
        <div className="grid grid-cols-2 container mx-auto md:w-1/2 gap-4">
          {buildItems.map((item, i) => {
            const str = item.Description.replace(/\s+/g, "-").toLowerCase();
            return (
              <Link className="" href={`/categories/${str}`} key={i}>
                <div className="px-6 cursor-pointer   my-16  py-8 mx-auto  rounded-lg shadow-lg">
                  <a className="text-xl uppercase md:text-2xl cursor-pointer text-center text-gray-900 hover:text-gray-400">
                    {item.Description}
                  </a>
                  <p className="pt-4 text-gray-400">
                    Augue eget arcu dictum varius duis at. Suspendisse ultrices
                    gravida dictum fusce ut placerat orci.
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { client } = await connectToDatabase();

  const isConnected = await client.isConnected();

  return {
    props: { isConnected },
  };
}
