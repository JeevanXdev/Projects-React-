import { useEffect, useState } from "react";

type CurrencyList = Record<string, string>;

interface UseCurrencyConverter {
  currencies: CurrencyList;
  currenciesLoading: boolean;
  currenciesError: string | null;
  result: number | null;
  loading: boolean;
  error: string | null;
  convert: (from: string, to: string, amount: number) => Promise<void>;
}

export const useCurrencyConverter = (): UseCurrencyConverter => {
  const [currencies, setCurrencies] = useState<CurrencyList>({});
  const [currenciesLoading, setCurrenciesLoading] = useState<boolean>(true);
  const [currenciesError, setCurrenciesError] = useState<string | null>(null);

  const [result, setResult] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  
  useEffect(() => {
    async function fetchCurrencies() {
      setCurrenciesLoading(true);
      setCurrenciesError(null);
      try {
        const res = await fetch(
          "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json"
        );
        if (!res.ok) throw new Error("Network response was not ok");
        const data = await res.json();
        setCurrencies(data);
      } catch (err: any) {
        setCurrenciesError(err.message || "Failed to load currencies");
      } finally {
        setCurrenciesLoading(false);
      }
    }
    fetchCurrencies();
  }, []);

  // Convert using provided API endpoint
  const convert = async (from: string, to: string, amount: number) => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch(
        `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${from.toLowerCase()}.json`
      );
      if (!res.ok) throw new Error("Network response was not ok");
      const data = await res.json();
      const rate = data[from.toLowerCase()]?.[to.toLowerCase()];
      if (typeof rate === "number") {
        setResult(rate * amount);
      } else {
        throw new Error("Conversion rate not found");
      }
    } catch (err: any) {
      setError(err.message || "Conversion failed");
    } finally {
      setLoading(false);
    }
  };

  return {
    currencies,
    currenciesLoading,
    currenciesError,
    result,
    loading,
    error,
    convert,
  };
};
