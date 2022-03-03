import React from "react";

function SplitWalletAdd({ address }) {
  const first = address?.substring(0, 6);
  const last = address?.substring(address?.length - 6);
  console.log(first, "...", last);

  return (
    <>
      {first}...{last}
    </>
  );
}

export default SplitWalletAdd;
