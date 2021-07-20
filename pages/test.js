export default function Test() {
  let data = [
    { level: "1", Description: "main category" },
    { level: "2", Description: "first-subcategory" },
    { level: "", description: "Cement" },
    { level: "", description: "Bricks" },
    { level: "", description: "concrete" },
    { level: "2", Description: "second-subcategory" },
    { level: "", description: "Cement-1" },
    { level: "", description: "Bricks-2" },
    { level: "", description: "concrete-2" },
    { level: "1", Description: "second main category" },
    { level: "2", Description: "2nd first-subcategory" },
    { level: "", description: "2nd Cement" },
    { level: "", description: "2nd Bricks" },
    { level: "", description: "2nd concrete" },
    { level: "2", Description: "2nd second-subcategory" },
    { level: "", description: "2nd Cement-1" },
    { level: "", description: "2nd Bricks-2" },
    { level: "", description: "2nd concrete-2" },
  ];

  //   let res = data
  //     .filter(({ level }) => level === "2")
  //     .map((v) => ({ ...v, parentCategory: "main category" }));
  //   console.log(res);
  const newData = data.reduce((arr, el) => {
    if (el.level === "1") {
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
      if (element.level === "2") {
        array.push({ ...element, child: [] });
      } else {
        array[array.length - 1].child.push({ ...element });
      }
      return array;
    }, []);
  
    arr.push({ ...el, ...newTestData });

    return arr;
  }, []);
 
  return (
    <div>
      <h1>Hello</h1>
    </div>
  );
}
