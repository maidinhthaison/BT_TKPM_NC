document.addEventListener("DOMContentLoaded", function () {
  const selectElement = document.getElementById("cbLoaiPhong");
  const loaiPhongIdElement = document.getElementById("loaiPhongId");
  const cauHinhIdElement = document.getElementById("cauHinhId");

  const hrefElement = document.getElementById("loaiPhongIdHref");
  if (selectElement) {
    selectElement.addEventListener("change",  (event) => {
      const selectedValue = event.target.value;
      const selectedText = selectElement.options[selectElement.selectedIndex].text;

      loaiPhongIdElement.value = selectedValue;
      hrefElement.setAttribute('href', `/quanlygia?id=${selectedValue}`);
      cauHinhIdElement
      // window.location.href = `/quanlygia?loaiPhongId=${encodeURIComponent(selectedValue)}`;
      // Your code to execute when an item is selected goes here
      console.log("Selected value:", selectedValue);
      console.log("Selected text:", selectedText);
    });
  } else {
    console.error('Element with ID "selectElement" not found!');
  }
});

