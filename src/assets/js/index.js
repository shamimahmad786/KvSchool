const dashboardSideBar = document.querySelector(".sidebar");
const dashboardRemainingPart = document.querySelector(".dashboard--remaining--width");
const closeSideBar = document.querySelector(".dashboard-chevron-left");
const openSideBar = document.querySelector(".dashboard-chevron-right");

// Close Sidebar
let x = window.matchMedia("(max-width: 1400px)")

const changeMediaQueries = (x) => {
    if (x.matches) { // If media query matches
        dashboardSideBar.style.left = "-100%";
        dashboardRemainingPart.style.marginLeft = "0px";
    } else {
        openSideBar.style.display = "none";
    }

}

changeMediaQueries(x);

closeSideBar.addEventListener("click", () => {
    dashboardSideBar.style.left = "-100%";
    dashboardRemainingPart.style.marginLeft = "0px";
    dashboardRemainingPart.style.width = "100%";
    openSideBar.style.display = "block";
});

// Open side bar icon hide
// openSideBar.style.display = "none";

// Open sidebar
openSideBar.addEventListener("click", () => { 
    dashboardSideBar.style.left = "0px";
    dashboardRemainingPart.style.marginLeft = "320px";
    openSideBar.style.display = "none";
});

$('#example, #example2, #example1 ').dataTable({ searching: false, paging: false, info: false });