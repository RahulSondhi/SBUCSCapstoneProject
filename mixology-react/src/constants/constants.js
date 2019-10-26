export const CustomButton = (props) => {
    return (
        <div>
            <Link to={props.redirect}>
                <button type="submit" className="button">
                    {props.name}
                </button>
            </Link>
        </div>
    )
}

export const SVG = (props) => {
    return (
        <div>
            <img
                src={props.src}
                height="50%"
                width="50%"
                style={props.style}
                alt={props.alt}/>
        </div>
    );
}

const DrinksStyle = {
    width: "50%",
    height: "50%",
    "margin-left": "auto",
    "margin-right": "auto",
    "display": "block"
}

const TipsyStyle = {
    width: "50%",
    height: "50%"
}