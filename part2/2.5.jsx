

const Courses = ({courses})=>{
    


    return(
        <>
        <div>
            <h1>Web development curriculum</h1>
           {courses.map((course)=>{
            const total = course.parts.reduce((a, c)=>a+c.exercises, 0)
            return(
            <div key = {course.id}>
                <h2>{course.name}</h2>
                {course.parts.map((part)=>{return(
                    <p key = {part.id}>{part.name} {part.exercises} </p>
                )})}
                <p>Total of {total}</p>
                
                </div>)})}
           
    
    
          
        </div>
        </>
    )
    
    
    }
    
    export default Courses
