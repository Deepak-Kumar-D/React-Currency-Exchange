import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

function CConverter() {
  const history = useHistory();
  const [currency1, setCurrency1] = useState("");
  const [currency2, setCurrency2] = useState("");
  const [result1, setResult1] = useState([]);
  const [result2, setResult2] = useState([]);
  const [option, setOption] = useState([]);

  const onSubmit = async (e) => {
    e.preventDefault();
    // Fetching rates for both the currencies searched
    const obj1 = await fetch(
      `https://rest.coinapi.io/v1/exchangerate/${currency1.toUpperCase()}/${currency2.toUpperCase()}`,
      {
        method: "GET",
        headers: {
          "X-CoinAPI-Key": "5E580C5C-09D8-4BCD-8EA1-FC9E5197AF9F",
        },
      }
    );

    const data1 = await obj1.json();

    const obj2 = await fetch(
      `https://rest.coinapi.io/v1/exchangerate/${currency2.toUpperCase()}/${currency1.toUpperCase()}`,
      {
        method: "GET",
        headers: {
          "X-CoinAPI-Key": "5E580C5C-09D8-4BCD-8EA1-FC9E5197AF9F",
        },
      }
    );

    const data2 = await obj2.json();
    console.log(data2);

    setResult1(data1);
    setResult2(data2);
  };

  useEffect(() => {
    const currencyLoad = async () => {
      const obj = await fetch(`https://rest.coinapi.io/v1/assets`, {
        method: "GET",
        headers: {
          "X-CoinAPI-Key": "5E580C5C-09D8-4BCD-8EA1-FC9E5197AF9F",
        },
      });

      const data = await obj.json();

      if (obj.status === 200) {
        data.forEach((element) => {
          if (!element.type_is_crypto) {
            let temp = [...option];
            temp.push(element.asset_id);
            setOption(temp);
            // console.log(element.asset_id);
          }
        });
      } else {
        alert("API call error. Check back later!");
        history.push("/");
      }
    };

    currencyLoad();
  }, [history, option]);
  return (
    <section className="body">
      <div className="body-1">
        <select>
          <option>Select Currency</option>
          {option.map((ele) => {
            return <option>{ele}</option>;
          })}
        </select>

        <form method="GET" onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Ex: INR"
            onChange={(event) => setCurrency1(event.target.value)}
          />

          <input
            type="text"
            placeholder="Ex: USD"
            onChange={(event) => setCurrency2(event.target.value)}
          />

          <div>
            <input type="submit" value="CONVERT" />
          </div>
        </form>
      </div>

      <div className="body-2">
        {result1.length !== 0 ? (
          <div className="body-2-sub">
            <h4>
              1 {result2.asset_id_quote}: {result2.rate}
            </h4>
            <h4>
              1 {result2.asset_id_base}: {result1.rate}
            </h4>
          </div>
        ) : (
          ""
        )}
      </div>
    </section>
  );
}

export default CConverter;
