export const Balance = ({value}) => {

  return (
      <>
          <p className="text-sm opacity-80">Available Balance</p>
          <h2 className="font-bold mt-4 text-3xl">₹ {value}</h2>
      </>
  );
}
