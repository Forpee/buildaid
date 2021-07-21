import Link from "next/link";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
export default function Header() {
  return (
    <div className="md:h-screen md:flex px-4 md:px-0 overflow-x-hidden container md:w-2/3  mx-auto">
      <div className="md:w-1/2 pt-32 text-gray-900 ">
        <div className="bg-gray-200 rounded-3xl h-8 w-96"></div>

        <h1 className="font-medium text-7xl pt-8">Rentals</h1>
        <Link
          className=""
          href={`/categories/plant-hire`}
          href={{
            pathname: `/categories/plant-hire`,
            query: {
              categories: "Plant Hire",
            },
          }}
        >
          <div className="px-6 cursor-pointer hover:bg-gray-800 bg-gray-900 my-16  py-8 mx-auto  rounded-lg shadow-lg">
            <a className="text-xl uppercase md:text-2xl cursor-pointer text-center text-gray-100    hover:text-gray-400">
              Plant Hire
            </a>
            <p className="pt-4 text-gray-400">
              Augue eget arcu dictum varius duis at. Suspendisse ultrices
              gravida dictum fusce ut placerat orci.
            </p>
            <ArrowForwardIosIcon className="text-white mt-4 " />
          </div>
        </Link>
      </div>
      <div className="pt-32 md:pl-32 pb-4">
        <img src="/heavy_box.svg"></img>
      </div>
    </div>
  );
}
