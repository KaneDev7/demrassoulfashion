import Topbar from "../components/Topbar/Topbar"
import Title from "../components/aurtres/Title"
import TopbarFixed from "../components/aurtres/TopbarFixed"

function About (){

    return <div className="About">
        <Topbar/>
        <div className="about_content">
            <Title title='A propos de nous'/>
            <div className="about_text">
                <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam quo commodi placeat libero cumque reprehenderit maiores eaque necessitatibus voluptatum eveniet quod possimus
                repellendus porro id voluptatem distinctio, praesentium sint culpa!
                Aliquam quo commodi placeat libero cumque reprehenderit maiores eaque 
                necessitatibus voluptatum eveniet quod possimus repellendus porro id v
                oluptatem distinctio, praesentium sint culpaAliquam quo commodi placeat libero cumque reprehenderit maiores eaque necessitatibus voluptatum eveniet quod possimus repellendus porro id voluptatem distinctio, praesentium sint culpaAliquam quo commodi placeat libero cumque reprehenderit maiores eaque necessitatibus voluptatum eveniet
                 quod possimus repellendus porro id voluptatem distinctio, praesentium s
                 int culpa
                </p>
            </div>
        </div>
        
    </div>
}

export default About