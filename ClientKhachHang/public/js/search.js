// document
//   .getElementById("searchForm")
//   .addEventListener("submit", async (event) => {
//     event.preventDefault();
//     const inputSearch = document.getElementById("inputSearch").value.trim();
//     if (!inputSearch) {
//       alert("Vui lòng nhập từ khóa tìm kiếm");
//       return;
//     }
//     const params = {
//         keyword: inputSearch
//     };
//     await xulySearch(params);
//   });

// const xulySearch = async (params) => {
//   const url = 'http://localhost:3001/api/room/search';
//   axios.post(url, params)
//   .then((response) => {
//     const data = response.data;
//     console.log(`search response: ${JSON.stringify(data.listPhong, null, 2)}`);
//     if (data.status === 'OK') {
//       // Assuming you have a function to render the search results
//       renderSearchResults(data.listPhong);
//     } else {
//       console.error("No rooms found");
//     }
//   })
//   .catch((error) => {
//     console.error("Error:", error);
//   });
// };

