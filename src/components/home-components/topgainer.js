import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { topGainerRequest } from "../../Actions/tokenAction";

const TopGainer = () => {

  const dispatch = new useDispatch();

  const [gainerList, setGainerList] = useState([]);

  useEffect(() => {
    getTopGainer();
  }, [])

  const getTopGainer = async() => {
    let data = await dispatch(topGainerRequest());
    let array = data.data.result.newSymbols;
    const arrayUniqueByKey = [...new Map(array.map(item =>
      [item['baseName'], item])).values()];
    
    let newList = arrayUniqueByKey.filter((item)=>{
      return item.iconUrl !== '' && item.baseName !== ''
    })  

    setGainerList(newList);
  }

  return (<section className="rewards">
    <div className="container py-5">
      <div className="text-center mb-5">
        <h4 className="mb-4 fw-bold">STAKING CRYPTO</h4>
        <h2 className="mb-4 themeColor">Earn crypto rewards </h2>
        <p className="mb-4">
          Earn up to 21% in rewards annually by staking your assets with
          BLC Exchange. It only takes a few clicks to stake.*
        </p>
      </div>
      <div className="d-flex flex-wrap justify-content-center gap-3">
        {gainerList.length >0 && gainerList.map((item)=>{
          return <div key={item.baseName} className="card reward_card text-center border-0 rounded" >
          <div className="card-body">
            <div className="img-parent-div">
              <img
                src={item.iconUrl}
                className="w-25"
                alt=""
              />
            </div>
            <span className="fs-3 fw-bold">{item.baseName}</span>
            <span className="fs-4 text-gray-300">({item.baseName})</span>
            <h6 className="fw-bold mt-2">Yearly rewards</h6>
            <h4 className="themeColor"></h4>

          </div>
        </div>
        })}
        
      </div>
    </div>
  </section>
  )
}

export default TopGainer;