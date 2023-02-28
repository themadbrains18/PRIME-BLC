const NetworkListDropDown=(props)=>{
  return (
    <div className="coin_list_dropdown">
        <div className="coin_list_inner">
            <div className="head_wrapper">
                <div className="list_head">
                    <input type="search" className="search_feild"  onClick={e => e.stopPropagation()}/>
                    <i className="fa fa-search"></i>
                </div>
            </div>
            <ul className="content_wrapper">
                {props.networkList.map((item, index)=>{
                    return <li key={"coin" + index} className="list_content" onClick={() => { props.selectNetwork(item) }}>
                    {/* <div className="list_img">
                        <img src={item.image} width='40' />
                    </div> */}
                    <div className="list_text">
                        <p className="list_item_dull">{item.Network}</p>
                    </div>
                </li>
                })}
                
            </ul>
        </div>
    </div>
  )
}

export default NetworkListDropDown;