import { useState } from "react";
import { useHistory } from "react-router-dom";

function All() {
  const history = useHistory();
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);

  //   Fetching all current rates
  const onSubmit = async (e) => {
    e.preventDefault();

    const obj = await fetch(
      `https://rest.coinapi.io/v1/exchangerate/${search.toUpperCase()}?invert=false`,
      {
        method: "GET",
        headers: {
          "X-CoinAPI-Key": "5E580C5C-09D8-4BCD-8EA1-FC9E5197AF9F",
        },
      }
    );

    const data = await obj.json();

    if (obj.status === 200) {
      setResult(data);
    } else {
      alert("Server error. Try again later!");
      history.push("/");
    }
  };
  return (
    <section className="body">
      <div className="body-1">
        <form method="GET" onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="BTC"
            onChange={(event) => setSearch(event.target.value)}
          />

          <div>
            <input type="submit" value="CHECK" />
          </div>
        </form>
      </div>

      <div className="body-2">
        {result.length !== 0 ? (
          <div>
            <div className="value-table">
              <p className="value-heading">Currency Type</p>
              <p className="value-heading">Current Rate</p>
            </div>

            {result.rates.map((ele, index) => {
              return (
                <div key={index} className="value-table">
                  <p>{ele.asset_id_quote}</p>
                  <p>{ele.rate}</p>
                </div>
              );
            })}

            <div className="value-table">
              <p className="row-1">Deepak</p>
              <p className="row-2">Kumar Dileep Kumar</p>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </section>
  );
}

export default All;
