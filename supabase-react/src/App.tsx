import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { Database } from './database.types.ts';
import { Country } from './types.ts';

const supabase = createClient<Database>("https://pnmvlzlucrchefrrfpck.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBubXZsemx1Y3JjaGVmcnJmcGNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTU5NzQ1NDQsImV4cCI6MjAxMTU1MDU0NH0.CE8H2Njsaj2Rshk1fr0xgkUXO5ufQ2Qxn28JWazxzgU");

function App() {
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    getCountries();
  }, []);

  async function getCountries() {
    const { data } = await supabase.from("countries").select();
    setCountries(data ?? []);
  }

  return (
    <ul>
      {countries.map((country) => (
        <li key={country.id}>{country.name}</li>
      ))}
    </ul>
  );
}

function AuthApp() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (!session) {
    return (<Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }}/>)
  } else {
    return (<div>Logged in!</div>)
  }
}

export default AuthApp;
