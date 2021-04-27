const Events =(props)=>{

    const events = props.events.map(step=><span>{step.name}</span>)

    return(
        <div className="eventsSection section">
          <div className="navBar">
            <h1>events</h1>
          </div>
          <div className="eventsList displayList">{events.length === 0 ? <h1>Not Found any events</h1>:events}</div>
        </div>
    )
}

export default Events;