import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Items() {
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
    <div className='grid-cols-1 py-8 px-8 md:px-0 md:grid-cols-3 grid container mx-auto text-center'>
      {buildItem.map((item, i) => {
       
        return (
          <Link key={i}   href={{
        pathname:`/subcategories/${item.Description}`,
        query: {
            item: item.Description
           
        }
    }} >
       <div className='p-16 bg-gray-500 m-2'>
            <a className='font-semibold text-4xl cursor-pointer' key={i}>{item.Description + " "}</a>
          </div>
       </Link>
        );
      })}
    </div>
  );
}
