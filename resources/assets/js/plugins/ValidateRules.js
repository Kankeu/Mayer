const install = function (Vue, options) {

    Vue.directive("validateForm",{
        bind(el,binding,vnode){
            function test(target){
                let formdata = new FormData(target)
                if(vnode.context.validateFormdata(formdata)){
                    el.querySelectorAll('.md-input-container').forEach(div=>{div.classList.remove('md-input-invalid')})
                    binding.value.call(null,formdata)
                }
            }
            vnode.context.$nextTick(() => {
                el.addEventListener('submit',el.eventSubmit = function(event) {
                    event.preventDefault()
                    test(this)
                })
            })
        },
        unbind (el){
            if(el.eventSubmit){
                el.querySelector('input').removeEventListener('submit',el.eventSubmit)
                delete el.eventSubmit
            }
        }
    })

    Vue.directive("validate",{
        bind(el,binding,vnode){
           function test(target){
                let rules = binding.value.split('|')
                let context = {password: (el.parentNode.querySelector('[name=password]')) ? el.parentNode.querySelector('[name=password]').value.trim() : null,
                    currencies: vnode.context.$data.currencies,
                    countries: vnode.context.$data.countries
                }
                for(let i=0;i<rules.length;i++){
                    let rule = rules[i]
                    if(vnode.context.validateRules[rule.trim()].rule(target.value.trim(),context)){
                        el.querySelector('.md-error').innerText = ""
                    }else{
                        el.querySelector('.md-error').innerText = vnode.context.validateRules[rule.trim()].error
                            .replace('%msg%', el.querySelector('label').innerText.toLowerCase())
                        el.classList.add("md-input-invalid")
                        return false
                    }
                }
                return true
            }
            vnode.context.$nextTick(() => {
                if(el.querySelector('input')){
                    el.querySelector('input').addEventListener('blur',el.eventBlur = function() {
                        test(this)
                    })
                }
            })
        },
        unbind (el){
            if(el.eventBlur){
                el.querySelector('input').removeEventListener('blur',el.eventBlur)
                delete el.eventBlur
            }
        }
    })

    Vue.mixin({
        computed: {
            validateRules(){
                return {
                    required:{
                        error: "Veuillez inserer votre %msg%",
                        rule: (data) => {return data.length>0}
                    },
                    jour:{
                        error: "Veuillez inserer votre %msg% de naissance",
                        rule: (data) => {return data.length>0}
                    },
                    mois: {
                        error: "Veuillez inserer votre %msg% de naissance",
                        rule: (data) => {return data.length>0}
                    },
                    annee:{
                        error: "Veuillez inserer votre %msg% de naissance",
                        rule: (data) => {return data.length>0}
                    },
                    maxlength:{
                        error: "Le champ doit contenir au trop %msg%",
                        rule: (data,numb) => {return data.length<=numb}
                    },
                    minlength:{
                        error: "Le champ doit contenir au moin %msg%",
                        rule: (data,numb) => {return data.length>=numb}
                    },
                    invalid:{
                        error: "Le champ %msg% est invalide",
                        rule: (data)=>{return typeof data === "number"}
                    },
                    number:{
                        error: "Numéro invalide",
                        rule: (data)=>{
                            let i
                            for(i=0;i < data.length;i++){
                                if(isNaN(data[i])) return false
                            }
                            return (i>8) ? true : false
                        }
                    },
                    email:{
                        error: "Email invalide",
                        rule: (data)=>{
                            let mots = data.split('@')
                            let i
                            for(i=0;i < mots.length;i++){
                                if(!mots[i].length>0)  return false
                            }
                            return (i===2) ? true : false
                        }
                    },
                    country:{
                        error: "Nom du pays invalide",
                        rule: (data,{countries})=>{return countries.filter(item=>{return item.toLowerCase()===data.toLowerCase()}).length>0}
                    },
                    currency:{
                        error: "Monnaie invalide",
                        rule: (data,{currencies})=>{return Object.keys(currencies).filter((k)=>{return currencies[k].symbol.toLowerCase() === data.toLowerCase()}).length>0}
                    },
                    password:{
                        error: "Votre mot de passe doit contenir au moins 8 caractères",
                        rule: (data)=>{return data.length>7}
                    },
                    confirm:{
                        error: "Les mots de passe ne correspondent pas",
                        rule: (data, {password})=>{return data === password}
                    },
                }
            },
        },
        methods:{
            validateFormdata (formdata){
                let context = {
                    password: formdata.get('password'),
                    currencies: this.$data.currencies,
                    countries: this.$data.countries
                }
                let names = []
                formdata.forEach((value,name)=>{names.push(name)})
                for(let name of names){
                    let value = formdata.get(name)
                    if(this.validateRules[name] && !this.validateRules[name].rule(value.trim(),context)){
                        let el = this.parentNode(this.$el.querySelector('[name='+name+']'),'md-input-container')
                        let fieldName = (el.querySelector('label')) ? el.querySelector('label').innerText : name
                        el.querySelector('.md-error').innerText = this.validateRules[name].error
                            .replace('%msg%', fieldName.toLowerCase())
                        el.classList.add("md-input-invalid")
                        el.scrollIntoViewIfNeeded()
                        return false
                    }
                }
                return true
            },
            parentNode(el,classeName){
                for(let i=0;i<20;i++){
                    el = el.parentNode
                    if(el.classList.contains(classeName)==true) return el
                }
            }
        }
    })
}

export default install