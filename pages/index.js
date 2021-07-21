import Link from "next/link";
import axios from "axios";
import { connectToDatabase } from "../util/mongodb";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import About from "../components/About";
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
        { Description: "Dummy Data" },
        { Description: "Dummy Data" },
        { Description: "Dummy Data" }
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
        <div className='grid grid-cols-2 container mx-auto md:w-1/2 gap-4'>
          {buildItems.map((item, i) => {
            const str = item.Description.replace(/\s+/g, "-").toLowerCase();
            return (
              <Link className="" href={`/categories/${str}`} key={i}>
                <div className="px-6 cursor-pointer   my-16  py-8 mx-auto  rounded-lg shadow-lg">
                  <a className="text-xl md:text-2xl cursor-pointer text-center text-gray-900 hover:text-gray-400">
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
