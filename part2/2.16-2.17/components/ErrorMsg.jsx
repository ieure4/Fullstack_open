// import '../index.css'

const Notification = ({message, check})=>{
    if(message === null){
        return null
    }
    const redError = {
        color:`red`,
    backgroundColor: `lightgrey`,
    fontSize:20,
    borderStyle: `solid`,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    }
    const greenError = {
        color:`green`,
    backgroundColor: `lightgrey`,
    fontSize:20,
    borderStyle: `solid`,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    }
    return(
        <div style = {check ? greenError:redError}>
            {message}
        </div>
    )
}

export default Notification