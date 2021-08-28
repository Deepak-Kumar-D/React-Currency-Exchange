import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

function CConverter() {
  const history = useHistory();
  const [amount, setAmount] = useState(1);

  const [currency1, setCurrency1] = useState("eur".toUpperCase());
  const [currency2, setCurrency2] = useState("usd".toUpperCase());

  const [result1, setResult1] = useState([]);
  const [result2, setResult2] = useState([]);
  const [option, setOption] = useState([]);

  const onSubmit = async (e) => {
    e.preventDefault();
    // Fetching rates for both the currencies searched
    const obj1 = await fetch(
      `https://api.exchangerate.host/convert?from=${currency1}&to=${currency2}`,
      { method: "GET" }
    );

    const data1 = await obj1.json();

    const obj2 = await fetch(`https://api.exchangerate.host/latest`, {
      method: "GET",
    });

    const data2 = await obj2.json();

    setResult1(amount * data1.result);
    setResult2(data2.rates[currency1]);
  };

  const handleAmount = (ele) => {
    setAmount(ele);
  };

  const handleCurrency1 = (ele) => {
    setCurrency1(ele);
  };

  const handleCurrency2 = (ele) => {
    setCurrency2(ele);
  };

  const currencyLoad = async () => {
    const obj = await fetch(`https://api.exchangerate.host/symbols`, {
      method: "GET",
    });

    const data = await obj.json();

    if (obj.status === 200) {
      setOption(data);
    } else {
      alert("API call error. Check back later!");
      history.push("/");
    }
  };

  useEffect(() => {
    currencyLoad();

    return () => {
      setOption({});
    };
  }, []);
  return (
    <section className="body">
      <div className="body-1">
        <form method="GET" onSubmit={onSubmit}>
          <p className="cc-heading">Amount</p>
          <input
            type="text"
            placeholder="1"
            onChange={(event) => handleAmount(event.target.value)}
            valu={amount}
          />

          <p className="cc-heading">From</p>
          <select
            onChange={(event) => handleCurrency1(event.target.value)}
            value={currency1.toUpperCase()}
          >
            {option.length !== 0 ? (
              <>
                {Object.keys(option.symbols).map((key, index) => {
                  return <option key={index}>{key}</option>;
                })}
              </>
            ) : (
              ""
            )}
          </select>

          <p className="cc-heading">To</p>
          <select
            onChange={(event) => handleCurrency2(event.target.value)}
            value={currency2.toUpperCase()}
          >
            {option.length !== 0 ? (
              <>
                {Object.keys(option.symbols).map((key, index) => {
                  return (
                    <option key={index} value={key}>
                      {key}
                    </option>
                  );
                })}
              </>
            ) : (
              ""
            )}
          </select>

          <div>
            <input type="submit" value="CONVERT" />
          </div>
        </form>
      </div>

      {result1.length !== 0 ? (
        <div className="body-2">
          <div className="body-2-sub">
            <h4>
              1 {currency1}: {result2}
            </h4>

            <h4>
              1 {currency2}: {result1}
            </h4>
          </div>
        </div>
      ) : (
        ""
      )}
    </section>
  );
}

export default CConverter;
