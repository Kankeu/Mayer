class magazinStore
{
    constructor(){
        this.state = {
            images: [],
            lignes:[]
        }
    }
    setImages(images){
        for(let i=0; i < images.length; i++){
            let id = this.state.images.length
            this.state.images.push({file:images[i], id:id})
            this.setLignes(id,images[i])
        }
    }
    getImage(id){
        return this.state.images.filter((data) => {return data.id === id})
    }
    removeImage(id){
        let index = this.state.images.indexOf(this.getImage(id)[0])
        return this.state.images.splice(index,1)
    }
    removeImages(){
        return this.state.images.splice(0, this.state.images.length)
    }
    setLignes(id,ligne){
        this.state.lignes.push({photos:[URL.createObjectURL(ligne)], id:id, active:true})
    }
    removeLigne(index){
        return this.state.lignes[index].active = false
    }
    removeLignes(){
        return this.state.lignes.splice(0, this.state.lignes.length)
    }
    addLigne(nombre){
        for(let i=0; i<nombre; i++)
        {
            this.state.lignes.push({photos:[], active:true})
        }
    }
}

export default new magazinStore()