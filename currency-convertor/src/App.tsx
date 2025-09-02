import React, { useEffect, useMemo, useState } from "react";
import { useCurrencyConverter } from "./hooks/useCurrencyConvertor";

const App: React.FC = () => {
  
  const [fromCurrency, setFromCurrency] = useState<string>("usd");
  const [toCurrency, setToCurrency] = useState<string>("inr");
  const [amount, setAmount] = useState<number>(1);

  const {
    currencies,
    currenciesLoading,
    currenciesError,
    result,
    loading,
    error,
    convert,
  } = useCurrencyConverter();

  
  const sortedCurrencies = useMemo(
    () => Object.entries(currencies).sort((a, b) => a[0].localeCompare(b[0])),
    [currencies]
  );


  useEffect(() => {
    if (!currenciesLoading && !currenciesError) {
      convert(fromCurrency, toCurrency, amount);
    }
    
  }, [currenciesLoading, currenciesError]);

  const handleConvert = () => {
    if (!fromCurrency || !toCurrency) return;
    convert(fromCurrency, toCurrency, amount);
  };

  const handleSwap = () => {
    const newFrom = toCurrency;
    const newTo = fromCurrency;

    setFromCurrency(newFrom);
    setToCurrency(newTo);


    if (!currenciesLoading && !currenciesError) {
      convert(newFrom, newTo, amount);
    }
  };

  
  const cap = (s: string) => s.toUpperCase();

  // Derive per-unit rate if possible
  const perUnitRate =
    result !== null && amount > 0 ? Number((result / amount).toFixed(6)) : null;

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center p-6"
      style={{
        backgroundImage:
          "url('data:image/jpeg;base64,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')",
      }}
    >
      <div className="bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-center text-2xl font-bold text-blue-600 mb-6">
          💱 Currency Converter
        </h1>

        {/* Amount */}
        <div className="mb-4">
          <label className="font-medium text-gray-700 mb-1 block">Amount</label>
          <input
            type="number"
            min={0}
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value || 0))}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none text-gray-700"
          />
        </div>

        {/* From / Swap / To */}
        <div className="flex items-end gap-2 mb-4">
          <div className="flex-1">
            <label className="font-medium text-gray-700 mb-1 block">From</label>
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              disabled={currenciesLoading || !!currenciesError}
              className="w-full border rounded-lg px-3 py-2"
            >
              {currenciesLoading && <option>Loading currencies…</option>}
              {currenciesError && <option>Error loading currencies</option>}
              {!currenciesLoading &&
                !currenciesError &&
                sortedCurrencies.map(([code, name]) => (
                  <option key={code} value={code}>
                    {code} — {name}
                  </option>
                ))}
            </select>
          </div>

          <button
            onClick={handleSwap}
            className="mb-1 bg-yellow-400 text-white px-3 py-2 rounded-lg hover:bg-yellow-500"
            title="Swap currencies"
            aria-label="Swap currencies"
          >
            ⇅
          </button>

          <div className="flex-1">
            <label className="font-medium text-gray-700 mb-1 block">To</label>
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              disabled={currenciesLoading || !!currenciesError}
              className="w-full border rounded-lg px-3 py-2"
            >
              {currenciesLoading && <option>Loading currencies…</option>}
              {currenciesError && <option>Error loading currencies</option>}
              {!currenciesLoading &&
                !currenciesError &&
                sortedCurrencies.map(([code, name]) => (
                  <option key={code} value={code}>
                    {code} — {name}
                  </option>
                ))}
            </select>
          </div>
        </div>

        {/* Convert Button */}
        <button
          onClick={handleConvert}
          disabled={currenciesLoading || !!currenciesError}
          className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition disabled:opacity-60 mb-4"
        >
          Convert
        </button>

        {/* Status & Result */}
        {loading && <p className="text-blue-500 text-center">Converting…</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {result !== null && !loading && (
          <div className="text-center mt-2">
            <p className="text-lg font-semibold text-gray-700">
              {amount} {cap(fromCurrency)} = {result.toFixed(6)} {cap(toCurrency)}
            </p>
            {perUnitRate !== null && (
              <p className="text-sm text-gray-600 mt-1">
                1 {cap(fromCurrency)} = {perUnitRate} {cap(toCurrency)}
              </p>
            )}
          </div>
        )}
        {currenciesError && (
          <p className="text-red-500 mt-2 text-center">{currenciesError}</p>
        )}
      </div>
    </div>
  );
};

export default App;
