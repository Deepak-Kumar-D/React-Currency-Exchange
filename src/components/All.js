import { useState } from "react";
import { useHistory } from "react-router-dom";

function All() {
  const history = useHistory();
  const [result, setResult] = useState([]);

  //   Fetching all current rates
  const onSubmit = async (e) => {
    e.preventDefault();

    const obj = await fetch(`https://api.exchangerate.host/latest`, {
      method: "GET",
    });

    const data = await obj.json();

    if (obj.status === 200) {
      setResult(data.rates);
    } else {
      alert("Server error. Try again later!");
      history.push("/");
    }
  };
  return (
    <section className="body">
      <div className="body-1">
        <form method="GET" onSubmit={onSubmit}>
          <p className="check-rates">
            Check the latest foreign exchange rates.
          </p>

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

            {Object.keys(result).map((key, index) => {
              return (
                <div key={index} className="value-table">
                  <p>{key}</p>
                  <p>{result[key]}</p>
                </div>
              );
            })}
          </div>
        ) : (
          ""
        )}
      </div>
    </section>
  );
}

export default All;
