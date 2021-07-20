import Link from "next/link";
import axios from "axios";
import { connectToDatabase } from "../util/mongodb";
import { useEffect, useState } from "react";
import Header from "../components/Header";

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
      setBuildItems(testData);
    });
  }, []);

  return (
    <div className=''>
      <Header />
   <div className='px-8 md:px-0'>
   <h1 className="text-semibold  text-7xl text-gray-800 text-center py-8 underline">
        CATEGORIES
      </h1>
      {buildItems.map((item, i) => {
        const str = item.Description.replace(/\s+/g, "-").toLowerCase();
        return (
          <Link className='' href={`/categories/${str}`} key={i}>
            <div className="px-16  md:w-1/3 my-16  py-32 mx-auto text-center bg-gray-200 rounded-lg shadow-lg">
              <a className="text-4xl md:text-8xl cursor-pointer text-center text-gray-700 hover:text-gray-400">
                {item.Description}
              </a>
            </div>
          </Link>
        );
      })}
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
