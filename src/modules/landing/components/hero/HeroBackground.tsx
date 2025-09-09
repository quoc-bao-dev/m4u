
const HeroBackground = () => {
  return (
    <div className="h-full">
      <div className="absolute inset-0 w-full h-full z-[2]">
        <video
          className="w-full object-cover h-full "
          src="/image/hero-baner/hero.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          style={{ maxWidth: '100%' }}
        />
      </div>
    </div>
  )
}

export default HeroBackground
