import React from "react";
import { useSelector } from "react-redux";
import { fetchPalletsColor } from "../../utility/global";

function Spinner() {

  const appearance = useSelector(state => state.customize.appearance);

  return (
    <div>
      <div class="spinner-border" style={{color: `${fetchPalletsColor(appearance.colorPalette)}`}} role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  );
}

export default Spinner;
