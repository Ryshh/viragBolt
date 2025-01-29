const getData = async (url, renderFunction) => {
    try 
    {
        const response = await fetch(url)
        const data = await response.json()
        renderFunction(data)
    }  
    catch (error) 
    {
        console.log(error);
        
    }
}