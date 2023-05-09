export const runtime = "edge";
const Blocked = () => {
  return (
    <div className="absolute inset-0 bg-cyan-50">
      <main className="flex h-full items-center justify-center">
        <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight lg:text-5xl">
          Sorry, you have exceeded the rate limit for this action.
        </h1>
      </main>
    </div>
  );
};

export default Blocked;
