//import React from "react";
//import { useEffect, useState } from 'react';

export default function Search({
  search,
  setSearch,
  placeholder = "Search...",
}) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full pl-9 pr-4 py-1 text-white bg-transparent border border-white rounded-full text-sm placeholder-white focus:outline-none"
    />
  );
}
