export  function SpinnerWithButton() {
  return <div className="w-3 h-3 border-2 border-t-violet-400 border-violet-200 rounded-full animate-spin "></div>;
}

export function Spinner() {
  return (
    <div className="flex justify-center py-4">
      <div className="w-10 h-10 border-4 border-t-violet-500 border-gray-400 rounded-full animate-spin"></div>
    </div>
  );
}