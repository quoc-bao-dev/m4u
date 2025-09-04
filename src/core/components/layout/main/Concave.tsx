const Concave = () => {
  return (
    <div className="w-full relative">
      <div className="absolute top-0 left-0">
        <img
          src="/image/layout/Subtract.svg"
          alt=""
          className="md:w-full w-[34px]"
        />
      </div>
      <div className="absolute top-0 right-0">
        <img
          src="/image/layout/Subtract.svg"
          alt=""
          className="md:w-full w-[34px]"
          style={{ transform: 'scaleX(-1)' }}
        />
      </div>
    </div>
  )
}
export default Concave
