const LoadingOverlay = () => {
    return (
      <>
        <div className="fixed top-0 left-0 w-[100vw] h-[100vh] bg-black bg-opacity-70 flex justify-center items-center z-[9999]">
          <div className="w-[50px] h-[50px] border-[6px] border-gray-300 border-t-[6px] border-t-[#ab854f] rounded-full animate-spin"></div>
        </div>
      </>
    );
  };
  
  export default LoadingOverlay;
  