document.addEventListener("DOMContentLoaded", function () {
  const selectElement = document.getElementById("cbLoaiPhong");
  const loaiPhongIdElement = document.getElementById("loaiPhongId");

  if (selectElement) {
    loaiPhongIdElement.value = selectElement.options[0].value;
    selectElement.addEventListener("change", function (event) {
      const selectedValue = event.target.value;
      const selectedText = selectElement.options[selectElement.selectedIndex].text;

      loaiPhongIdElement.value = selectedValue;

      // Your code to execute when an item is selected goes here
      console.log("Selected value:", selectedValue);
      console.log("Selected text:", selectedText);
    });
  } else {
    console.error('Element with ID "selectElement" not found!');
  }
});

function handleClick(id) {
  const el = document.getElementById(id);
  console.log(el.textContent);
}
