import React, { useState } from "react";
const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password, rememberMe });
    
  };

  return (
   <div className="overflow-hidden flex items-center justify-center max-w-screen md:w-[93vw] md:h-[90vh] max-lg:w-[94vw] max-lg:h-[93vh] lg:w-[90vw] lg:h-[84vh]">
  <div className="p-8 shadow-md lg:bg-[#142D6F] rounded-3xl max-md:bg-[#142D6F] max-md:mx-[10px] max-md:my-[50px] max-md:px-[10px] max-md:w-full max-md:mt-0 max-md:ml-0 max-lg:bg-[#142D6F]">
    <div className="header flex lg:ml-[190px] lg:gap-40 max-md:justify-center max-md:ml-0 max-md:gap-0">
      <h1 className="text-2xl font-bold text-center mb-6 font-mono max-md:text-white md:translate-x-[25vw] lg:-translate-x-[5px]">Sign Up</h1>
      <div className="bg-[#142D6F]">
          <button className="cross">
  <div className="w-[5px] text-[30px]">X</div>
</button>
        </div>
    </div>
    <form onSubmit={handleSubmit} className="max-md:mx-[2px]">
      <div className="mb-4 mx-30 max-md:mx-2">
        <img 
          src="https://cdn-icons-png.freepik.com/256/8109/8109498.png?ga=GA1.1.1184369445.1746384107&semt=ais_hybrid" 
          alt="" 
          className="w-[25px] translate-y-6 max-md:translate-x-1" 
        />
        <label htmlFor="email" className="block text-sm font-medium text-white-700 mb-1 mx-8 max-md:text-white max-md:mx-2 max-md:translate-x-[25px]">
          Enter Institute's Email ID
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="mail.iiitdmj.ac.in"
          className="w-full px-4 py-2 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black max-md:px-3"
          required
        />
      </div>

      <div className="mb-4 mx-30 max-md:mx-2">
        <img 
          src="https://cdn-icons-png.freepik.com/256/4616/4616442.png?ga=GA1.1.1184369445.1746384107&semt=ais_hybrid" 
          alt="" 
          className="w-[25px] translate-y-6" 
        />
        <label htmlFor="password" className="block text-sm font-medium text-white-700 mb-1 mx-8 max-md:text-white max-md:mx-2 max-md:translate-x-[22px]">
          Create Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Must be 8 characters"
          minLength="8"
          className="w-full px-4 py-2 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black max-md:px-3"
          required
        />
      </div>

      <div className="mb-6 flex items-center mx-30 max-md:mx-2">
        <input
          type="checkbox"
          id="rememberMe"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="rememberMe" className="ml-2 block text-sm text-white-700 max-md:text-white">
          Remember me
        </label>
      </div>
      <button 
        type="submit"
        className="w-94 mx-30 btn max-md:w-full max-md:mx-0 max-md:py-2"
      >
        SignUp
      </button>
    </form>
    <p className="mt-4 text-center text-sm text-white-600 mx-30 max-md:text-white max-md:mx-2">
      Already have an account?{" "}
      <a href="#" className="text-blue-600 hover:underline max-md:text-blue-300">
        Log in
      </a>
    </p>
  </div>
</div>
    
  );
};

export default SignUp;