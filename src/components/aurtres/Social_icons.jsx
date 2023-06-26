function Social_icons (){

    const handleClik = ()=>{
        let link = document.createElement('a')
        link.href =`https://wa.me/${786078004}?text=${encodeURIComponent(  )}`
        link.target = '_blank'
        link.click()
    }
    return <div className="Social_icons">
       
        <div className="icon"><a href=""> <i className="fa-brands fa-facebook-f"></i></a> </div>
       <div className="icon "><a href=""> <i className="fa-brands fa-instagram"></i></a> </div>
        <div className="icon lastIcon" onClick={handleClik}><a href=""> <i className="fa-brands fa-whatsapp"></i></a> </div>
    </div>
    
}
export default Social_icons