import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
export async function getServerSideProps(context) {
  console.log(context.query);
  // returns { id: episode.itunes.episode, title: episode.title}

  //you can make DB queries using the data in context.query
  return {
    props: {
      item: context.query.item,
      categories: context.query.categories, //pass it to the page props
    },
  };
}

export default function Items(props) {
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
      let obj = testData[0].child.find((o) => o.Description === props.item);
      console.log(obj);
      setBuildItem(obj.child);
    });
  }, []);

  return (
    <div>
      <div className=" container mx-auto  font-semibold flex">
        <div className="">
          <a className="hover:text-gray-400" href="/">
            Home/
          </a>
        </div>
        <div>
          <Link
            href={{
              pathname: `/categories/${props.categories
                .replace(/\s+/g, "-")
                .toLowerCase()}`,
              query: {
                categories: props.categories,
              },
            }}
          >
            <a className="hover:text-gray-400">{props.categories}/</a>
          </Link>
        </div>
        <div>
          <a
            className="hover:text-gray-400 lowercase"
            href={`/subcategories/${props.item}`}
          >
            {props.item}
          </a>
        </div>
      </div>
      <h1 className="text-6xl font-semibold text-center py-8">
        {props.item}
      </h1>
      <p className="text-gray-600 text-center w-96 mx-auto">
        {" "}
        Lorem ipsum dolor sit amet, sed do eiusmod tempor incididunt ut labore
        et dolore magna aliqua.{" "}
      </p>

      <div className="grid-cols-1 py-8 md:grid-cols-3 grid container mx-auto text-center">
        {buildItem.map((item, i) => {
          return (
            <Link
              key={i}
              href={{
                pathname: `/`,
              }}
            >
              <div className="py-8 bg-gray-900 rounded-3xl text-gray-100 m-2">
                <a
                  className="text-4xl text-gray-100 cursor pointer font-semibold"
                  key={i}
                >
                  {item.Description + " "}
                </a>
                <h1 className="my-3 text-2xl">
                  {item.Unit} {" : "}R {item.Price}
                </h1>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
