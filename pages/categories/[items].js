import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Items(props) {
  console.log(props.category);
  const router = useRouter();
  const [buildItem, setBuildItem] = useState([]);
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
      setBuildItem(testData[0].child);
    });
  }, []);

  return (
    <div>
      <div className=" container mx-auto  font-semibold flex">
        <div className=''>
          <a className='hover:text-gray-400' href='/'>Home/</a>
        </div>
        <div>
          <a className='hover:text-gray-400' href={`/category/${props.categories}`}>{props.categories}</a>
        </div>
      </div>
      <h1  className='text-6xl font-semibold text-center py-8'>{props.categories}</h1>
      <p className='text-gray-600 text-center w-96 mx-auto'> Lorem ipsum dolor sit amet,  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
      <div className="grid-cols-1 py-8 gap-8 md:px-64 md:grid-cols-3 grid container  mx-auto text-center">
        {buildItem.map((item, i) => {
          return (
            <Link
         
              key={i}
              href={{
                pathname: `/subcategories/${item.Description}`,
                query: {
                  item: item.Description,
                  categories: props.categories
                },
              }}
            >
              <div className=" shadow-lg py-8 border hover:bg-white border-black  hover:text-black bg-gray-900 text-gray-100 rounded-lg m-2">
                <a className="font-semibold text-2xl cursor-pointer" key={i}>
                  {item.Description + " "}
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
  // returns { id: episode.itunes.episode, title: episode.title}

  //you can make DB queries using the data in context.query
  return {
    props: {
      categories: context.query.categories, //pass it to the page props
    },
  };
}
