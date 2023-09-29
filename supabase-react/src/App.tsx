import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

const supabase = createClient("https://pnmvlzlucrchefrrfpck.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBubXZsemx1Y3JjaGVmcnJmcGNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTU5NzQ1NDQsImV4cCI6MjAxMTU1MDU0NH0.CE8H2Njsaj2Rshk1fr0xgkUXO5ufQ2Qxn28JWazxzgU");

function App() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    getCountries();
  }, []);

  async function getCountries() {
    const { data } = await supabase.from("countries").select();
    setCountries(data);
  }

  return (
    <ul>
      {countries.map((country) => (
        <li key={country.name}>{country.name}</li>
      ))}
    </ul>
  );
}

export default App;
