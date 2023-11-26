import {toast} from "react-toastify";

const notify = (message, themeMode) => {
    toast(message, {
        position: toast.POSITION.BOTTOM_LEFT,
        autoClose: 3000, // Adjust the duration as needed
        theme: "null",
        style : {
          font: "sans-serif",
          fontSize : "16px",
          color: themeMode === "dark" ? "#FFE227" : "#000000",
          background: themeMode === "dark" ? "#000000" : "#FFE227"
        }
      });
}

export default notify; 